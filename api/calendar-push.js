// Creates an event in Google Calendar using a Service Account (no OAuth needed)
import crypto from "crypto";

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claimSet))}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(privateKey).toString("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const jwt = `${unsigned}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error("Failed to get access token: " + JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { title, startISO, endISO, description } = req.body;
    if (!title || !startISO || !endISO) {
      res.status(400).json({ error: "Missing title, startISO, or endISO" });
      return;
    }

    const accessToken = await getAccessToken();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    const eventRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: title,
          description: description || "",
          start: { dateTime: startISO },
          end: { dateTime: endISO },
        }),
      }
    );

    const eventData = await eventRes.json();
    if (!eventRes.ok) {
      res.status(eventRes.status).json({ error: eventData.error || eventData });
      return;
    }

    res.status(200).json({ success: true, eventId: eventData.id, htmlLink: eventData.htmlLink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

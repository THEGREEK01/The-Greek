// Reads live events from Google Calendar using the Service Account (no OAuth needed)
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
    scope: "https://www.googleapis.com/auth/calendar.readonly",
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

  try {
    const accessToken = await getAccessToken();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    const timeMin = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString();
    const timeMax = new Date(Date.now() + 1000 * 60 * 60 * 24 * 120).toISOString();

    let allEvents = [];
    let pageToken = null;
    do {
      const params = new URLSearchParams({
        timeMin,
        timeMax,
        singleEvents: "true",
        orderBy: "startTime",
        maxResults: "250",
      });
      if (pageToken) params.set("pageToken", pageToken);

      const calRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const calData = await calRes.json();
      if (!calRes.ok) {
        res.status(200).json({ events: [], error: calData.error?.message || "calendar_fetch_failed" });
        return;
      }
      allEvents = allEvents.concat(calData.items || []);
      pageToken = calData.nextPageToken || null;
    } while (pageToken);

    const events = allEvents
      .filter(e => e.start?.dateTime && e.end?.dateTime)
      .map(e => ({
        start: e.start.dateTime,
        end: e.end.dateTime,
        title: e.summary || "",
      }));

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
    res.status(200).json({ events, source: "service_account_live" });
  } catch (err) {
    res.status(200).json({ events: [], error: err.message });
  }
}

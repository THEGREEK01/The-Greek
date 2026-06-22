// Handles Google's redirect back, exchanges code for tokens, stores refresh token in Supabase
export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    res.status(400).send("Missing authorization code");
    return;
  }

  const redirectUri = `https://${req.headers.host}/api/auth-callback`;

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenRes.json();

    if (!tokens.refresh_token) {
      res.status(400).send(
        "No refresh token received. This usually happens if you've already authorized this app before. " +
        "Go to https://myaccount.google.com/permissions, remove 'The Greek', and try again."
      );
      return;
    }

    // Store the refresh token in Supabase so we can use it for future API calls
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

    await fetch(`${SUPABASE_URL}/rest/v1/app_config?on_conflict=key`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify([{ key: "google_refresh_token", value: tokens.refresh_token }]),
    });

    res.setHeader("Content-Type", "text/html");
    res.send(`
      <html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#080808;color:#f0ead6;">
        <h1 style="color:#c9a84c;">Connected!</h1>
        <p>Google Calendar is now linked. You can close this tab and return to the app.</p>
        <a href="/" style="color:#c9a84c;">Return to app</a>
      </body></html>
    `);
  } catch (err) {
    res.status(500).send("Error during OAuth callback: " + err.message);
  }
}

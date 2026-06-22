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

    // DEBUG: show full response instead of processing
    res.status(200).json({
      httpStatus: tokenRes.status,
      tokenResponseKeys: Object.keys(tokens),
      hasRefreshToken: !!tokens.refresh_token,
      hasAccessToken: !!tokens.access_token,
      error: tokens.error || null,
      errorDescription: tokens.error_description || null,
      scope: tokens.scope || null,
    });
  } catch (err) {
    res.status(500).json({ caughtError: err.message });
  }
}

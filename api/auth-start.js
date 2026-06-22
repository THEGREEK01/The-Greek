// Redirects the trainer to Google's OAuth consent screen
export default function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `https://${req.headers.host}/api/auth-callback`;
  const scope = encodeURIComponent("https://www.googleapis.com/auth/calendar.readonly");

  const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&access_type=offline` +
    `&prompt=consent`;

  res.redirect(302, url);
}

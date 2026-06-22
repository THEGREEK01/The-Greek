// Fetches live events from Google Calendar using the stored refresh token
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

  try {
    // 1. Get the stored refresh token
    const configRes = await fetch(
      `${SUPABASE_URL}/rest/v1/app_config?key=eq.google_refresh_token&select=value`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const configRows = await configRes.json();
    const refreshToken = configRows?.[0]?.value;

    if (!refreshToken) {
      res.status(200).json({ events: [], error: "not_connected" });
      return;
    }

    // 2. Exchange refresh token for a fresh access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      res.status(200).json({ events: [], error: "token_refresh_failed" });
      return;
    }

    // 3. Fetch events from Google Calendar (90 days ahead, all pages)
    const timeMin = new Date().toISOString();
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
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const calData = await calRes.json();
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

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
    res.status(200).json({ events });
  } catch (err) {
    res.status(200).json({ events: [], error: err.message });
  }
}

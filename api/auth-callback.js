export default async function handler(req, res) {
  res.status(200).json({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "present" : "missing",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "present" : "missing",
    SUPABASE_URL: process.env.SUPABASE_URL ? "present" : "missing",
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? "present" : "missing",
    allEnvVarNames: Object.keys(process.env).sort(),
  });
}

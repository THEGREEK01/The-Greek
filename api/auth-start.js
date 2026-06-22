// DEBUG VERSION - shows env var status instead of redirecting
export default function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const allEnvKeys = Object.keys(process.env).filter(k => k.startsWith('GOOGLE') || k.startsWith('SUPABASE'));
  
  res.status(200).json({
    clientId: clientId || "MISSING",
    clientIdLength: clientId ? clientId.length : 0,
    foundEnvKeys: allEnvKeys,
    totalEnvVarsCount: Object.keys(process.env).length,
  });
}

export default async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  
  res.status(200).json({
    clientIdPresent: !!clientId,
    clientIdLength: clientId ? clientId.length : 0,
    clientSecretPresent: !!clientSecret,
    clientSecretLength: clientSecret ? clientSecret.length : 0,
    clientSecretFirstChars: clientSecret ? clientSecret.slice(0,8) : "MISSING",
  });
}

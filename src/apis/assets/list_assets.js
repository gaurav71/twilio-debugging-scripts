const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const serviceName = "test-functions";

async function listAsset() {
  const assets = await client.serverless.v1
    .services(serviceName)
    .assets.list();

  return assets;
}

const runner = async () => {
  const assets = await listAsset();
  console.log('assets', assets);
}

runner();

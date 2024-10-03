const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const assetSid = "ZHXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const serviceName = "test-functions";

async function fetchAsset(assetSid) {
  const asset = await client.serverless.v1
    .services(serviceName)
    .assets(assetSid)
    .fetch();

  return asset;
}

const runner = async () => {
  const asset = await fetchAsset(assetSid);
  console.log('fetchAsset', asset);
}

runner();

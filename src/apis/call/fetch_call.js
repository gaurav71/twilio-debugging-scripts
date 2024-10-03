const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const callSid = "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

async function fetchCall(callSid) {
  const call = await client.calls(callSid).fetch();
  return call;
}

const runner = async () => {
  const call = await fetchCall(callSid);
  console.log(call)
}

runner();
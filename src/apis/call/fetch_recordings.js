const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const callSid = "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

async function fetchRecorings(callSid) {
  const recordings = await client.recordings.list({
    callSid: callSid
  });

  return recordings;
}

const runner = async () => {
  const recordings = await fetchRecorings(callSid);
  console.log(recordings)
}

runner();
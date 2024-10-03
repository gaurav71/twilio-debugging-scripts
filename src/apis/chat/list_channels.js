const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const CHAT_SERVICE_SID = creds.ChatServiceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

async function getChannels() {
  const channels = await client.chat.v2.services(CHAT_SERVICE_SID)
    .channels.list({ limit: 10 })

  return channels;
};

const runner = async () => {
  const channels = await getChannels();
  console.log('channels', channels);
}

runner();
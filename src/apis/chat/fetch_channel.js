const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const CHAT_SERVICE_SID = creds.ChatServiceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const channelSid = "CHXXXXXXXXXXXXXXXXXXXXXXXXX";

async function getChannel(channelSid) {
  const channel = await client.chat.v2.services(CHAT_SERVICE_SID)
    .channels(channelSid)
    .fetch();

  return channel;
};

const runner = async () => {
  const channel = await getChannel(channelSid);
  console.log('channel', channel);
}

runner();
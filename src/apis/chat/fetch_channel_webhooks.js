const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const CHAT_SERVICE_SID = creds.ChatServiceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const channelSid = "CHXXXXXXXXXXXXXXXXXXXXXXXXX";

async function getChannelWebhooks(channelSid) {
  const webhooks = await client.chat.v2.services(CHAT_SERVICE_SID)
    .channels(channelSid)
    .webhooks.list();

  return webhooks;
};

const runner = async () => {
  const webhooks = await getChannelWebhooks(channelSid);
  console.log('webhooks', webhooks);
}

runner();
const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const CHAT_SERVICE_SID = creds.ChatServiceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const channelSid = "CHXXXXXXXXXXXXXXXXXXXXXXXXX";

async function getChannelMessages(channelSid) {
  const messages = await client.chat.v2.services(CHAT_SERVICE_SID)
    .channels(channelSid)
    .messages.list();

  return messages;
};

const runner = async () => {
  const messages = await getChannelMessages(channelSid);
  console.log('messages', messages);
}

runner();
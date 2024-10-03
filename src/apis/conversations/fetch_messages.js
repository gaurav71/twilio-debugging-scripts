const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const conversationSid = "CHXXXXXXXXXXXXXXXXXXXXXXXXX";

async function getMessages(conversationSid) {
  const messages = await client.conversations.v1
    .conversations(conversationSid)
    .messages.list();

  return messages;
}

async function runner() {
  const messages = await getMessages(conversationSid);
  console.log('messages', messages);
}

runner();
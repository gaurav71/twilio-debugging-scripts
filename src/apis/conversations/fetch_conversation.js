const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const conversationSid = "CHXXXXXXXXXXXXXXXXXXXXXXXXX";

async function getConversation(conversationSid) {
  const conversation = await client.conversations.v1
    .conversations(conversationSid)
    .fetch();

  return conversation;
}

async function runner() {
  const conversation = await getConversation(conversationSid);
  console.log('conversation', conversation);
}

runner();
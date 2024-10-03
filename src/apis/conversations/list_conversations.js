const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

async function listConversations() {
  const conversations = await client.conversations.v1
    .conversations.list({
      limit: 10
    });

  return conversations;
}

async function runner() {
  const conversations = await listConversations();
  console.log('conversations', conversations);
}

runner();
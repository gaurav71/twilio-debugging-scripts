const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const conversationSid = "CHXXXXXXXXXXXXXXXXXXXXXXXXX";

async function getConversationWebhooks(conversationSid) {
  const webhooks = await client.conversations.v1
    .conversations(conversationSid)
    .webhooks.list();

  return webhooks;
}

async function runner() {
  const webhooks = await getConversationWebhooks(conversationSid);
  console.log('webhooks', webhooks);
}

runner();
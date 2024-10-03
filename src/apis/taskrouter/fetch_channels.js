const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const WORKSPACE_SID = creds.WorkspaceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

async function fetchChannels() {
  const channels = await client.taskrouter.v1.workspaces(WORKSPACE_SID).taskChannels.list();
  return channels;
}

const runner = async () => {
  const channels = await fetchChannels();
  console.log('channels', channels.map(({uniqueName}) => uniqueName));
}

runner();
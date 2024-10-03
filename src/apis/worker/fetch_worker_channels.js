const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const WORKSPACE_SID = creds.WorkspaceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const workerSid = "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

async function listWorkerChannels(workerSid) {
  const workerChannels = await client.taskrouter.v1
    .workspaces(WORKSPACE_SID)
    .workers(workerSid)
    .workerChannels.list({ limit: 20 });

  return workerChannels;
}

const runner = async () => {
  const channels = await listWorkerChannels(workerSid);
  console.log('channels', channels);
};

runner();

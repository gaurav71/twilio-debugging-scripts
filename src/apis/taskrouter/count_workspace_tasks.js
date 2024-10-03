const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const WORKSPACE_SID = creds.WorkspaceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const runner = async () => {
  const workspaceStats = await client.taskrouter.v1.workspaces(WORKSPACE_SID)
    .realTimeStatistics()
    .fetch()

    console.log(workspaceStats);
}

runner();
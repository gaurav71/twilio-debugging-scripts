const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const WORKSPACE_SID = creds.WorkspaceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const worker = {
  username: '',
}

async function fetchWorkers () {
  const workers = await client.taskrouter.v1.workspaces(WORKSPACE_SID).workers.list({
    targetWorkersExpression: `username = '${worker.username}'`,
    limit: 20,
  });

  return workers;
};

const runner = async () => {
  const workers = await fetchWorkers();
  console.log(workers);
};

runner();
const creds = require("../../../creds").DEV;
const Twilio = require("twilio");

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const WORKSPACE_SID = creds.WorkspaceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const taskSid = 'WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

async function fetchTask(taskSid) {
  const task = await client.taskrouter.v1.workspaces(WORKSPACE_SID).tasks(taskSid).fetch();
  return task;
}

const runner = async () => {
  const task = await fetchTask(taskSid);
  console.log('task', task);
}

runner();
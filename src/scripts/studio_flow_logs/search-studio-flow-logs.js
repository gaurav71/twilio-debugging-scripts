const creds = require('../../../creds').DEV;
const Twilio = require('twilio');

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const flowName = 'VOICE IVR';
const startDate = new Date("2025-04-25T00:00:30Z");
const endDate = new Date("2025-05-25T12:18:00Z");
const searchData = ['CA43XXXXXXXXXXXXXXXXXXXXXXXX'];

const createBatches = (data, batchSize) => {
  const batches = [];
  data.forEach((obj) => {
    if (!batches.length || batches[batches.length - 1].length === batchSize) {
      batches.push([]);
    }
    batches[batches.length - 1].push(obj);
  });
  return batches;
};

async function fetchFlow(flowName) {
  const flows = await client.studio.v1.flows.list({ limit: 1000 });
  const flow = flows.find(({ friendlyName }) => friendlyName === flowName);
  return flow;
}

async function fetchExecutionContext(flowSid, flowExecutionSid) {
  const executionContext = await client.studio.v1
    .flows(flowSid)
    .executions(flowExecutionSid)
    .executionContext()
    .fetch();

  return executionContext;
}

async function fetchStudioFlowExecutionsPage(flowSid, page) {
  if (!page) {
    page = await client.studio.v1
      .flows(flowSid)
      .executions.page({
        pageSize: 1000,
        dateCreatedFrom: startDate,
        dateCreatedTo: endDate
      });
  } else {
    page = await page.nextPage();
  }

  return page;
}

async function searchFlowExecutions(flowSid) {
  let page = null;
  const result = [];

  do {
    page = await fetchStudioFlowExecutionsPage(flowSid, page);
    const instances = page.instances;

    console.log('Page Details', {
      size: instances.length
    });

    const batches = createBatches(instances, 20);

    for (const batch of batches) {
      console.log(`Searching ${batch.length} executions`);

      const contexts = await Promise.all(batch.map(async (instance) => {
        const executionContext = await fetchExecutionContext(flowSid, instance.sid);
        return { instance, executionContext };
      }));

      contexts.forEach(({ instance, executionContext }) => {
        if (searchData.some((data => JSON.stringify(executionContext).includes(data)))) {
          console.log(`Found Execution: ${instance.sid}`);
          result.push(instance);
        }
      });

      await new Promise(res => setTimeout(res, 1000));
    }
  } while (page.nextPageUrl && result.length === 0);

  return result;
}

async function runner() {
  const flow = await fetchFlow(flowName);
  console.log(`Flow Name: ${flow.friendlyName}`);
  console.log(`Flow SID: ${flow.sid}`);

  if (!flow) {
    console.log(`${flowName} not found`);
    return;
  }

  const executions = await searchFlowExecutions(flow.sid);
  console.log(executions);
}

runner();
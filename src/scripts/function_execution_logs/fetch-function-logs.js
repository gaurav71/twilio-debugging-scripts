const creds = require('../../../creds').DEV;
const Twilio = require('twilio');

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const functionUrl = 'https://test-functions-1234-dev.twil.io/test'
const startDate = new Date("2024-10-01T00:10:47Z")
const endDate = new Date("2024-10-01T14:11:00Z")

const fetchFunctionService = async (functionUrl) => {
  const services = await client.serverless.v1.services
    .list({ limit: 100 })
  
  const service = services.find(({ friendlyName }) => functionUrl.includes(friendlyName))
  return service
}

const fetchFunctionEnvironment = async (serviceSid) => {
  const environments = await client.serverless.v1.services(serviceSid)
    .environments
    .list({ limit: 100 })

    const environment = environments.find(({ domainName }) => functionUrl.includes(domainName))
    return environment
}

const fetchFunction = async (serviceSid) => {
  const functions = await client.serverless.v1.services(serviceSid)
  .functions
  .list()

  const func = functions.find(({ friendlyName }) => functionUrl.includes(friendlyName.split('.')[0]))
  return func
}

const fetchFunctionExecutionLogs = async ({ serviceSid, environmentSid, functionSid }) => {
  const logs = await client.serverless.v1.services(serviceSid)
    .environments(environmentSid)
    .logs
    .list({
      functionSid,
      startDate,
      endDate
    })

    return logs
}

const runner = async () => {
  const service = await fetchFunctionService(functionUrl)
  console.log('Function Service SID:', service.sid)
  const environment = await fetchFunctionEnvironment(service.sid)
  console.log('Function Environment SID:', environment.sid)
  const func = await fetchFunction(service.sid)
  console.log('Function SID:', func.sid)

  const logs = await fetchFunctionExecutionLogs({
    serviceSid: service.sid,
    environmentSid: environment.sid,
    functionSid: func.sid
  })

  console.log(logs)
}

runner()
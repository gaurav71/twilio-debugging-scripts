const creds = require('../../../creds').DEV;
const Twilio = require('twilio');

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const errorEventSid = 'NOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
const functionUrl = 'https://test-functions-1234-dev.twil.io/test'

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

const fetchErrorLog = async ({ serviceSid, environmentSid, errorEventSid }) => {
  return client.serverless.v1.services(serviceSid)
    .environments(environmentSid)
    .logs(errorEventSid)
    .fetch()
}

const fetchFunctionExecutionLogs = async ({ serviceSid, environmentSid, errorLog }) => {
  const startDate = new Date(errorLog.dateCreated.getTime())
  const endDate = new Date(errorLog.dateCreated.getTime())
  startDate.setSeconds(startDate.getSeconds() - 15)
  endDate.setSeconds(endDate.getSeconds() + 15)

  console.log('Error Log Created Date:', errorLog.dateCreated)
  console.log('Start Date:', startDate)
  console.log('End Date:', endDate)

  const logs = await client.serverless.v1.services(serviceSid)
    .environments(environmentSid)
    .logs
    .list({
      functionSid: errorLog.functionSid,
      startDate,
      endDate
    })

    const requestLogs = logs.filter(({ requestSid }) => requestSid == errorLog.requestSid)
    return requestLogs
}

const runner = async () => {
  const service = await fetchFunctionService(functionUrl)
  console.log('Function Service SID:', service.sid)
  const environment = await fetchFunctionEnvironment(service.sid)
  console.log('Function Environment SID:', environment.sid)

  const errorLog = await fetchErrorLog({
    serviceSid: service.sid,
    environmentSid: environment.sid,
    errorEventSid
  })

  console.log('Error Log SID:', errorLog.sid)

  const errorLogs = await fetchFunctionExecutionLogs({
    serviceSid: service.sid,
    environmentSid: environment.sid,
    errorLog
  })

  console.log(errorLogs)
}

runner()
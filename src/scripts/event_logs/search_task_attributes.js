const creds = require('../../../creds').DEV;
const Twilio = require('twilio');
const fs = require('fs');
const path = require('path');

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const WORKSPACE_SID = creds.WorkspaceSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const searchData = {
  startDate: new Date("2025-05-01T00:00:00Z"), 
  taskChannel: "voice",
  eventType: "task.created",
}

const searchAll = true;
const searchAttr = ["CA43XXXXXXXXXXXXXXXXXXXXXXXXX"];

const filterEvents = (events) => {
  return events.filter(({ eventData }) => {
    return searchAttr.some(attr => eventData.task_attributes.includes(attr));
  });
}

function handleEventPage(eventPage, result) {
  const events = eventPage.instances;
  const matchingEvents = filterEvents(events);
  result.push(...matchingEvents);
  const saveResultsPath = path.join(__dirname, 'results.json');
  fs.writeFileSync(saveResultsPath, JSON.stringify({ count: result.length, data: result }, null, 2));
  
  console.log({
    pageCount: events.length,
    pageMatchCount: matchingEvents.length,
    totalMatchCount: result.length,
    date: events.length ? events[events.length-1].eventDate : '',
    nextPageUrl: eventPage.nextPageUrl,
  });
}

async function searchEvents() {
  const result = [];

  let eventPage = await client.taskrouter.v1.workspaces(WORKSPACE_SID)
    .events
    .page({
      ...searchData,
      pageSize: 1000,
    });

  handleEventPage(eventPage, result);

  while ((searchAll || !result.length) && eventPage.nextPageUrl) {
    eventPage = await eventPage.nextPage();
    handleEventPage(eventPage, result);
  }

  console.log('result', result.length, result);
  return result;
}


const runner = async () => {
  await searchEvents();
}

runner();
const Twilio = require("twilio");
const creds = require("../../../creds").DEV;

const API_KEY = creds.ApiKey;
const API_SECRET = creds.ApiSecret;
const ACCOUNT_SID = creds.AccountSid;
const client = Twilio(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });

const flexInteractionSid = "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const flexInteractionChannelSid = "";

async function getFlexInteractionChannelParticipants(
  flexInteractionSid,
  flexInteractionChannelSid
) {
  const flexInteractionChannels = await client.flexApi.v1
    .interaction(flexInteractionSid)
    .channels(flexInteractionChannelSid)
    .participants.list();
  return flexInteractionChannels;
}


const runner = async () => {
  const participants = await getFlexInteractionChannelParticipants(flexInteractionSid, flexInteractionChannelSid);
  console.log('participants', participants);
};

runner();

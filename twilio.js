// Set up Twilio API
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUMBER;
const recNum = process.env.TWILIO_RECNUM;
const numbers = { twilioNum, recNum }
const client = require('twilio')(accountSid, authToken);

module.exports = { client, numbers }

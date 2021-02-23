let nock = require('nock');

module.exports.hash = "21c631066e99f347fa689e7ebd82576d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18331234567","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"224e54c8-ed81-42db-a0e6-a1343484fa29","repeatabilityFirstSent":"Tue, 23 Feb 2021 21:49:30 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'yHqeGCveK0SHVjJe59/cyQ.0',
  'X-Processing-Time',
  '11ms',
  'X-Azure-Ref',
  '0ang1YAAAAAClYqy/5vSrTLWELqcVSH3HWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 23 Feb 2021 21:49:30 GMT'
]);

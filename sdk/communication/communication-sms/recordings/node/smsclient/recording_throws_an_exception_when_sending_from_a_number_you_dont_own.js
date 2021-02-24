let nock = require('nock');

module.exports.hash = "21c631066e99f347fa689e7ebd82576d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18331234567","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"eeaf7668-9ced-49ca-9a77-b1725c7c1a7b","repeatabilityFirstSent":"Wed, 24 Feb 2021 19:50:49 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'pEdfVOvlk0u5cNBex26f4w.0',
  'X-Processing-Time',
  '11ms',
  'X-Azure-Ref',
  '0Ga42YAAAAAAtEa3WMtU7QKhUopFzjpeMWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 24 Feb 2021 19:50:49 GMT'
]);

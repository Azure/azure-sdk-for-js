let nock = require('nock');

module.exports.hash = "21c631066e99f347fa689e7ebd82576d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18331234567","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"60aaa826-c5e6-47fc-84df-9f2170fe4a51","repeatabilityFirstSent":"Tue, 23 Feb 2021 19:43:05 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '2mEbS8Vur0y98Wm42GUzEQ.0',
  'X-Processing-Time',
  '11ms',
  'X-Azure-Ref',
  '0yVo1YAAAAABlG+uG461nSYAp4Ry5BmTXWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 23 Feb 2021 19:43:05 GMT'
]);

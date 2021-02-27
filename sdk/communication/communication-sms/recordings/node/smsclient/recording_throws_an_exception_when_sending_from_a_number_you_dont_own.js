let nock = require('nock');

module.exports.hash = "21c631066e99f347fa689e7ebd82576d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18331234567","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'wKtqxG0ja0q4P6J8itpLtg.0',
  'X-Processing-Time',
  '13ms',
  'X-Azure-Ref',
  '0po05YAAAAADJ3Olupjc9RaF4llaLRTvJWVZSMzBFREdFMDQxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 27 Feb 2021 00:09:10 GMT'
]);

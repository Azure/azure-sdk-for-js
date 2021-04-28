let nock = require('nock');

module.exports.hash = "e40572f5ed6d1f0cd7c4a5809ef38226";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+1425555012345","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '9y0LcN9MpkmVEkVsayiwnA.0',
  'X-Processing-Time',
  '12ms',
  'X-Azure-Ref',
  '0lkd2YAAAAAB8XcFMgXW0QK0fz3sxKSHjWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 14 Apr 2021 01:38:29 GMT'
]);

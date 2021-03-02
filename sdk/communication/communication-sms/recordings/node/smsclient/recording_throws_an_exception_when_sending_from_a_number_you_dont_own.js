let nock = require('nock');

module.exports.hash = "f38147cf4714b3fc3c6e0a4fc0f68c73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+15552143356","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '2z5pUIiPbkudlflp6Ml0RQ.0',
  'X-Processing-Time',
  '12ms',
  'X-Azure-Ref',
  '0/qw9YAAAAAA8T61x4oGWTJ4KIe8JpvTQWVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 02 Mar 2021 03:11:58 GMT'
]);

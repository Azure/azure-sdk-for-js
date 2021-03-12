let nock = require('nock');

module.exports.hash = "1c9952921e68fef3ef02c726a6c64f46";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(404, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'Ar/8IJvhqUKOnzemHhyaKA.0',
  'X-Processing-Time',
  '13ms',
  'X-Azure-Ref',
  '02sZLYAAAAADav9ZxDZVoT7znHrhrZTPGWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 12 Mar 2021 19:54:02 GMT'
]);

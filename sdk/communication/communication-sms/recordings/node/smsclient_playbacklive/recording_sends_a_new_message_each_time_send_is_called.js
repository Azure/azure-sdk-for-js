let nock = require('nock');

module.exports.hash = "922f0b625504f7c8016518b47fafe1c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"sanitized","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'BHIBaDIaI06arjquj4byAQ.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '469ms',
  'X-Azure-Ref',
  '02MZLYAAAAACKIxin9JmHTaCmpQfarkliWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 12 Mar 2021 19:54:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"sanitized","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
<<<<<<< HEAD
  '6+oJBaF7i0WVq4FQW+EBsg.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '387ms',
  'X-Azure-Ref',
  '0kNxHYAAAAACv0NvdaXLdR75NCYNj3JbHWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 09 Mar 2021 20:37:36 GMT'
=======
  'JbrwwhhHEU2Ci7tz2wtGMg.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '488ms',
  'X-Azure-Ref',
  '02cZLYAAAAACFecqwOz2nRpLLE+oMp8lSWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 12 Mar 2021 19:54:01 GMT'
>>>>>>> a2683af96 (update recordings)
]);

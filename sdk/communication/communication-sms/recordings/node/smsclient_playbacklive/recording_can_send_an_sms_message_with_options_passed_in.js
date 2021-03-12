let nock = require('nock');

module.exports.hash = "655c31e1d29ac4c3087ef778d5312ed8";

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
  '4jMFGjYoA0GPjpF53H/qvw.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '468ms',
  'X-Azure-Ref',
  '018ZLYAAAAABPrpJ+MI6cQZmXPl2I0V1QWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 12 Mar 2021 19:54:00 GMT'
]);

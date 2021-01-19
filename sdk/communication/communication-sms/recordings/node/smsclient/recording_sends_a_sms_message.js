let nock = require('nock');

module.exports.hash = "e9ca3e20f65ddb447cc01a00b7a442a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","to":["+18005551234"],"message":"test message","sendSmsOptions":{}})
  .query(true)
  .reply(200, {"messageId":"Sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'oLB+DpQkGkCgc7OqurGsyw.0',
  'X-Processing-Time',
  '482ms',
  'X-Azure-Ref',
  '0NhsHYAAAAADQ+P8dHsTtQbtueR1XFl5pRVdSMzBFREdFMDUyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 19 Jan 2021 17:47:34 GMT'
]);

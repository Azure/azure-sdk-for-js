let nock = require('nock');

module.exports.hash = "9d22e91b3c0859e19eebf021b89a898f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(true)
  .reply(404, {"error":{"code":"InternalError","message":"The server encountered an internal error."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  '02JA3AYOPkWV6WK90oakLg.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '71ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/ATeYQAAAACnKhumoeuaRbRjWxOe6KuoUklPMDFFREdFMDUxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:30:20 GMT'
]);

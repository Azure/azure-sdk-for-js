let nock = require('nock');

module.exports.hash = "9d22e91b3c0859e19eebf021b89a898f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
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
  'QdMD7Y75oUuEz/OnGua9RA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '301ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FMzMYAAAAAAJQcr/2q+HTrABQAGhIAtoWVZSMzBFREdFMDQxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:43 GMT'
]);

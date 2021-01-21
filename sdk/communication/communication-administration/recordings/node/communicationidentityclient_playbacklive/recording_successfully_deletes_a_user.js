let nock = require('nock');

module.exports.hash = "c32f7ebc5af64d902e3e080cc228e00f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .delete('/identities/sanitized')
  .query(false)
  .reply(204, "", [
  'MS-CV',
  'RJ69d+okxUmVuM8XH9j/kg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '602ms',
  'X-Azure-Ref',
  '0WuUFYAAAAAD8nD9qfs74Q4ajt0Yafib2RVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:31 GMT'
]);

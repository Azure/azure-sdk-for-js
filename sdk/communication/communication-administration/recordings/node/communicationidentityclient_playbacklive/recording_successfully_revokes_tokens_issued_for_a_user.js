let nock = require('nock');

module.exports.hash = "e10098ac22e2857510889e9c31a45559";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .patch('/identities/sanitized', {"tokensValidFrom":"2020-10-10T00:00:00.000Z"})
  .query(false)
  .reply(204, "", [
  'MS-CV',
  'VBWxGovE50GB8VmCr9iQcQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '565ms',
  'X-Azure-Ref',
  '0WuUFYAAAAACL7hFckMA4RKbvvQNRLqiTRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:30 GMT'
]);

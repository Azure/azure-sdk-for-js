let nock = require('nock');

module.exports.hash = "1c880cc35f2f3b240445a35a012e7bab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities/sanitized/token', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"id":"sanitized","token":"sanitized","expiresOn":"2021-01-19T19:45:28.2080553+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ViakJlslP0Gr/hJJUwdkcA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '273ms',
  'X-Azure-Ref',
  '0WOUFYAAAAABElPvEATEdToswEcq9JnRpRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:29 GMT'
]);

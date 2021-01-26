let nock = require('nock');

module.exports.hash = "71dd63e8f90b2c2eb44bc15618466368";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/identities')
  .query(true)
  .reply(200, {"id":"sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'E+IzX1is4EqUAcOqMeE55g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-01-15-preview3, 2020-07-20-preview1, 2020-07-20-preview2',
  'X-Processing-Time',
  '207ms',
  'X-Azure-Ref',
  '0WOUFYAAAAAAE5FyAC49xSJmRvP7Ah1HLRVdSMzBFREdFMDUyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 19:45:28 GMT'
]);

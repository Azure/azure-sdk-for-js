let nock = require('nock');

module.exports.hash = "014f1aaa9b9520b08b6157d5dff1d5af";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:revokeAccessTokens')
  .query(true)
  .reply(204, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'NXjRaivaVEOuQHXs7UdIrA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '176ms',
  'X-Azure-Ref',
  '0PTg4YAAAAADLLiiFMGjVTr3RYE6QY0HvWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 25 Feb 2021 23:52:28 GMT'
]);

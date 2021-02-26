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
  'Yj+EpOlUikWzyy8n6QCOdw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '61ms',
  'X-Azure-Ref',
  '011k4YAAAAAApD1xPMPd4RaE9Opq1k91xWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 02:15:50 GMT'
]);

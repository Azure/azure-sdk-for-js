let nock = require('nock');

module.exports.hash = "c114910037975ecd99c548006650f0e8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"sanitized"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'M7l4JzinuEeH3P2qMBqi6Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '20ms',
  'X-Azure-Ref',
  '0SmksYAAAAACwXbuxbgIZR5C1poAHADmdWVZSMzBFREdFMDMwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 17 Feb 2021 00:54:34 GMT'
]);

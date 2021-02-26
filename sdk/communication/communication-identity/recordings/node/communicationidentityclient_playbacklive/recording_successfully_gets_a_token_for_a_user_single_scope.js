let nock = require('nock');

module.exports.hash = "fc472a9743135d47848eb710ce8e10e8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:issueAccessToken', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"token":"sanitized","expiresOn":"2021-02-27T02:15:49.9561094+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'NqyGyw3Q0UWLxRc8Mqth5Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '26ms',
  'X-Azure-Ref',
  '01lk4YAAAAADe5kx0glR2QokngDjVt6ufWVZSMzBFREdFMDMxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 02:15:50 GMT'
]);

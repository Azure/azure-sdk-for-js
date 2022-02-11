let nock = require('nock');

module.exports.hash = "89176238df03483b3c933fed336aade5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:getToken', {"token":"sanitized"})
  .query(true)
  .reply(401, {"error":{"code":"InvalidAccessToken","message":"Provided access token is not valid."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'zq/oNVjGLEOI1JOIlXeZXQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'X-Processing-Time',
  '35ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0SkYGYgAAAAAPx/7VZIRBQKtKRFkLHxjdUFJHMDFFREdFMDkwNgBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:38 GMT'
]);

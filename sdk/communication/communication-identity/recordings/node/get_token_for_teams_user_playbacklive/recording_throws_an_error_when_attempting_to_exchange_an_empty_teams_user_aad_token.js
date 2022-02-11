let nock = require('nock');

module.exports.hash = "717a80a7fe666217ddc3af4511a23d24";

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
  'N81VskMRdUm6t7gG7dE9xQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'X-Processing-Time',
  '22ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0SkYGYgAAAAA7tUZgAmrTT7256UGnriRQUFJHMDFFREdFMDcxOQBmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Fri, 11 Feb 2022 11:19:37 GMT'
]);

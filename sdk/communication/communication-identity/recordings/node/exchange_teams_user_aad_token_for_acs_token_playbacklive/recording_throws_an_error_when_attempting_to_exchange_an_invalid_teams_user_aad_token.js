let nock = require('nock');

module.exports.hash = "b06401222f6495704496033a41a8f3ac";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(401, {"error":{"code":"InvalidAccessToken","message":"Provided access token is not valid."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'x9aTyaEVc06Seipy0Rjipg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '00000000-0000-0000-0000-000000000000',
  'X-Processing-Time',
  '18ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0535xYQAAAAD8198XQBMvR7mbsqf1CMtdUFJHMDFFREdFMDYwOABmMDlhNGMxMy0yMWYxLTQ4ZWMtOWNmNy02NjU0NTY4NGI2NDI=',
  'Date',
  'Thu, 21 Oct 2021 14:53:26 GMT'
]);

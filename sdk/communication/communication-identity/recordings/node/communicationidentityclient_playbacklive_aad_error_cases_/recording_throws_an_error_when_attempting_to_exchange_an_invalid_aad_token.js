let nock = require('nock');

module.exports.hash = "8702561eda37c6a4a083d3b6f597e190";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(401, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'WcigGxnyOkG/3pTyl+O9PQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'X-Processing-Time',
  '880ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0u2StYAAAAAC/XwbepM/JSoKz0P0kRadvV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 25 May 2021 20:57:32 GMT',
  'Content-Length',
  '0'
]);

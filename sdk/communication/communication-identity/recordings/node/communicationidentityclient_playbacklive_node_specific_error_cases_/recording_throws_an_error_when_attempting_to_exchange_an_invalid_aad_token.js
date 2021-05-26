let nock = require('nock');

module.exports.hash = "7465087e95cd3fd96ca28d7c4ccaca4f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(401, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'DXv6YHSRFU6Uy13bi4TGmQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'X-Processing-Time',
  '4ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tMauYAAAAAC2SZFMi0kTS55IR6Ajy73nV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 26 May 2021 22:07:47 GMT',
  'Content-Length',
  '0'
]);

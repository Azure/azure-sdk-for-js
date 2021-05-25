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
  '2DUEaGaXZ0iWPC3SCZqbgg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'X-Processing-Time',
  '4ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0w2StYAAAAADk4RMkZY3aS4mjj2FOMpAfV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 25 May 2021 20:57:39 GMT',
  'Content-Length',
  '0'
]);

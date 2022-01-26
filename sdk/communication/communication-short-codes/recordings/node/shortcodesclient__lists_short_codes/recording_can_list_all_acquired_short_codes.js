let nock = require('nock');

module.exports.hash = "cd026b9bd924e93065b201c18fbe020e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/shortCodes')
  .query(true)
  .reply(200, {"shortCodes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'hM3lBNqudkGXkJIDR1letg.0',
  'api-supported-versions',
  '2021-10-25-preview',
  'X-Processing-Time',
  '465ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0z+GSYQAAAAC/7IlfQV7ORJ/vKFE/fdn9V1NURURHRTA4MTUAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 15 Nov 2021 22:40:15 GMT'
]);

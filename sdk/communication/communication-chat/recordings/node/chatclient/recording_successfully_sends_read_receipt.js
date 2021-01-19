let nock = require('nock');

module.exports.hash = "7bfeb93c91b865922918888b4e2a5ba3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/readReceipts', {"chatMessageId":"1610503608398"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'rJu0zzvRnEqDC/9uJYDafA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '85ms',
  'X-Azure-Ref',
  '0uFX+XwAAAAAOtqSAAN/YSom9vNuECw6bV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:48 GMT',
  'Content-Length',
  '0'
]);

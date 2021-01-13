let nock = require('nock');

module.exports.hash = "9b24f9f0b408c48d472358651b13d15f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe","chatMessageId":"1610503608398","readOn":"2021-01-13T02:06:48Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'BJPSo6SXa0Oc4OuU49lsFQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '71ms',
  'X-Azure-Ref',
  '0u1X+XwAAAABb+hSJu5zgS6VuBYm9pzW3V1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:51 GMT'
]);

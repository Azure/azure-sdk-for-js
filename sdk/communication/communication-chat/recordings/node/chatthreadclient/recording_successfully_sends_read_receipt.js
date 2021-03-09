let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338%40thread.v2/readReceipts', {"chatMessageId":"1615252741058"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'ZF8Mags4h0CNUnVrHZRkLA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '149ms',
  'X-Azure-Ref',
  '0Bc1GYAAAAAAUeIlYbzR2RqT77hnAeKIOV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:01 GMT',
  'Content-Length',
  '0'
]);

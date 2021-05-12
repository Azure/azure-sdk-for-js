let nock = require('nock');

module.exports.hash = "7bfeb93c91b865922918888b4e2a5ba3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2/readReceipts', {"chatMessageId":"1619048916697"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'Cz8sdoRLRU6xubAUpkhHKQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '107ms',
  'X-Azure-Ref',
  '01bmAYAAAAACYfGG5+eQ0Ro8iu25Cv4zYV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:36 GMT',
  'Content-Length',
  '0'
]);

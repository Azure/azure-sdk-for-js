let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/readReceipts', {"chatMessageId":"1613524939985"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '2kZ4ySokdEWg9hg9iJ/1Tg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '110ms',
  'X-Azure-Ref',
  '0zG8sYAAAAACT8r9rhC0WS5v8cGQs4HPWU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:20 GMT',
  'Content-Length',
  '0'
]);

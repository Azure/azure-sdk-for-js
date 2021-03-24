let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1%40thread.v2/readReceipts', {"chatMessageId":"1616527059857"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'zEmEcRlFy02gb0dQVca/MQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '291ms',
  'X-Azure-Ref',
  '01D5aYAAAAADfdKR/DyAKQr7DYGPXWBAOV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:39 GMT',
  'Content-Length',
  '0'
]);

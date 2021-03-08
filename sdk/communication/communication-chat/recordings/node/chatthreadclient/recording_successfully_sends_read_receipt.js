let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794%40thread.v2/readReceipts', {"chatMessageId":"1615234854931"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'MHtyxZS9oE2x/hkKlRPzGw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '160ms',
  'X-Azure-Ref',
  '0J4dGYAAAAAA7lkDtVSwZRIa9GMM97xCGV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:55 GMT',
  'Content-Length',
  '0'
]);

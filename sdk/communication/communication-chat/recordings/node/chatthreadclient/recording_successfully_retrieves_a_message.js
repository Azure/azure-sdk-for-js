let nock = require('nock');

module.exports.hash = "7c976d3befda9a0d9518a65935a99ebc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2/messages/1619048916697')
  .query(true)
  .reply(200, {"id":"1619048916697","type":"text","sequenceId":"4","version":"1619048916697","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-04-21T23:48:36Z","senderCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}},"properties":{"tags":"sometag"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'dkKiQEdAw0aH8i/rt4Dx7w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '142ms',
  'X-Azure-Ref',
  '01bmAYAAAAAAYF9f3y3BfR73JTBlKfBvvV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:37 GMT'
]);

let nock = require('nock');

module.exports.hash = "36b8d91d6911e6d7390eeb466bc6c56a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'aLIgr459l0KTdwEb8DM5KQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '300ms',
  'X-Azure-Ref',
  '007mAYAAAAAAg1HLGItrcQrfPYgSgW3vnV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:ScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1@thread.v2","topic":"new topic","createdOn":"2021-04-21T23:48:34Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8","communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_00000009-96b7-7f4e-edbe-a43a0d0092d8"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'GORzXknTTkmyTLVxYeBICw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '139ms',
  'X-Azure-Ref',
  '01LmAYAAAAAAFq4QGL7I7SaUCIliobV0TV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:35 GMT'
]);

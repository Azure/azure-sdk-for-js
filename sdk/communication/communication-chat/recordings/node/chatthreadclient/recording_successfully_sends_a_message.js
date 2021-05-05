let nock = require('nock');

module.exports.hash = "c31006d5471975cc3efa279ceee4aeef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2/messages', {"content":"content","properties":{"tags":"sometag"}})
  .query(true)
  .reply(201, {"id":"1619048916697"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-prod-e2e.communication.azure.com/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1@thread.v2/messages/1619048916697',
  'MS-CV',
  'fxM2aFcNJkCp5p1gjw2w/A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '169ms',
  'X-Azure-Ref',
  '01LmAYAAAAADVJbNkAjwiS4LN3A/cqGQKV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:36 GMT'
]);

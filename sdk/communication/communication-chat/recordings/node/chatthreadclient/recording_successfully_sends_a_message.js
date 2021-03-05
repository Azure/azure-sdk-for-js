let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AgzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1614981448987"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3AgzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81@thread.v2/messages/1614981448987',
  'MS-CV',
  'PZJIZKfv/kuAbaE1UIuNfA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '210ms',
  'X-Azure-Ref',
  '0SKlCYAAAAAB9ZBHgXfvdQKO9hOW5tY0YV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:28 GMT'
]);

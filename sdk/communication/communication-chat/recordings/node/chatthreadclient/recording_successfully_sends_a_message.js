let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1615252741058"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338@thread.v2/messages/1615252741058',
  'MS-CV',
  'mkk1z+psbEKdAGMKh6S8GA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '197ms',
  'X-Azure-Ref',
  '0BM1GYAAAAABLrZIK8vCmQrCQBZ/aM0kSV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:00 GMT'
]);

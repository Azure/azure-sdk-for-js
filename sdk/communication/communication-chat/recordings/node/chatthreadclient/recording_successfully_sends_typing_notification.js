let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'SAcaPD4HOUW8+m0lOZr0OA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '197ms',
  'X-Azure-Ref',
  '0J4dGYAAAAACJ1paXn/1DQLpgLSDU9OmuV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:55 GMT',
  'Content-Length',
  '0'
]);

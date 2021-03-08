let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1615234854931"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794@thread.v2/messages/1615234854931',
  'MS-CV',
  '49/pGazRrUquv4grLNv+bQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '200ms',
  'X-Azure-Ref',
  '0JodGYAAAAABThEc94qBXRIM/eXmUlSVQV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:54 GMT'
]);

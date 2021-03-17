let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1615253258990"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0@thread.v2/messages/1615253258990',
  'MS-CV',
  'BJOOYSov80aYCFR9f0vN1A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '148ms',
  'X-Azure-Ref',
  '0Cs9GYAAAAAAB3IXN+53+Q52ZqpquFzQsV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:39 GMT'
]);

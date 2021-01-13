let nock = require('nock');

module.exports.hash = "dbe5b264c11dbef1d4f15779defd44e9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'Ahqv2QoFSkioNWlZp8rDAQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '94ms',
  'X-Azure-Ref',
  '0uFX+XwAAAABclQDZ89uGQYMcu/AjT7SfV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:48 GMT',
  'Content-Length',
  '0'
]);

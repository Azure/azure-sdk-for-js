let nock = require('nock');

module.exports.hash = "58ee2be7113924a625c4f7dfbbd61b45";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads')
  .query(true)
  .reply(200, {"value":[{"id":"19:9f956fe210414cc3a38295c399294c02@thread.v2","topic":"test topic","lastMessageReceivedOn":"2020-12-30T20:25:42Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'o1sWAVQydEOUKu90z/hHIA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '351ms',
  'X-Azure-Ref',
  '0RuLsXwAAAABBMMYn4fSUSq9/2s8aUFOzWVZSMzBFREdFMDQwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:43 GMT'
]);

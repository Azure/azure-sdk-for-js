let nock = require('nock');

module.exports.hash = "58ee2be7113924a625c4f7dfbbd61b45";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads')
  .query(true)
  .reply(200, {"value":[{"id":"19:883ce5bf892c47d6a7da73da6df31c7e@thread.v2","topic":"test topic","lastMessageReceivedOn":"2021-01-13T02:06:47Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'tf9+XXaiyUmgwEa/46r2Vw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '70ms',
  'X-Azure-Ref',
  '0t1X+XwAAAAB87DTJvTugRZiPOqAM+XrNV1NURURHRTA4MTkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:47 GMT'
]);

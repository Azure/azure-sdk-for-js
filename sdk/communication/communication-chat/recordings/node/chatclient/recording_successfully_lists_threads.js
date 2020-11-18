let nock = require('nock');

module.exports.hash = "58ee2be7113924a625c4f7dfbbd61b45";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads')
  .query(true)
  .reply(200, {"value":[{"id":"19:08f3db9af86044bfa21eb8b02b847f22@thread.v2","topic":"test topic","lastMessageReceivedOn":"2020-11-16T23:49:01Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '22t8WWj2ak62uRrtA4De0Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '411ms',
  'X-Azure-Ref',
  '07g+zXwAAAABXFL3fOCXwT7TkbtdZpQz9V1NURURHRTA4MTQANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:02 GMT'
]);

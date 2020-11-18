let nock = require('nock');

module.exports.hash = "1111e8e6bad22cbea6c2a2da200160bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '7KJzqVYvPkyI/o/rc5hTAg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '325ms',
  'X-Azure-Ref',
  '09Q+zXwAAAAAqyhVfLhuRS5wwwqQ6NFEdV1NURURHRTA4MTQANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:09 GMT'
]);

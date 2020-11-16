let nock = require('nock');

module.exports.hash = "dbe5b264c11dbef1d4f15779defd44e9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'n41N+yvgsUu0SIZPrfCOYw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '368ms',
  'X-Azure-Ref',
  '07w+zXwAAAAAy/V+efxoJTZWXqsH1XET6V1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:03 GMT',
  'Content-Length',
  '0'
]);

let nock = require('nock');

module.exports.hash = "53fcb8011d3ec2a23568f7adea0f9bcf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:08f3db9af86044bfa21eb8b02b847f22@thread.v2","topic":"test topic","createdOn":"2020-11-16T23:49:01Z","createdBy":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148","participants":[{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'DPPyTRyGoE2OD95Oy4O6gQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '256ms',
  'X-Azure-Ref',
  '07g+zXwAAAAD7KzegQcJ3RrXOMSzG74baV1NURURHRTA4MTQANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:02 GMT'
]);

let nock = require('nock');

module.exports.hash = "b56d623d661b55248a369b405cdd5d00";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d519-ea7c-5a3a0d00025b","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-f093-8a72-5a3a0d00020a","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'o2dKo49RSE+pHFon2tAxzA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '274ms',
  'X-Azure-Ref',
  '09A+zXwAAAADlo0t8UnHYRIoj5fyQcPb/V1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:07 GMT'
]);

let nock = require('nock');

module.exports.hash = "9b24f9f0b408c48d472358651b13d15f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A08f3db9af86044bfa21eb8b02b847f22%40thread.v2/readreceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-7357-d091-b274-5a3a0d000148","chatMessageId":"1605570543468","readOn":"2020-11-16T23:49:04Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '6MFUH70xNEKbEwLQqcTayg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '260ms',
  'X-Azure-Ref',
  '09Q+zXwAAAAAIq095C7e8TIbrEtN1RKylV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Mon, 16 Nov 2020 23:49:08 GMT'
]);

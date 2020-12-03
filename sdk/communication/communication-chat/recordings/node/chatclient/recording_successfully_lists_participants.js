let nock = require('nock');

module.exports.hash = "445066970a0a7ca03bae7bcddd06b520";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a9fd-8a72-5a3a0d0000b0","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-c010-b274-5a3a0d0000aa","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'llbeDQUmVESSFdkLBz9Anw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '265ms',
  'X-Azure-Ref',
  '0P2nIXwAAAADBXkJFj0qcRKkam/puIdgxWVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:43 GMT'
]);

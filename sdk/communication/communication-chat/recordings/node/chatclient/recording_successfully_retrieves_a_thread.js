let nock = require('nock');

module.exports.hash = "6fe8036032f08d7ab99bd99ff4cc22c8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:8dbd0526e07a41ab8982a9e29a042127@thread.v2","topic":"test topic","createdOn":"2020-12-03T04:27:37Z","createdBy":"8:acs:9b665d53-8164-4923-ad5d-5e983b07d2e7_00000006-c6bc-a766-ea7c-5a3a0d000078"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'i+i5kPL/sU2O6WKHTwg4aA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '248ms',
  'X-Azure-Ref',
  '0OmnIXwAAAADdWczjzOIWRYAaRVdj6mKmWVZSMzBFREdFMDQxNgA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:38 GMT'
]);

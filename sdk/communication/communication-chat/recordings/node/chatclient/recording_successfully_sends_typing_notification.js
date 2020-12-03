let nock = require('nock');

module.exports.hash = "29fe2507518b37de260ac15c2b37c2ef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'bmKaq+8s3Em4EsLxYo23SA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '346ms',
  'X-Azure-Ref',
  '0PGnIXwAAAADxzhCtBXOaSqwgxMDWcOZgWVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:40 GMT',
  'Content-Length',
  '0'
]);

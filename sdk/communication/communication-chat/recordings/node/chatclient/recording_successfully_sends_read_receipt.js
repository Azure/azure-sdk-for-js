let nock = require('nock');

module.exports.hash = "796065a7db069a243913c6c1dda765b2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/readReceipts', {"chatMessageId":"1606969659707"})
  .query(true)
  .reply(201, "", [
  'MS-CV',
  'TaKDa2yx1kyJ7rG44FfDTA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '634ms',
  'X-Azure-Ref',
  '0PGnIXwAAAACSWbY3UiEuTaBApo61G5DhWVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:41 GMT',
  'Content-Length',
  '0'
]);

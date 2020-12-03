let nock = require('nock');

module.exports.hash = "56ef4702cc865c3b0003e57bb5f65bb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A8dbd0526e07a41ab8982a9e29a042127%40thread.v2/messages/1606969659707')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'jNR3whZAm0WZKsEfx/YGlw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '389ms',
  'X-Azure-Ref',
  '0PWnIXwAAAADX8yzMN5mlQLH86NpIJ7diWVZSMzBFREdFMDQwOQA3MDU0Mzk1ZS1jZTFkLTQ1NWUtYWU1ZC0yMzNjYTgzOTA1NTQ=',
  'Date',
  'Thu, 03 Dec 2020 04:27:42 GMT'
]);

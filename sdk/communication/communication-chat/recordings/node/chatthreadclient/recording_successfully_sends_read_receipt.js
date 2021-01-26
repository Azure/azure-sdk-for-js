let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4%40thread.v2/readReceipts', {"chatMessageId":"1611688672138"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'NVjA9UIsIka4sZ33XJnJ7g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '469ms',
  'X-Azure-Ref',
  '04GoQYAAAAABMlO13pN2CQLvLx/HCY0NlWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:52 GMT',
  'Content-Length',
  '0'
]);

let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '3QjMzlyVpECTPOE1zGRxPA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '364ms',
  'X-Azure-Ref',
  '04GoQYAAAAAB/ba3ygZFgRaLk/8JDU71ZWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:51 GMT',
  'Content-Length',
  '0'
]);

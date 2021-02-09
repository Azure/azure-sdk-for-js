let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/readReceipts', {"chatMessageId":"1612470096086"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '+uo//8UT5UWF3nlYNvTC9A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '481ms',
  'X-Azure-Ref',
  '0UFccYAAAAAAD2cdZNSYoQpr8YOZ43ieKWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:36 GMT',
  'Content-Length',
  '0'
]);

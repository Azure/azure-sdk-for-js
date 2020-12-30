let nock = require('nock');

module.exports.hash = "e811d91fee0a8c830e94b3f91f3c461d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads')
  .query(true)
  .reply(200, {"value":[{"id":"19:0771a8d8c00d4329b664c4237e41bf0c@thread.v2","topic":"test topic","lastMessageReceivedOn":"2020-12-30T21:14:24Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'HUjBwJzYh0etyWZaNpmy6A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '329ms',
  'X-Azure-Ref',
  '0se3sXwAAAAAwSlk0flNvRKDfwR7qBsHYWVZSMzBFREdFMDQxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:25 GMT'
]);

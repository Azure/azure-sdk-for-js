let nock = require('nock');

module.exports.hash = "6fe8036032f08d7ab99bd99ff4cc22c8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:0771a8d8c00d4329b664c4237e41bf0c@thread.v2","topic":"test topic","createdOn":"2020-12-30T21:14:24Z","createdBy":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '86LzAH4CjUeaC5vLYEyUyQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '264ms',
  'X-Azure-Ref',
  '0se3sXwAAAADPwviPJZFQSZFhO8taCub/WVZSMzBFREdFMDQxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:25 GMT'
]);

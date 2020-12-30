let nock = require('nock');

module.exports.hash = "796065a7db069a243913c6c1dda765b2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2/readReceipts', {"chatMessageId":"1609362866505"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'ELk7Q82AjUC8qSICTUh2Gw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '489ms',
  'X-Azure-Ref',
  '0s+3sXwAAAAA23BQQbariTKqK7zKnG8uJWVZSMzBFREdFMDQxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:27 GMT',
  'Content-Length',
  '0'
]);

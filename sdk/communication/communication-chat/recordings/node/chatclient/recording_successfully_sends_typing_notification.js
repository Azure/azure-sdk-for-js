let nock = require('nock');

module.exports.hash = "29fe2507518b37de260ac15c2b37c2ef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '3TwqKRqz7EG7Xsar14bvPg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '356ms',
  'X-Azure-Ref',
  '0su3sXwAAAAC6r9/7UYgGRp8NkUyGRkNaWVZSMzBFREdFMDQxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:26 GMT',
  'Content-Length',
  '0'
]);

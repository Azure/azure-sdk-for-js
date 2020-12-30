let nock = require('nock');

module.exports.hash = "56ef4702cc865c3b0003e57bb5f65bb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2/messages/1609362866505')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '90++Y2wll06wld8a99bYeg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '404ms',
  'X-Azure-Ref',
  '0tO3sXwAAAAAoCyQXFv16Qo/G1qnZkQ6rWVZSMzBFREdFMDQxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:28 GMT'
]);

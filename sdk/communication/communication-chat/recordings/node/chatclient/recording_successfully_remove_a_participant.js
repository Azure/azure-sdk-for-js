let nock = require('nock');

module.exports.hash = "3b167aa11c9a71d3eaf96a152e30f002";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2/participants/8%3Aacs%3A188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1ca2-b0b7-3a3a0d0044b6')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'Q3JeJgKHR0aZ8UqfC2l2rg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '436ms',
  'X-Azure-Ref',
  '0te3sXwAAAABqSVmJ8GasSI16lgClNO4lWVZSMzBFREdFMDQxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:29 GMT'
]);

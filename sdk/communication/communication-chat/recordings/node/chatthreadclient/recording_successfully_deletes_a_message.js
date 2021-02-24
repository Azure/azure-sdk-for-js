let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/messages/1612470096086')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'n00cWXiluUOupKI578o9Ww.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '420ms',
  'X-Azure-Ref',
  '0UVccYAAAAABihnHgOth8SpJmHf5DP98ZWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:37 GMT'
]);

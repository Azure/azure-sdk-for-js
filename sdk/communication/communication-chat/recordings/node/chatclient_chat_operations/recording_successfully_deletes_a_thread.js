let nock = require('nock');

module.exports.hash = "e51bac69f00a983af97a432032dbf341";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A1ce7006b95cc40b7863802c0b37784aa%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'rtTUyQzUKkmGks786Lg2lw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '293ms',
  'X-Azure-Ref',
  '03moQYAAAAAAJsc+GcMjuRLXKcLUzrYLIWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:49 GMT'
]);

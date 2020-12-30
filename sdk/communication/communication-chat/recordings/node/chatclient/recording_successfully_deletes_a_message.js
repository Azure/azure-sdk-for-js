let nock = require('nock');

module.exports.hash = "6f90ac401c7903dfc7bd077bcdb108f1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/messages/1609359943675')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'iJ2lSKmJ/Em2hf5dmDKFaA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '437ms',
  'X-Azure-Ref',
  '0SeLsXwAAAABPjEcyqubaTr6Z/4oZE9qbWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:45 GMT'
]);

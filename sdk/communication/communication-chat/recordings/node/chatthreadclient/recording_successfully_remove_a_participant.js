let nock = require('nock');

module.exports.hash = "17a09e59e6cb1c9e41aa571d96b978d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4%40thread.v2/participants/8%3Aacs%3A46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1aa3-1655-373a0d0032ea')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'SgG+ALjFt0WHJIyxITwFzA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '465ms',
  'X-Azure-Ref',
  '05GoQYAAAAAArziLqaR1USJ/eEpfRPtlAWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:55 GMT'
]);

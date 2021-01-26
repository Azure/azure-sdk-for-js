let nock = require('nock');

module.exports.hash = "68f698ad1cd68fb5d2031b79d0a1fd0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9","chatMessageId":"1611688672138","readOn":"2021-01-26T19:17:52Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'bNnb/GFF+kCmk4YcVyF+Bw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '338ms',
  'X-Azure-Ref',
  '05GoQYAAAAAD4z30nYVqoS68ZuK79C1MxWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:56 GMT'
]);

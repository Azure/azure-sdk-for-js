let nock = require('nock');

module.exports.hash = "9b24f9f0b408c48d472358651b13d15f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91","chatMessageId":"1609359943675","readOn":"2020-12-30T20:25:44Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'njIdrO/ykkmmSUga6AFSvg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '283ms',
  'X-Azure-Ref',
  '0S+LsXwAAAAD/35OoKKkKTrXaA2IxurSjWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:47 GMT'
]);

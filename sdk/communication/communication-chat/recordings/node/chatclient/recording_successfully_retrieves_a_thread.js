let nock = require('nock');

module.exports.hash = "53fcb8011d3ec2a23568f7adea0f9bcf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:9f956fe210414cc3a38295c399294c02@thread.v2","topic":"test topic","createdOn":"2020-12-30T20:25:41Z","createdBy":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'OYlfeHKCdk64aEvIHwpSmQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '269ms',
  'X-Azure-Ref',
  '0RuLsXwAAAACLgFIFxtv4SLmQsQauwuWbWVZSMzBFREdFMDQwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:42 GMT'
]);

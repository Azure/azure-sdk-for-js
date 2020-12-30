let nock = require('nock');

module.exports.hash = "fb5e8197d261ca82151def1448387286";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/messages/1609359943675')
  .query(true)
  .reply(200, {"id":"1609359943675","type":"text","priority":"normal","version":"1609359943675","content":{"message":"content"},"senderDisplayName":"","createdOn":"2020-12-30T20:25:43Z","senderId":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'dvLbf/vxp0mnAMXzb8DYbA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '256ms',
  'X-Azure-Ref',
  '0SeLsXwAAAAAV5qEhD7MrT7ZzM/3Q+sf+WVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:45 GMT'
]);

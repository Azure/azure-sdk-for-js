let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4%40thread.v2/messages/1611688672138')
  .query(true)
  .reply(200, {"id":"1611688672138","type":"text","sequenceId":"3","version":"1611688672138","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-01-26T19:17:52Z","senderId":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'fd8ni40mv0SyQs95U3ENLw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '714ms',
  'X-Azure-Ref',
  '04WoQYAAAAADyjklFryk7Q4yRQJFr2vGXWVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:53 GMT'
]);

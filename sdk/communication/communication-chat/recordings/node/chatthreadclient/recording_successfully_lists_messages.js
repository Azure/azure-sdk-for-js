let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Aacc5e14e9ced46fbbb8fd0ee8160d9e4%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1611688672138","type":"text","sequenceId":"3","version":"1611688672138","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-01-26T19:17:52Z","senderId":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9"},{"id":"1611688671466","type":"topicUpdated","sequenceId":"2","version":"1611688671466","content":{"topic":"test topic","initiator":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9"},"createdOn":"2021-01-26T19:17:51Z","senderId":"19:acc5e14e9ced46fbbb8fd0ee8160d9e4@thread.v2"},{"id":"1611688671434","type":"participantAdded","sequenceId":"1","version":"1611688671434","content":{"participants":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-1aa3-1655-373a0d0032ea","shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiator":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000007-e003-19f1-1655-373a0d0032e9"},"createdOn":"2021-01-26T19:17:51Z","senderId":"19:acc5e14e9ced46fbbb8fd0ee8160d9e4@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'SKHP/FSPaE+BHveHcUYJdg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '279ms',
  'X-Azure-Ref',
  '04moQYAAAAAAVTpoZlB6vTZ5EYtHp3AK/WVZSMzBFREdFMDQxOABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 26 Jan 2021 19:17:53 GMT'
]);

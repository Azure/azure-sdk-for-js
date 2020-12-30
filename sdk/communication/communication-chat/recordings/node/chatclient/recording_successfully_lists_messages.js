let nock = require('nock');

module.exports.hash = "d1b1ea54f4e60c7db92b5a7e81c4cc14";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1609359943675","type":"text","priority":"normal","version":"1609359943675","content":{"message":"content"},"senderDisplayName":"","createdOn":"2020-12-30T20:25:43Z","senderId":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91"},{"id":"1609359942175","type":"topicUpdated","priority":"normal","version":"1609359942175","content":{"topic":"test topic","initiator":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91"},"createdOn":"2020-12-30T20:25:42Z","senderId":"19:9f956fe210414cc3a38295c399294c02@thread.v2"},{"id":"1609359942128","type":"participantAdded","priority":"normal","version":"1609359942128","content":{"participants":[{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-8308-1db7-3a3a0d00437f","shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiator":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5535-81af-1655-373a0d004b91"},"createdOn":"2020-12-30T20:25:42Z","senderId":"19:9f956fe210414cc3a38295c399294c02@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'PVpnnN9xPkOwM4x7AevqPg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '269ms',
  'X-Azure-Ref',
  '0SeLsXwAAAAClps7soJaST6+kdCJpxNzmWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:45 GMT'
]);

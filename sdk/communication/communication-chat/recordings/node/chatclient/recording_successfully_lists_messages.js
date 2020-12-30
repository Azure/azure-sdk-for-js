let nock = require('nock');

module.exports.hash = "6671f74e8fe41f7a33a111a51ebb1d5d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A0771a8d8c00d4329b664c4237e41bf0c%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1609362866505","type":"text","priority":"normal","version":"1609362866505","content":{"message":"content"},"senderDisplayName":"","createdOn":"2020-12-30T21:14:26Z","senderId":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2"},{"id":"1609362864989","type":"topicUpdated","priority":"normal","version":"1609362864989","content":{"topic":"test topic","initiator":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2"},"createdOn":"2020-12-30T21:14:24Z","senderId":"19:0771a8d8c00d4329b664c4237e41bf0c@thread.v2"},{"id":"1609362864942","type":"participantAdded","priority":"normal","version":"1609362864942","content":{"participants":[{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1ca2-b0b7-3a3a0d0044b6","shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiator":"8:acs:188d4cea-0a9b-4840-8fdc-7a5c71fe9bd0_00000007-5562-1b5c-1db7-3a3a0d0043a2"},"createdOn":"2020-12-30T21:14:24Z","senderId":"19:0771a8d8c00d4329b664c4237e41bf0c@thread.v2"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'lvmt7TZfCUWLbvwfTfYDGA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '282ms',
  'X-Azure-Ref',
  '0s+3sXwAAAACcQ181T6isTbslNJFmy+ZXWVZSMzBFREdFMDQxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 21:14:27 GMT'
]);

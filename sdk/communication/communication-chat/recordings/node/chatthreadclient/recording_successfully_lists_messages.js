let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1612470096086","type":"text","sequenceId":"3","version":"1612470096086","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-02-04T20:21:36Z","senderId":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8"},{"id":"1612470095059","type":"topicUpdated","sequenceId":"2","version":"1612470095059","content":{"topic":"test topic","initiator":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8"},"createdOn":"2021-02-04T20:21:35Z"},{"id":"1612470094997","type":"participantAdded","sequenceId":"1","version":"1612470094997","content":{"participants":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ae51-b0b7-3a3a0d0000a9","shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiator":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8"},"createdOn":"2021-02-04T20:21:34Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '446OrzbYi0+rUyA+ZFTHTw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '298ms',
  'X-Azure-Ref',
  '0UVccYAAAAAD6alKYg35wRJijx89Nfvx/WVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:37 GMT'
]);

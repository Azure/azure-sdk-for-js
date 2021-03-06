let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1614993263622","type":"text","sequenceId":"4","version":"1614993263622","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-06T01:14:23Z","senderCommunicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}}},{"id":"1614993263297","type":"topicUpdated","sequenceId":"3","version":"1614993263297","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}}},"createdOn":"2021-03-06T01:14:23Z"},{"id":"1614993262917","type":"topicUpdated","sequenceId":"2","version":"1614993262917","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}}},"createdOn":"2021-03-06T01:14:22Z"},{"id":"1614993262857","type":"participantAdded","sequenceId":"1","version":"1614993262857","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2bfd-99c6-593a0d006b78","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2bfd-99c6-593a0d006b78"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}}},"createdOn":"2021-03-06T01:14:22Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'HDwKyhgf3EqTGmJNRHA/Wg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '113ms',
  'X-Azure-Ref',
  '0cNdCYAAAAAAFIFQmHjdvQqkmaRoP6/SfWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:24 GMT'
]);

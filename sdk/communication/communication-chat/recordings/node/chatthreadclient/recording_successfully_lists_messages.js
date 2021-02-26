let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1614374194140","type":"text","sequenceId":"4","version":"1614374194140","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-02-26T21:16:34Z","senderId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5"},{"id":"1614374193691","type":"topicUpdated","sequenceId":"3","version":"1614374193691","content":{"topic":"new topic","initiator":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5"},"createdOn":"2021-02-26T21:16:33Z"},{"id":"1614374193248","type":"topicUpdated","sequenceId":"2","version":"1614374193248","content":{"topic":"test topic","initiator":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5"},"createdOn":"2021-02-26T21:16:33Z"},{"id":"1614374193168","type":"participantAdded","sequenceId":"1","version":"1614374193168","content":{"participants":[{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e6b0-ceb1-a43a0d00e5c6","shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiator":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-8014-e55d-ceb1-a43a0d00e5c5"},"createdOn":"2021-02-26T21:16:33Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'JikA+ELVn0K3jMLkgaOj6A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '127ms',
  'X-Azure-Ref',
  '0MmU5YAAAAAAoPgoa1DA2TYiE4v3uWR5VWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:34 GMT'
]);

let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1615234854931","type":"text","sequenceId":"4","version":"1615234854931","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-08T20:20:54Z","senderCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"}}},{"id":"1615234854366","type":"topicUpdated","sequenceId":"3","version":"1615234854366","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"}}},"createdOn":"2021-03-08T20:20:54Z"},{"id":"1615234853676","type":"topicUpdated","sequenceId":"2","version":"1615234853676","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"}}},"createdOn":"2021-03-08T20:20:53Z"},{"id":"1615234853581","type":"participantAdded","sequenceId":"1","version":"1615234853581","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-8af1-b5bb-a43a0d002190","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-8af1-b5bb-a43a0d002190"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"}}},"createdOn":"2021-03-08T20:20:53Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'xQCYUSnvFE++/pqwTOTcfA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '122ms',
  'X-Azure-Ref',
  '0KIdGYAAAAACk14aq+E/bSI92yMyXQ3Y0V1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:55 GMT'
]);

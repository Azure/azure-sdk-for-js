let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1615253258990","type":"text","sequenceId":"4","version":"1615253258990","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-09T01:27:38Z","senderCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}}},{"id":"1615253258480","type":"topicUpdated","sequenceId":"3","version":"1615253258480","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}}},"createdOn":"2021-03-09T01:27:38Z"},{"id":"1615253257799","type":"topicUpdated","sequenceId":"2","version":"1615253257799","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}}},"createdOn":"2021-03-09T01:27:37Z"},{"id":"1615253257739","type":"participantAdded","sequenceId":"1","version":"1615253257739","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5f01-63b2-a43a0d002ec6","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5f01-63b2-a43a0d002ec6"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}}},"createdOn":"2021-03-09T01:27:37Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '6hDM1C+uOEe1HRNFBLpFpQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '114ms',
  'X-Azure-Ref',
  '0C89GYAAAAADyjstCuuA+Qpwu3cggwouRV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:40 GMT'
]);

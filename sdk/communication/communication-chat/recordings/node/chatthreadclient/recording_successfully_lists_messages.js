let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1615252741058","type":"text","sequenceId":"4","version":"1615252741058","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-09T01:19:01Z","senderCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}}},{"id":"1615252740676","type":"topicUpdated","sequenceId":"3","version":"1615252740676","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}}},"createdOn":"2021-03-09T01:19:00Z"},{"id":"1615252740336","type":"topicUpdated","sequenceId":"2","version":"1615252740336","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}}},"createdOn":"2021-03-09T01:19:00Z"},{"id":"1615252740301","type":"participantAdded","sequenceId":"1","version":"1615252740301","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-79e2-7f07-113a0d002200","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-79e2-7f07-113a0d002200"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}}},"createdOn":"2021-03-09T01:19:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Brwyc2u4skeH6AKUHYhkvw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '122ms',
  'X-Azure-Ref',
  '0Bc1GYAAAAAAA/u1r+c6tTrdkCSJV3h1zV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:01 GMT'
]);

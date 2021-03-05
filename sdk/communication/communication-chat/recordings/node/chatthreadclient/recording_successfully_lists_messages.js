let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AgzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81%40thread.v2/messages')
  .query(true)
  .reply(200, {"value":[{"id":"1614981448987","type":"text","sequenceId":"4","version":"1614981448987","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-05T21:57:28Z","senderCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"}}},{"id":"1614981448591","type":"topicUpdated","sequenceId":"3","version":"1614981448591","content":{"topic":"new topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"}}},"createdOn":"2021-03-05T21:57:28Z"},{"id":"1614981448251","type":"topicUpdated","sequenceId":"2","version":"1614981448251","content":{"topic":"test topic","initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"}}},"createdOn":"2021-03-05T21:57:28Z"},{"id":"1614981448186","type":"participantAdded","sequenceId":"1","version":"1614981448186","content":{"participants":[{"communicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e37b-e3c7-593a0d00c4c5","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e37b-e3c7-593a0d00c4c5"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}],"initiatorCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"}}},"createdOn":"2021-03-05T21:57:28Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'kl57EpVNf0ySBNQeBLwSNw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '130ms',
  'X-Azure-Ref',
  '0SalCYAAAAAAiXSGrq6ZJSqP9ANT3ekLcV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:29 GMT'
]);

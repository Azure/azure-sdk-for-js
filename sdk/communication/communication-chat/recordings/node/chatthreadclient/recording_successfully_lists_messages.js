let nock = require('nock');

module.exports.hash = "cdaca9cba53e2ea55edb80336ba72818";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/messages')
  .query(true)
  .reply(200, { "value": [{ "id": "1614300005782", "type": "text", "sequenceId": "4", "version": "1614300005782", "content": { "message": "content" }, "senderDisplayName": "", "createdOn": "2021-02-26T00:40:05Z", "senderCommunicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" } } }, { "id": "1614300005340", "type": "topicUpdated", "sequenceId": "3", "version": "1614300005340", "content": { "topic": "new topic", "initiatorCommunicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" } } }, "createdOn": "2021-02-26T00:40:05Z" }, { "id": "1614300004783", "type": "topicUpdated", "sequenceId": "2", "version": "1614300004783", "content": { "topic": "test topic", "initiatorCommunicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" } } }, "createdOn": "2021-02-26T00:40:04Z" }, { "id": "1614300004688", "type": "participantAdded", "sequenceId": "1", "version": "1614300004688", "content": { "participants": [{ "communicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" } }, "shareHistoryTime": "1970-01-01T00:00:00Z" }, { "communicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e23f-28c5-593a0d00f775", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e23f-28c5-593a0d00f775" } }, "shareHistoryTime": "1970-01-01T00:00:00Z" }], "initiatorCommunicationIdentifier": { "rawId": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774", "communicationUser": { "id": "8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774" } } }, "createdOn": "2021-02-26T00:40:04Z" }] }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'MS-CV',
    'Sd8QEJR0rkq9BNE1tHJkdg.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
    'X-Processing-Time',
    '149ms',
    'X-Azure-Ref',
    '0ZkM4YAAAAACEtJUEewySSI2RFo0LGnnvV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
    'Date',
    'Fri, 26 Feb 2021 00:40:05 GMT'
  ]);

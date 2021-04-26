let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1%40thread.v2/messages/1616527059857')
  .query(true)
  .reply(200, {"id":"1616527059857","type":"text","sequenceId":"4","version":"1616527059857","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-23T19:17:39Z","senderCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-083f-0e04-343a0d0064e0","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-083f-0e04-343a0d0064e0"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'w4kbG1Vuv0ajtt5uylDubg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '104ms',
  'X-Azure-Ref',
  '01D5aYAAAAAB/j+Zo8BPSSKeDcaCB1D7lV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:39 GMT'
]);

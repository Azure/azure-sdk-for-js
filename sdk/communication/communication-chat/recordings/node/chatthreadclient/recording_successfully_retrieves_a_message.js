let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338%40thread.v2/messages/1615252741058')
  .query(true)
  .reply(200, {"id":"1615252741058","type":"text","sequenceId":"4","version":"1615252741058","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-09T01:19:01Z","senderCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'kPaQcBYN4UOsazqf/nxxjw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '93ms',
  'X-Azure-Ref',
  '0Bc1GYAAAAAAx2KwjopWBQosdSdaI76SGV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:01 GMT'
]);

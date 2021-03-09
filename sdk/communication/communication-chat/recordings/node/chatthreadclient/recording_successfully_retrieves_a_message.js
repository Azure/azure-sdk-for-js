let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2/messages/1615253258990')
  .query(true)
  .reply(200, {"id":"1615253258990","type":"text","sequenceId":"4","version":"1615253258990","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-09T01:27:38Z","senderCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'cE+oTHMk4Eyfnoem1no5Yw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '107ms',
  'X-Azure-Ref',
  '0C89GYAAAAABB3Imv3pBnQY+B/AqKHvlmV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:39 GMT'
]);

let nock = require('nock');

module.exports.hash = "ece92519958e051517109e9a4846c92f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:539d1d3fbe9f4cf3a352a34888944794@thread.v2","topic":"test topic","createdOn":"2021-03-08T20:20:53Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'hsNzhVSPOU2r1Xhxy+qMow.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '99ms',
  'X-Azure-Ref',
  '0JYdGYAAAAACstfRDzIv8RZf7KKa51f95V1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:53 GMT'
]);

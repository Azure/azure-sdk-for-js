let nock = require('nock');

module.exports.hash = "3d3dc8054a3ca3d6a9beb2d230dde270";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'k5Fj/dGIYUeAeJJ6gVhJDw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '282ms',
  'X-Azure-Ref',
  '0ZUM4YAAAAACZe3MMfwYcQZRPbA7ayOavV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 26 Feb 2021 00:40:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:7190b8f01425417281a9998f4e6f8899@thread.v2","topic":"new topic","createdOn":"2021-02-26T00:40:04Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-7ba8-e0e7-28c5-593a0d00f774"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'AHQFDwCiyEm9bvaXH8VwCQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '118ms',
  'X-Azure-Ref',
  '0ZUM4YAAAAABTM0ziCEJ+Qo7/ssPX1H2uV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 26 Feb 2021 00:40:04 GMT'
]);

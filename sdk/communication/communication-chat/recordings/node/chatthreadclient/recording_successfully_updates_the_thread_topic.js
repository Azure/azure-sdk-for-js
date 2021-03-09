let nock = require('nock');

module.exports.hash = "b2e3c085aa73b0d20ac7b91f39172d2b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'AnfK6uJLGE6oLh8u5y+mew.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '165ms',
  'X-Azure-Ref',
  '0BM1GYAAAAACtudgEZSXoQZYbgxvDbUvVV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:7ad51f55bb564644b7b38aa4bd94e338@thread.v2","topic":"new topic","createdOn":"2021-03-09T01:19:00Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'm/wRAdaqMEq/F9US4K8Vfw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '94ms',
  'X-Azure-Ref',
  '0BM1GYAAAAAAR9PCNeQtuTZFGSLPiO9wYV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:00 GMT'
]);

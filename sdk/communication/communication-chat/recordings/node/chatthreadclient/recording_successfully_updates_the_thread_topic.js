let nock = require('nock');

module.exports.hash = "b2e3c085aa73b0d20ac7b91f39172d2b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3A9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'cESGzU7POkS36awR17cFNA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '256ms',
  'X-Azure-Ref',
  '00z5aYAAAAADSs3tiWrgESr+TVNcGBjEsV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:9cXNBEh5NlRdVyRs5tIn9ZnKCVgwfFsmRRbW6Mn-JNM1@thread.v2","topic":"new topic","createdOn":"2021-03-23T19:17:38Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-083f-0e04-343a0d0064e0","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0067-083f-0e04-343a0d0064e0"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '8ogQ4frXjUaq8VjJosmDfQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '115ms',
  'X-Azure-Ref',
  '00z5aYAAAAAB8C1uGznU6T4apY8Zi/WQrV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:38 GMT'
]);

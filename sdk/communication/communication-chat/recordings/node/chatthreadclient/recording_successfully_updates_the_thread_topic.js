let nock = require('nock');

module.exports.hash = "b2e3c085aa73b0d20ac7b91f39172d2b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'E0b4ccnWuEC0K40fTNL83Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '208ms',
  'X-Azure-Ref',
  '0Cs9GYAAAAADfnuv8PvATSoK9MnxlmAuLV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:95b53ec9905344ae89865d3a90726fb0@thread.v2","topic":"new topic","createdOn":"2021-03-09T01:27:37Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-5cc4-54b7-a43a0d002bd4"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '8Ux9ZNmyDkOm2dC+uQS94w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '92ms',
  'X-Azure-Ref',
  '0Cs9GYAAAAAAs8SuMpu9OQI1dqvVmeEoDV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:38 GMT'
]);

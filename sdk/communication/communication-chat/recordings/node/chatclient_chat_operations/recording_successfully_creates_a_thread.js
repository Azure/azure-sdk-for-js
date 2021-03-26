let nock = require('nock');

module.exports.hash = "c58a8bd2d6a25564b38d6c2e3574d185";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0066-fea3-0e04-343a0d0064dd"},"accessToken":{"token":"token","expiresOn":"2021-03-24T19:17:34.7902353+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'S5iPUIZFQUuL3mmf+h2VWw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '79680d63-9189-4062-b399-5709b1aa4198',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '288ms',
  'X-Azure-Ref',
  '0zz5aYAAAAAATXRPza+T4RqMhcN3NeayqV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0066-fff0-0e04-343a0d0064de"},"accessToken":{"token":"token","expiresOn":"2021-03-24T19:17:35.1166254+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'krquOumk00OU5b/k7D/TeQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '817574f4-a8ca-45a0-92f3-e153d30d21a8',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '271ms',
  'X-Azure-Ref',
  '0zz5aYAAAAACxoZe2OX4kSabcuRxnF2yTV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0066-fea3-0e04-343a0d0064dd"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0066-fff0-0e04-343a0d0064de"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:q3wKFPlzMawkNc6oMnE775ANXd463AmgdzUQmk4RnXA1@thread.v2","topic":"test topic","createdOn":"2021-03-23T19:17:36Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0066-fea3-0e04-343a0d0064dd","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000009-0066-fea3-0e04-343a0d0064dd"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3Aq3wKFPlzMawkNc6oMnE775ANXd463AmgdzUQmk4RnXA1@thread.v2',
  'MS-CV',
  'UpEoZGGjRkKdG3Ok/mXoDA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '1309ms',
  'X-Azure-Ref',
  '00D5aYAAAAABff6nFAE2lRLIN3uZ756FLV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:36 GMT'
]);

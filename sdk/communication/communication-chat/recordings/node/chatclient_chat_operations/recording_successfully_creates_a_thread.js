let nock = require('nock');

module.exports.hash = "60c461ca49c65b9ceccb7989d6da9037";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-55ad-54b7-a43a0d002bd3"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:27:33.6971558+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '1bYS5H65R0qziNehW71skA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '92b1e7e0-23a9-4260-b1ff-5f9a3c6befb2',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '231ms',
  'X-Azure-Ref',
  '0Bs9GYAAAAACx/qKdAtcISoZr8f88zfnYV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-56dc-63b2-a43a0d002ec4"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:27:34.0176722+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ES0g8GBUNEm/gmmtHHCV3g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '667eaa24-2522-4673-b688-9c6fa96b03ee',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '246ms',
  'X-Azure-Ref',
  '0Bs9GYAAAAAAcE0HT4w9TRKnC/dJbcTP/V1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-55ad-54b7-a43a0d002bd3"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-56dc-63b2-a43a0d002ec4"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:45c2a818b4fe40cb8e8631592a49cad0@thread.v2","topic":"test topic","createdOn":"2021-03-09T01:27:35Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-55ad-54b7-a43a0d002bd3","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b47a-55ad-54b7-a43a0d002bd3"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A45c2a818b4fe40cb8e8631592a49cad0@thread.v2',
  'MS-CV',
  'TahKQbG8BEunvC8ISx5thw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '488ms',
  'X-Azure-Ref',
  '0B89GYAAAAAB7XVv0frklQZitHoxt9axZV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:35 GMT'
]);

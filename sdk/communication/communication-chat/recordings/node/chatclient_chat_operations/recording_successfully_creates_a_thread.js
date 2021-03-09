let nock = require('nock');

module.exports.hash = "60c461ca49c65b9ceccb7989d6da9037";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-6bfc-7f07-113a0d0021f8"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:18:55.4602011+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'HFXHKy7uYEe2OtMn95YCxA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '99438bbb-86ba-4672-a4fe-1f9e0dc37866',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '601ms',
  'X-Azure-Ref',
  '0/8xGYAAAAACJj7/BeyJHT4PbF1vq232uV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:18:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-6eeb-7f07-113a0d0021fb"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:18:56.2110693+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'jzbLTDya5Eab1vzD8l3ikQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '7fd56e4c-5365-405c-b223-d113b0eaadc7',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '599ms',
  'X-Azure-Ref',
  '0AM1GYAAAAABoHMpjl1PiQaPTbYRfJITfV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:18:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-6bfc-7f07-113a0d0021f8"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-6eeb-7f07-113a0d0021fb"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:51bab43452ce41ecbf7591071812b514@thread.v2","topic":"test topic","createdOn":"2021-03-09T01:18:57Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-6bfc-7f07-113a0d0021f8","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-6bfc-7f07-113a0d0021f8"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A51bab43452ce41ecbf7591071812b514@thread.v2',
  'MS-CV',
  '32sP0hnv/0Cn/SQMLz5VMg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '627ms',
  'X-Azure-Ref',
  '0Ac1GYAAAAACACWK/Y3mpRpyLTbQ0kfM+V1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:18:57 GMT'
]);

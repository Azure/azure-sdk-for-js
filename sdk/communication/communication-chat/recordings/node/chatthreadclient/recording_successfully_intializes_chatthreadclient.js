let nock = require('nock');

module.exports.hash = "aeae07c7c5d15582403b68ecbf7d39d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:18:58.3202006+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'pVPofGVkk0OZKxDSv8e3pw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'd0415335-680d-407d-aed5-5ff7485297f4',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '581ms',
  'X-Azure-Ref',
  '0As1GYAAAAADW2l1MVXH+QbpIvZegTqC5V1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:18:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-79e2-7f07-113a0d002200"},"accessToken":{"token":"token","expiresOn":"2021-03-10T01:18:59.0100022+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'q9D0VK32UEWCrUgSMRDfTw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '1704704d-69cd-4b4c-84f8-fec4cdddc69d',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '591ms',
  'X-Azure-Ref',
  '0A81GYAAAAABUkATSh4h0R5/7vYTSSxH0V1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:18:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-79e2-7f07-113a0d002200"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:7ad51f55bb564644b7b38aa4bd94e338@thread.v2","topic":"test topic","createdOn":"2021-03-09T01:19:00Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b472-773c-7f07-113a0d0021fe"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338@thread.v2',
  'MS-CV',
  'x0j5OPQZM0y8VFjRu4drUQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '439ms',
  'X-Azure-Ref',
  '0BM1GYAAAAAAdUTHJiRcYQZ3PKIQ5KCUoV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:00 GMT'
]);

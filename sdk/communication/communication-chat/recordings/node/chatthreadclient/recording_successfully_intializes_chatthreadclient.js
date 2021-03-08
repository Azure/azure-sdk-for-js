let nock = require('nock');

module.exports.hash = "aeae07c7c5d15582403b68ecbf7d39d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"},"accessToken":{"token":"token","expiresOn":"2021-03-09T20:20:51.4018827+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'j5GPDmgKPEuiYFcvnNYtKA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '539bd989-f9d8-40b9-bb8e-8801b53ae5bf',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '494ms',
  'X-Azure-Ref',
  '0I4dGYAAAAAC7U+q3PA3hQZoYB+JG3dnUV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-8af1-b5bb-a43a0d002190"},"accessToken":{"token":"token","expiresOn":"2021-03-09T20:20:52.0057121+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'gAkYcu+Jt0uyujDgJ7kMbg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'b98fd93b-cb57-4894-94a6-28b4c19989d5',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '517ms',
  'X-Azure-Ref',
  '0JIdGYAAAAAAl+xo8b94nT4R9lCBiE3oxV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-8af1-b5bb-a43a0d002190"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:539d1d3fbe9f4cf3a352a34888944794@thread.v2","topic":"test topic","createdOn":"2021-03-08T20:20:53Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-b361-88a5-b5bb-a43a0d00218f"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794@thread.v2',
  'MS-CV',
  'S8wNLIiisUGPyl5Z4AOMvQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '838ms',
  'X-Azure-Ref',
  '0JYdGYAAAAAC9zXWh1nkkQZ15ls7jgHlsV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:53 GMT'
]);

let nock = require('nock');

module.exports.hash = "aeae07c7c5d15582403b68ecbf7d39d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"},"accessToken":{"token":"token","expiresOn":"2021-03-06T21:57:26.4882402+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'X6+LgJwxGkq38LYHiLcfKw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'b5444735-89bf-47b9-aa6e-9a2269980fe8',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '33ms',
  'X-Azure-Ref',
  '0R6lCYAAAAAAXqp1AGbamRI809w+kc33FV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e37b-e3c7-593a0d00c4c5"},"accessToken":{"token":"token","expiresOn":"2021-03-06T21:57:26.8271238+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ytZJtik+wkyukeflHLAJ9w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'bc433d48-85fd-494b-98a7-5cc19a2dd728',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '290ms',
  'X-Azure-Ref',
  '0R6lCYAAAAAA89yN8+3hzRZ2e7ZEu2pwMV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e37b-e3c7-593a0d00c4c5"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:gzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81@thread.v2","topic":"test topic","createdOn":"2021-03-05T21:57:27Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-e32b-e3c7-593a0d00c4c4"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3AgzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81@thread.v2',
  'MS-CV',
  'pDlPuYwKiEKxIZqi7B6Klw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '550ms',
  'X-Azure-Ref',
  '0R6lCYAAAAADgP9FoNhYxT7SL6gUqLgCsV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:27 GMT'
]);

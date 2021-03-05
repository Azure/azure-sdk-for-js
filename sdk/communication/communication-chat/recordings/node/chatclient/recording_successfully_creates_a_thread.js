let nock = require('nock');

module.exports.hash = "7773fe1dea889ef2b3ef6767a631e1c4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-dbad-e3c7-593a0d00c4bf"},"accessToken":{"token":"token","expiresOn":"2021-03-06T21:57:24.8093227+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'WFL2zssxb0KYubJvzqtz0g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '0ef6e374-8743-419a-8792-ea08c04ef54e',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '271ms',
  'X-Azure-Ref',
  '0RalCYAAAAAA8VKE2SbTNT7FSjleIbVxKV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-dcf3-e3c7-593a0d00c4c0"},"accessToken":{"token":"token","expiresOn":"2021-03-06T21:57:24.894872+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'c6pIsBFZlUyt1PKixqnazg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '184e4481-e8f6-4079-9608-18cb8837e178',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '29ms',
  'X-Azure-Ref',
  '0RalCYAAAAAB4h+miGtocRJP3I59f2YOWV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-dbad-e3c7-593a0d00c4bf"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-dcf3-e3c7-593a0d00c4c0"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:-uGMBR3Jd8mEbYt9auigWiLSJvDfDaMIaHHX8PKxPyg1@thread.v2","topic":"test topic","createdOn":"2021-03-05T21:57:26Z","createdByCommunicationIdentifier":{"rawId":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-dbad-e3c7-593a0d00c4bf","communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-dbad-e3c7-593a0d00c4bf"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://azurecommunicationservices.communication.azure.com/chat/threads/19%3A-uGMBR3Jd8mEbYt9auigWiLSJvDfDaMIaHHX8PKxPyg1@thread.v2',
  'MS-CV',
  'bvGDjfoVOk+P6t7PJ15ebw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '688ms',
  'X-Azure-Ref',
  '0RalCYAAAAADZyZBepi6/SLp1QGDfu7+/V1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:26 GMT'
]);

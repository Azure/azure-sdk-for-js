let nock = require('nock');

module.exports.hash = "1a1f067ce4b17032ea2a8259d4e72e62";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-ed6c-e3c7-593a0d00c4ca"},"accessToken":{"token":"token","expiresOn":"2021-03-06T21:57:29.3597286+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'hzFYyeOp+ESTes5SCLbu+A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '61942086-ff0d-4bc7-865a-b1597e5354d3',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '278ms',
  'X-Azure-Ref',
  '0SqlCYAAAAACNVGtjMqrQQ5a3wDbhBT1BV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AgzRHvaQS6tcmZwRdVfMUBWLPK34ocUiHaR3qlZOEwu81%40thread.v2/participants/:add', {"participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fac4607d-d2d0-40e5-84df-6f32ebd1251a_00000008-a446-ed6c-e3c7-593a0d00c4ca"}}}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'UrwSWNI3BECwW+QXQ/LOhA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '272ms',
  'X-Azure-Ref',
  '0SqlCYAAAAACeKyNYafwUQ7ytDKwq7+tEV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:30 GMT'
]);

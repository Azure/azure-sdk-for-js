let nock = require('nock');

module.exports.hash = "1a1f067ce4b17032ea2a8259d4e72e62";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-352e-99c6-593a0d006b79"},"accessToken":{"token":"token","expiresOn":"2021-03-07T01:14:24.2061373+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'dZzZDjlthUi5xeIldwUgCA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '4de9846c-7fe0-4ab2-b98b-12db1ccf6996',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '277ms',
  'X-Azure-Ref',
  '0cNdCYAAAAAB06hID27hYQY/a/j2UT/4sWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2/participants/:add', {"participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-352e-99c6-593a0d006b79"}}}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '+tSdaa1su0KUIk+nKNasjg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '408ms',
  'X-Azure-Ref',
  '0cddCYAAAAAC8BwGKlOkHRLxeWTL3aBgrWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:25 GMT'
]);

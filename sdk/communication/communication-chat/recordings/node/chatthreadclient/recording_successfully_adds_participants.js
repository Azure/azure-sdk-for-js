let nock = require('nock');

module.exports.hash = "56896101f9b0e9c5b2aba99d4beff406";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-979a-99c6-593a0d00125f"},"accessToken":{"token":"token","expiresOn":"2021-08-21T19:07:25.4892825+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'q2lnp5SMhkOtFiwlRM6DZw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '622342c0-4363-4349-985d-610edeb117c2',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '39ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bf0fYQAAAAAH7aUS76R+RYXGO1y61K2oUERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AG9Ahp1Z8TtiJdI42d6ndj1QXAXeWZGeqjdxqjgPOdR81%40thread.v2/participants/:add', {"participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:fa5c4fc3-a269-43e2-9eb6-0ca17b388993_0000000c-04d7-979a-99c6-593a0d00125f"}}}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'pWPeWPAKzEuU5yjxmljGCw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '219ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bf0fYQAAAABDBKRVrkSoTr82hUQBRVkrUERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:25 GMT'
]);

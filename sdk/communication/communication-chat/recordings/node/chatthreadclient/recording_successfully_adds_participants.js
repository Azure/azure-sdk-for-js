let nock = require('nock');

module.exports.hash = "56896101f9b0e9c5b2aba99d4beff406";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-d8e3-edbe-a43a0d00fdd2"},"accessToken":{"token":"token","expiresOn":"2021-06-17T23:06:11.7554232+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '6FMHySudHkqFm+iNrTeaOw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'bae95937-57a4-4188-b07f-f59047e6af76',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '197ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05IPKYAAAAAAR6DIuHTr6Sr3ZBlSrFexTWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AXTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1%40thread.v2/participants/:add', {"participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-d8e3-edbe-a43a0d00fdd2"}}}]})
  .query(true)
  .reply(201, {}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'veyhaCSV0Eu1yZEwOqL3fg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '522ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05IPKYAAAAAB5Fetq58j2SqFogDulyvwpWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:12 GMT'
]);

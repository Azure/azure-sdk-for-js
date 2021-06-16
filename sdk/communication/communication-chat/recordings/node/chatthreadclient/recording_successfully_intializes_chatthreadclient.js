let nock = require('nock');

module.exports.hash = "628c4be719245416c8ba7170a19f6873";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"},"accessToken":{"token":"token","expiresOn":"2021-06-17T23:06:07.6000143+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'UkvbQnBYy0WMGPIAN3ncgQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '39c9ef53-df1c-4e7d-871c-81a6a0535af9',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '254ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04IPKYAAAAADbjccki79KRKPGx334Kdi/WVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c9c5-edbe-a43a0d00fdd1"},"accessToken":{"token":"token","expiresOn":"2021-06-17T23:06:07.8868078+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'JaNm/zZ4xUKtJ0IDZS0tIA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '2c45479c-540c-4ce9-ab44-fbada5a1820b',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '200ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04IPKYAAAAACOE/bfGSqTSocPI4NUfgDPWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c9c5-edbe-a43a0d00fdd1"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:XTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1@thread.v2","topic":"test topic","createdOn":"2021-06-16T23:06:09Z","createdByCommunicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://smstestapp.communication.azure.com/chat/threads/19%3AXTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1@thread.v2',
  'MS-CV',
  'Adq4LnACPUuuRkfc7N10Ig.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '481ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04YPKYAAAAABYutvYjNUbSKBHuvPSH8ueWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:08 GMT'
]);

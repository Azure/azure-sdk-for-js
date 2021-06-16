let nock = require('nock');

module.exports.hash = "532588d7bc35f02e085fe3d50b331b6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-bf8c-edbe-a43a0d00fdce"},"accessToken":{"token":"token","expiresOn":"2021-06-17T23:06:05.3421507+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'g6k88aIXREat/C8fOrT2cQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'd58f5aa6-dffa-4a99-906b-09cbcaeabc66',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '293ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03YPKYAAAAAAWkfPx90SFRaTTowz9tXuuWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c125-edbe-a43a0d00fdcf"},"accessToken":{"token":"token","expiresOn":"2021-06-17T23:06:05.6735903+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '6/2XvtQwSEWGXlEC22Au+g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'be005b51-64a0-4cb9-8170-b376c65e922a',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1',
  'X-Processing-Time',
  '196ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03oPKYAAAAABaXmxPCY4ZQYsWwOW+5lzoWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"communicationIdentifier":{"communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-bf8c-edbe-a43a0d00fdce"}}},{"communicationIdentifier":{"communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c125-edbe-a43a0d00fdcf"}}}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:NNwKCiOnGlKzJ7nuaxX1DgoxzeH3_T3twQGlLsMKVIY1@thread.v2","topic":"test topic","createdOn":"2021-06-16T23:06:07Z","createdByCommunicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-bf8c-edbe-a43a0d00fdce","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-bf8c-edbe-a43a0d00fdce"}}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://smstestapp.communication.azure.com/chat/threads/19%3ANNwKCiOnGlKzJ7nuaxX1DgoxzeH3_T3twQGlLsMKVIY1@thread.v2',
  'MS-CV',
  '9feuGaNDOEi2wgW0WtOvaQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '701ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03oPKYAAAAAA4y8/UJuljQrmWr9QFC6GOWVZSMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:07 GMT'
]);

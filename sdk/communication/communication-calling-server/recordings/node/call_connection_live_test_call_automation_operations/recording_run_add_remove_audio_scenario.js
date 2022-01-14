let nock = require('nock');

module.exports.hash = "6ea43d719ea38495cf9850779eacd2d5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7be-df5c-ac00-343a0d00f860"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'unEQkDGiwkK1784u0EUJJA.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '4f4b9180-bdc5-45f8-b5f3-5ea3afd6520b',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '30ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xj7hYQAAAACZCeeW+lcDS7ng1DevgADgQk9NMDFFREdFMDUxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:13:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7be-df5c-ac00-343a0d00f860"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"b21f1300-d5af-428b-897c-2109dbeff495"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6398583c-6c06-437c-811d-959a72feba86',
  'X-Microsoft-Skype-Chain-ID',
  'f4146610-25f0-4b11-9dab-a4f29b2cd47d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xz7hYQAAAABazyRFE1VjQaJeEFkflI9QQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:13:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b21f1300-d5af-428b-897c-2109dbeff495/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}})
  .query(true)
  .reply(202, {"operationId":"cc0c4b8e-40d8-435b-a9f2-65dd2cd69e50","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'f4146610-25f0-4b11-9dab-a4f29b2cd47d',
  'x-ms-client-request-id',
  'c312e0f8-0016-406f-9b41-f99a3daab27b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00z7hYQAAAACaWpW4xIFdQISZNW91D6PrQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:13:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b21f1300-d5af-428b-897c-2109dbeff495/participants:removeFromDefaultAudioGroup', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f4146610-25f0-4b11-9dab-a4f29b2cd47d',
  'x-ms-client-request-id',
  'b230763b-e5ca-4dfe-8894-0ab8d0640373',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04D7hYQAAAABXcxpXKNZuT5F7/PsVAHsNQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:14:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b21f1300-d5af-428b-897c-2109dbeff495/participants:addToDefaultAudioGroup', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f4146610-25f0-4b11-9dab-a4f29b2cd47d',
  'x-ms-client-request-id',
  'b1c950ae-89fd-482c-82f6-61b0ca2f2db6',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05D7hYQAAAABH1OKyHbgSTJbtYvKZZIAHQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:14:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b21f1300-d5af-428b-897c-2109dbeff495/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f4146610-25f0-4b11-9dab-a4f29b2cd47d',
  'x-ms-client-request-id',
  '610894dd-198a-4c47-bfc5-b05a7040cbb0',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '06j7hYQAAAACRqBTpfj1cRJlUvsaCW4ULQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:14:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b21f1300-d5af-428b-897c-2109dbeff495/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f4146610-25f0-4b11-9dab-a4f29b2cd47d',
  'x-ms-client-request-id',
  '59213577-11e5-4f6a-ba51-6b916546125d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '07T7hYQAAAABycNN7BvrkTaAVxYYUt+XcQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:14:22 GMT',
  'Content-Length',
  '0'
]);

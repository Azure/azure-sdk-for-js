let nock = require('nock');

module.exports.hash = "03e7e4a82d7f4b3ea5c8b28af4168071";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7c7-5512-ac00-343a0d00f8b4"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'XGgRrydG00SdPiqJt5/L2A.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '0f3bd4b0-76b8-4671-b88a-ebaeb62ee843',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '54ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '08UDhYQAAAAAYy+/ak5M4TrunpN6Iu8YHQk9NMDFFREdFMDUxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:22:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7c7-5512-ac00-343a0d00f8b4"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"9e201300-cf30-49c1-ba69-2f11d71d9167"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '382d0dbf-4020-40da-b30f-4a24aad08520',
  'X-Microsoft-Skype-Chain-ID',
  'd3825abd-cdf4-485d-b71b-61a4d4c6bfba',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '08kDhYQAAAABRiC6YB6nmSZUMGu805ii9Qk9NMDFFREdFMDUxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:22:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/9e201300-cf30-49c1-ba69-2f11d71d9167/:transferToParticipant', {"targetParticipant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}})
  .query(true)
  .reply(202, {"operationId":"9e201300-cf30-49c1-ba69-2f11d71d9167","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'd3825abd-cdf4-485d-b71b-61a4d4c6bfba',
  'x-ms-client-request-id',
  '688c5dc6-e06b-4cb3-b7a6-6bd77fa6c90f',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+0DhYQAAAAD3umh4xuDKR41hCzmspywgQk9NMDFFREdFMDUxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 09:23:08 GMT'
]);

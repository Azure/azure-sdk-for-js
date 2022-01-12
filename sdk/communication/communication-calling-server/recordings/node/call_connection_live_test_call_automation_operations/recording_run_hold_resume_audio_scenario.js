let nock = require('nock');

module.exports.hash = "4481ecc6ce59d998f807619a27d0379f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-ee15-eb3e-0e04-343a0d005f03"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'CIFjQwlguEq3Pjh/y5ypNA.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'd3bca5f2-198e-4066-b2d8-31a1de46bed8',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '42ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0s8XeYQAAAACmElB/Dhi3SYAmUBocbKYcREVMMDFFREdFMDUxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 12 Jan 2022 12:12:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-ee15-eb3e-0e04-343a0d005f03"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"631f1300-b5ac-4d53-8b96-a43476fd20c9"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '53eba4ef-1677-4f66-9f71-04b658032238',
  'X-Microsoft-Skype-Chain-ID',
  '69eb6bb9-70ab-4b8b-b62d-97c18746131b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tMXeYQAAAADKi0Yl43QKQaRbIfYorFWFREVMMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 12 Jan 2022 12:12:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/631f1300-b5ac-4d53-8b96-a43476fd20c9/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-eda0-1a99-1252-573a0d00888f"}}})
  .query(true)
  .reply(202, {"operationId":"9c67fddd-5ba2-4471-85d8-d7e40488aa20","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '69eb6bb9-70ab-4b8b-b62d-97c18746131b',
  'x-ms-client-request-id',
  '527b60e2-cca9-4bd9-b8bf-93258705fa94',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0y8XeYQAAAACzDatxtjzjQa1ckuXQVwApREVMMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 12 Jan 2022 12:12:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/631f1300-b5ac-4d53-8b96-a43476fd20c9/participants:removeFromDefaultAudioGroup', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-eda0-1a99-1252-573a0d00888f"}}})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '69eb6bb9-70ab-4b8b-b62d-97c18746131b',
  'x-ms-client-request-id',
  'b4dece09-9836-476a-b143-703c0fb720b9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01MXeYQAAAAB6BRruIXFFQb0nSWblSpphREVMMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 12 Jan 2022 12:13:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/631f1300-b5ac-4d53-8b96-a43476fd20c9/participants:addToDefaultAudioGroup', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-eda0-1a99-1252-573a0d00888f"}}})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '69eb6bb9-70ab-4b8b-b62d-97c18746131b',
  'x-ms-client-request-id',
  'a127f6af-907f-4c7e-912a-2531e2a4e51e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01MXeYQAAAABgWyheParVSoTvAE4QczRSREVMMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 12 Jan 2022 12:13:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/631f1300-b5ac-4d53-8b96-a43476fd20c9/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-eda0-1a99-1252-573a0d00888f"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '69eb6bb9-70ab-4b8b-b62d-97c18746131b',
  'x-ms-client-request-id',
  '009c51e7-a561-4e4e-8347-5c88ac3d4b7d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02MXeYQAAAADkVdFWFAHiRIJ6g6mzs3E9REVMMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 12 Jan 2022 12:13:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/631f1300-b5ac-4d53-8b96-a43476fd20c9/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '69eb6bb9-70ab-4b8b-b62d-97c18746131b',
  'x-ms-client-request-id',
  'eee67bd4-ce80-474a-8f95-cf68e622ce1d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03MXeYQAAAADWMvbU5dMiR5ZCmwDrhtj4REVMMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 12 Jan 2022 12:13:15 GMT',
  'Content-Length',
  '0'
]);

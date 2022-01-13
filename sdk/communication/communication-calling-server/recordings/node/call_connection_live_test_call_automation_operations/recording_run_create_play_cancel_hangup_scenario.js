let nock = require('nock');

module.exports.hash = "a9ea152e0cac48341fd246cafe700081";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164207662320903326","operationContext":"operationContext164207662320904432"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f346-3946-4ff7-343a0d00b9f8"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'aINwa+XxF0qUdSGwfUW4oQ.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'f1ce39ae-025c-473d-abbf-172f82ca9a5f',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '24ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vxngYQAAAAAwDAv+LhFWRatTZoCpLni4REVMMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:23:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f346-3946-4ff7-343a0d00b9f8"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"b7201300-b094-4445-ac4e-799fbaf6e655"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '86478ad4-f67d-4a17-af4b-1a451c9230ce',
  'X-Microsoft-Skype-Chain-ID',
  '240fbad0-3ddb-4acd-86e7-d4b85f0dcfa3',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wBngYQAAAAACBo0sp/+VQK57MaGBEwvfREVMMDFFREdFMDYyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:23:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b7201300-b094-4445-ac4e-799fbaf6e655/:playAudio', {"audioFileUri":"https://acsfunctionappstorage.blob.core.windows.net/acs-audio-files/sample-message.wav","loop":true,"operationContext":"operationContext164207662320904432","audioFileId":"audioFileId164207662320903326"})
  .query(true)
  .reply(202, {"operationId":"76b95d78-7dd7-4b23-b553-288697648909","status":"running","operationContext":"operationContext164207662320904432"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '240fbad0-3ddb-4acd-86e7-d4b85f0dcfa3',
  'x-ms-client-request-id',
  '3803eae5-1cbb-452f-8d49-d68592e25c1f',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01RngYQAAAAAc1wtESXpNTa1cVm1rUsdqREVMMDFFREdFMDYyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:23:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b7201300-b094-4445-ac4e-799fbaf6e655/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"15c423e2-a127-4012-8272-e2973f90592c","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '240fbad0-3ddb-4acd-86e7-d4b85f0dcfa3',
  'x-ms-client-request-id',
  'f310006c-17b0-4890-b785-892a7baaacab',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02hngYQAAAADJVsJNsrl5TY480BqPWsqzREVMMDFFREdFMDYyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:23:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b7201300-b094-4445-ac4e-799fbaf6e655/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '240fbad0-3ddb-4acd-86e7-d4b85f0dcfa3',
  'x-ms-client-request-id',
  '83f152ae-8605-4777-a671-d7e5a63e08c4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03hngYQAAAABbu+DBr+6CRrCjqLLcJgakREVMMDFFREdFMDYyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:23:57 GMT',
  'Content-Length',
  '0'
]);

let nock = require('nock');

module.exports.hash = "ebb1f0092ae6735e915aaba1c15899f2";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164241255406207004","operationContext":"operationContext164241255406203154"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-074b-d061-e3c7-593a0d00b27f"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'kDO9JLRs70q5RUKiLaPrgw.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '20c95a1c-3a86-4424-ac0d-6d959726439c',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '30ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05TnlYQAAAABgRVUsQ/pLSapatfJlJ5DJQk9NMDFFREdFMDUwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 09:41:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-074b-d061-e3c7-593a0d00b27f"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"3d201300-17bd-46b0-a2fa-5ab1d0c422d7"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '48f42e59-5ff3-49f9-9bba-a18c137d6a40',
  'X-Microsoft-Skype-Chain-ID',
  '53867d82-34e9-49c0-9b15-add7018bdfc4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05znlYQAAAAA2W2eazkeMQYQGIKPw6B4SQk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 09:42:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3d201300-17bd-46b0-a2fa-5ab1d0c422d7/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-073e-7145-570c-113a0d00291f"}}})
  .query(true)
  .reply(202, {"operationId":"1ae9a894-4926-4491-ae37-480278e181aa","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '53867d82-34e9-49c0-9b15-add7018bdfc4',
  'x-ms-client-request-id',
  '0385403b-54ba-4387-948b-85db03cfc060',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09TnlYQAAAAAqL5IcHli3S6bhH2f/97eIQk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 09:42:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/callConnections/3d201300-17bd-46b0-a2fa-5ab1d0c422d7/participants')
  .query(true)
  .reply(200, [{"identifier":{"rawId":"4:+15551234567","phoneNumber":{"value":"+15551234567"}},"participantId":"8cf2f19a-520a-4ade-a7a3-ea7d3d08b99d","isMuted":false},{"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-073e-7145-570c-113a0d00291f","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-073e-7145-570c-113a0d00291f"}},"participantId":"a74ef426-8eeb-444a-895c-54f4e982ac0c","isMuted":false},{"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-074b-d061-e3c7-593a0d00b27f","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-074b-d061-e3c7-593a0d00b27f"}},"participantId":"93e5adb1-c281-4b43-a8dd-8d0809ec5d5c","isMuted":false}], [
  'Content-Length',
  '729',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '53867d82-34e9-49c0-9b15-add7018bdfc4',
  'x-ms-client-request-id',
  'f4c3a5fc-5867-4cdf-9b3f-a1b300f1340d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ATrlYQAAAACDzdqdfsQwQI4U9XNc7xJHQk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 09:42:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3d201300-17bd-46b0-a2fa-5ab1d0c422d7/participants:playAudio', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-073e-7145-570c-113a0d00291f"}},"audioFileUri":"https://acsfunctionappstorage.blob.core.windows.net/acs-audio-files/sample-message.wav","loop":true,"operationContext":"operationContext164241255406203154","audioFileId":"audioFileId164241255406207004"})
  .query(true)
  .reply(202, {"operationId":"3d201300-9127-42e6-ad97-5aa54f10bc7f","status":"running","operationContext":"operationContext164241255406203154"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '53867d82-34e9-49c0-9b15-add7018bdfc4',
  'x-ms-client-request-id',
  '21d66849-ce39-4a0f-a618-6fc327c06830',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BjrlYQAAAAArPu/rPmOZS53tbFiV339jQk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 09:42:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3d201300-17bd-46b0-a2fa-5ab1d0c422d7/participants:cancelMediaOperation', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-073e-7145-570c-113a0d00291f"}},"mediaOperationId":"3d201300-9127-42e6-ad97-5aa54f10bc7f"})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '53867d82-34e9-49c0-9b15-add7018bdfc4',
  'x-ms-client-request-id',
  'dde3608d-b38f-47d8-b7fc-d86ba0539d9c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DTrlYQAAAADWmXzAJiyKSLVYrducENuYQk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 09:42:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3d201300-17bd-46b0-a2fa-5ab1d0c422d7/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-073e-7145-570c-113a0d00291f"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '53867d82-34e9-49c0-9b15-add7018bdfc4',
  'x-ms-client-request-id',
  '21d5bc28-eed9-4ba3-a9ad-4f46186ce94e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0EjrlYQAAAABSPOeyfkxaTY5QqqKChGrVQk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 09:42:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3d201300-17bd-46b0-a2fa-5ab1d0c422d7/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '53867d82-34e9-49c0-9b15-add7018bdfc4',
  'x-ms-client-request-id',
  '65219f55-1afc-4b9d-b342-f723ae62aa34',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HjrlYQAAAAD/7Fh1SQjoTaXGdrKMl+O7Qk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 09:42:54 GMT',
  'Content-Length',
  '0'
]);

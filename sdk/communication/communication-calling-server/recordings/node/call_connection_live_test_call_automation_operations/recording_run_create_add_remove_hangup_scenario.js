let nock = require('nock');

module.exports.hash = "c1c9828aa99a169827a632dc0ac56ee8";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164207644186002897","operationContext":"operationContext164207644186000041"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f343-2838-4ff7-343a0d00b9b5"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'XhhT3aNzB0uxN+K8FTyijA.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '84053c87-419b-4142-ad94-775eddaa9044',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '65ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09hjgYQAAAADO1xdbFpN/QJwRhGEoQH6iREVMMDFFREdFMDYxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:20:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f343-2838-4ff7-343a0d00b9b5"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"b61f1300-0672-4d6a-a749-46b986815f69"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '3ae864ba-62b3-4a57-af5b-9a869b251805',
  'X-Microsoft-Skype-Chain-ID',
  '869e1e2e-080b-4adb-9326-e296f5e4c5e6',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09xjgYQAAAABG7Vo0pWHsR7DLH5nMyURXREVMMDFFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:20:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b61f1300-0672-4d6a-a749-46b986815f69/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}}})
  .query(true)
  .reply(202, {"operationId":"c626cdfd-86fc-4c56-b10a-c89e1dbbca24","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '869e1e2e-080b-4adb-9326-e296f5e4c5e6',
  'x-ms-client-request-id',
  'e05bdc98-2685-42d1-8f7b-c5c903a0ec40',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BxngYQAAAACi+TPIxWMpQ4saWS6W0y30REVMMDFFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:20:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/callConnections/b61f1300-0672-4d6a-a749-46b986815f69/participants')
  .query(true)
  .reply(200, [{"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f343-2838-4ff7-343a0d00b9b5","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f343-2838-4ff7-343a0d00b9b5"}},"participantId":"2569536f-be78-446f-9f8b-556a8d2155b4","isMuted":false},{"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}},"participantId":"b5ab4854-3d1c-41e6-bb79-7f416212f56e","isMuted":false},{"identifier":{"rawId":"4:+15551234567","phoneNumber":{"value":"+15551234567"}},"participantId":"fa806367-114b-48e8-be30-695d30bb715b","isMuted":false}], [
  'Content-Length',
  '729',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '869e1e2e-080b-4adb-9326-e296f5e4c5e6',
  'x-ms-client-request-id',
  '340e392e-f910-488d-9964-1c414c3747d5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FhngYQAAAAD7emT5gHFcQIttXkEdcGjOREVMMDFFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:20:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b61f1300-0672-4d6a-a749-46b986815f69/participants:playAudio', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}},"audioFileUri":"https://acsfunctionappstorage.blob.core.windows.net/acs-audio-files/sample-message.wav","loop":true,"operationContext":"operationContext164207644186000041","audioFileId":"audioFileId164207644186002897"})
  .query(true)
  .reply(202, {"operationId":"b61f1300-ca16-4fd9-a0a7-3ebbee277bcf","status":"running","operationContext":"operationContext164207644186000041"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '869e1e2e-080b-4adb-9326-e296f5e4c5e6',
  'x-ms-client-request-id',
  '2595a668-d770-4c62-9347-e5ac2673dbdb',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GRngYQAAAABZBukA4TrhRLwg4hZiKR4eREVMMDFFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:20:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b61f1300-0672-4d6a-a749-46b986815f69/participants:cancelMediaOperation', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}},"mediaOperationId":"b61f1300-ca16-4fd9-a0a7-3ebbee277bcf"})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '869e1e2e-080b-4adb-9326-e296f5e4c5e6',
  'x-ms-client-request-id',
  '6bdd3615-cc4d-49d8-af8a-634a807779df',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0IRngYQAAAAA6ymEcLEKSRLu6hn3tP/4aREVMMDFFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:20:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b61f1300-0672-4d6a-a749-46b986815f69/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '869e1e2e-080b-4adb-9326-e296f5e4c5e6',
  'x-ms-client-request-id',
  '977ecb41-2e4e-4669-81f8-d0b87ac07b59',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0JRngYQAAAACBqBtsIUhXQJZXha8M+EFbREVMMDFFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:20:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/b61f1300-0672-4d6a-a749-46b986815f69/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '869e1e2e-080b-4adb-9326-e296f5e4c5e6',
  'x-ms-client-request-id',
  '6db73e6c-4a12-40b5-bcce-2516a09026c0',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0KBngYQAAAACcrYyKjIpMRaMCsbg9zJHfREVMMDFFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:20:56 GMT',
  'Content-Length',
  '0'
]);

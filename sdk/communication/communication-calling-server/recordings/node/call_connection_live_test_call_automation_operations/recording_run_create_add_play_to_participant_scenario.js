let nock = require('nock');

module.exports.hash = "74ded381f45bc90b033ac0dfb6236394";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164379060364102534","operationContext":"operationContext164379060364108147"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-596f-5cc6-2c8a-08482200f275"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ClgvcFv4x02Y6uJyJjewBQ.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '18b15d06-4467-4741-9edd-8ba419fdd579',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '407ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '080D6YQAAAACt8RLnlPiVTLAgF68wNr90S1VMMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:29:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-596f-5cc6-2c8a-08482200f275"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"521f1300-186b-49f1-890b-ead76c8b0785"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6cc9dc78-857f-4f1a-be70-8eb6eff8ab6c',
  'X-Microsoft-Skype-Chain-ID',
  '309ce99b-8e77-4b67-9be6-82a40d5c2625',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09ED6YQAAAAAPDykQ0Ml1SLCp5ne9wuGCS1VMMzBFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:29:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/521f1300-186b-49f1-890b-ead76c8b0785/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}}})
  .query(true)
  .reply(202, {"operationId":"eea5df2a-4fdf-489c-8f7d-fe6592ef027d","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '309ce99b-8e77-4b67-9be6-82a40d5c2625',
  'x-ms-client-request-id',
  '6e79d039-c3c7-4f64-9418-b6a60ff318a7',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0A0H6YQAAAACGz63lmFK9SoAioZaq0x/eS1VMMzBFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:29:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/callConnections/521f1300-186b-49f1-890b-ead76c8b0785/participants')
  .query(true)
  .reply(200, [{"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-596f-5cc6-2c8a-08482200f275","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-596f-5cc6-2c8a-08482200f275"}},"participantId":"e59bcc04-6aa4-4775-969e-081a4f7403a8","isMuted":false},{"identifier":{"rawId":"4:+15551234567","phoneNumber":{"value":"+15551234567"}},"participantId":"2d502a44-bf02-4a18-aa6d-8a2e715f738d","isMuted":false},{"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}},"participantId":"43ef6263-60a2-4346-b12f-af6dbb32aadd","isMuted":false}], [
  'Content-Length',
  '729',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '309ce99b-8e77-4b67-9be6-82a40d5c2625',
  'x-ms-client-request-id',
  '85ffb7ea-f2d8-44a4-ac58-9fb809dcdcda',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CUH6YQAAAACHeG4XIb60S7XL+SVP4rf+S1VMMzBFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:30:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/521f1300-186b-49f1-890b-ead76c8b0785/participants:playAudio', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}},"audioFileUri":"https://endpoint/acs-audio-files/sample-message.wav","loop":true,"operationContext":"operationContext164379060364108147","audioFileId":"audioFileId164379060364102534"})
  .query(true)
  .reply(202, {"operationId":"521f1300-b062-42be-a3cc-ad58e7f11915","status":"running","operationContext":"operationContext164379060364108147"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '309ce99b-8e77-4b67-9be6-82a40d5c2625',
  'x-ms-client-request-id',
  '8061f5c3-da42-4842-a377-aac5352a6487',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DEH6YQAAAACBrakFphUKRoCIu2cSoI9qS1VMMzBFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:30:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/521f1300-186b-49f1-890b-ead76c8b0785/participants:cancelMediaOperation', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}},"mediaOperationId":"521f1300-b062-42be-a3cc-ad58e7f11915"})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '309ce99b-8e77-4b67-9be6-82a40d5c2625',
  'x-ms-client-request-id',
  '86c5cd0c-ba07-4d02-87a1-d5332abb8253',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FUH6YQAAAAAFaEigERwzSrWGkInBWGjWS1VMMzBFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:30:13 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/521f1300-186b-49f1-890b-ead76c8b0785/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-999a0d00ad99"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '309ce99b-8e77-4b67-9be6-82a40d5c2625',
  'x-ms-client-request-id',
  'bab35e13-66e5-4ff7-a091-a2819c9510be',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GEH6YQAAAACKRaTTcxcRTo0i9Bo/tsd5S1VMMzBFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:30:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/521f1300-186b-49f1-890b-ead76c8b0785/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '309ce99b-8e77-4b67-9be6-82a40d5c2625',
  'x-ms-client-request-id',
  '57b8cdb6-73f4-4bfa-83ac-b00aa237f43b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GkH6YQAAAABt2PBWj7ILQ4ZfIwDfQGJ2S1VMMzBFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 02 Feb 2022 08:30:18 GMT',
  'Content-Length',
  '0'
]);

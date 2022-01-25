let nock = require('nock');

module.exports.hash = "2519d94cd7f331690f2f8a56a33825fa";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164312497103608153","operationContext":"operationContext164312497103607318"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31c2-e9b1-2c8a-0848220034c1"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'UcniZCUu8kWuSdYRDzsMMw.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '82072f1d-71bf-4bfc-a6b9-afb4962f117c',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '31ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05hjwYQAAAADvNscAMl1rTIKHWAICW5IRREVMMDFFREdFMDYxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:36:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31c2-e9b1-2c8a-0848220034c1"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"22201300-0b98-4fcb-b754-213c4602787b"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'd4fba520-0502-42fc-ae66-9dc8c7810a99',
  'X-Microsoft-Skype-Chain-ID',
  '5024ea03-92b9-45ee-8ca0-615e06ee41e4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '06RjwYQAAAABYK3UUUCyuR53SMINohOEnREVMMDFFREdFMDUxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:36:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/22201300-0b98-4fcb-b754-213c4602787b/:playAudio', {"audioFileUri":"https://endpoint/audio/sample-message.wav","loop":true,"operationContext":"operationContext164312497103607318","audioFileId":"audioFileId164312497103608153"})
  .query(true)
  .reply(202, {"operationId":"c5a057cd-d970-4f65-b601-731dd99056dd","status":"running","operationContext":"operationContext164312497103607318"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '5024ea03-92b9-45ee-8ca0-615e06ee41e4',
  'x-ms-client-request-id',
  'bdadabb1-eb68-492e-84db-7eaecc193596',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+hjwYQAAAABmvWOLLcGnQ4FMmFtwi9P2REVMMDFFREdFMDUxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:36:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/22201300-0b98-4fcb-b754-213c4602787b/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"0fbf6591-fbc1-4259-8438-d749d23d484c","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '5024ea03-92b9-45ee-8ca0-615e06ee41e4',
  'x-ms-client-request-id',
  '162aa28d-9d4d-4287-bfc6-cea6c0338ddd',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0CxnwYQAAAACs8OncWIPZRrtCRDWDIUGTREVMMDFFREdFMDUxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:36:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/22201300-0b98-4fcb-b754-213c4602787b/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '5024ea03-92b9-45ee-8ca0-615e06ee41e4',
  'x-ms-client-request-id',
  '0f550bdc-d61b-4240-8f15-e51458c35cf4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HBnwYQAAAADbWnkreyhNQaIL1HTbryeUREVMMDFFREdFMDUxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:37:00 GMT',
  'Content-Length',
  '0'
]);

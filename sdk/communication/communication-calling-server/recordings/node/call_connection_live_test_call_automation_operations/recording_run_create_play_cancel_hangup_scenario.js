let nock = require('nock');

module.exports.hash = "e730f3bc00938058ffd3f8694bedb001";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164327519613104346","operationContext":"operationContext164327519613105072"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3ab7-1d66-d68a-08482200ac02"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'zeKVAUe3w0mM7Sk/29yNWw.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '6d854d43-d3b3-4804-9382-64f4fb3f710a',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '32ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tGPyYQAAAACeeaLsGLsdT66B6zLB+BEAQk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 09:19:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3ab7-1d66-d68a-08482200ac02"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"8b1f1300-2994-4cad-8e58-ac9044a5822d"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'fd6694f3-4369-410e-b25a-c289bc52e27f',
  'X-Microsoft-Skype-Chain-ID',
  '0d7aede3-f633-450b-a30d-39389c6b002d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0uGPyYQAAAADMC1oGn+sSSaq5tbtPRWmcQk9NMDFFREdFMDUyMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 09:19:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/8b1f1300-2994-4cad-8e58-ac9044a5822d/:playAudio', {"audioFileUri":"https://acsfunctionappstorage.blob.core.windows.net/acs-audio-files/sample-message.wav","loop":true,"operationContext":"operationContext164327519613105072","audioFileId":"audioFileId164327519613104346"})
  .query(true)
  .reply(202, {"operationId":"9a64e7fc-6667-4772-8537-0670aa58eab0","status":"running","operationContext":"operationContext164327519613105072"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '0d7aede3-f633-450b-a30d-39389c6b002d',
  'x-ms-client-request-id',
  'ec69cf40-5ec2-4ab4-ad1a-f773b9bd0a09',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ymPyYQAAAADI3Z9NNWWJTZ5kYUjaIYl+Qk9NMDFFREdFMDUyMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 09:20:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/8b1f1300-2994-4cad-8e58-ac9044a5822d/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"7a7ded91-767a-44bb-b95b-574211cee011","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '0d7aede3-f633-450b-a30d-39389c6b002d',
  'x-ms-client-request-id',
  'e88913b8-e2c1-492e-ad5a-212f36da4de9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02GPyYQAAAAAYofmxkMB1RbbJV+1vwN4PQk9NMDFFREdFMDUyMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 09:20:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/8b1f1300-2994-4cad-8e58-ac9044a5822d/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '0d7aede3-f633-450b-a30d-39389c6b002d',
  'x-ms-client-request-id',
  '203a9711-798c-4de4-903a-7b3fa82d6045',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05mPyYQAAAABV+EmzhCFARIy5mvCp78DZQk9NMDFFREdFMDUyMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 09:20:37 GMT',
  'Content-Length',
  '0'
]);

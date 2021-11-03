let nock = require('nock');

module.exports.hash = "91ae5cf5c1a1f9f577c79320d44390bd";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId163592632598100800","operationContext":"operationContext163592632598105415"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-84b0-5ac4-28c5-593a0d000f09"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ej6CNrmzPUupKpV2nc/NXA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '70fc0088-75e7-44b9-9781-83b5076e88f8',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '41ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0NEGCYQAAAABEpRS7JoBRSrEBAtOFuvN2V1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 03 Nov 2021 07:58:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-84b0-5ac4-28c5-593a0d000f09"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"d41f1300-c843-49e0-a241-1238b631c7d1"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6b93da44-ed9f-4a55-b3f1-cac6f5f4185b',
  'X-Microsoft-Skype-Chain-ID',
  '85296700-e830-4253-91fa-0c871b120d79',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0NUGCYQAAAABeChp0FV+vRJd5ayqyAArcV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 03 Nov 2021 07:58:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/d41f1300-c843-49e0-a241-1238b631c7d1/:playAudio', {"audioFileUri":"https://endpoint/audio/sample-message.wav","loop":true,"operationContext":"operationContext163592632598105415","audioFileId":"audioFileId163592632598100800","callbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(202, {"operationId":"3bd09c8c-7eef-40d4-812a-4043ebf1725c","status":"running","operationContext":"operationContext163592632598105415"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'dd643d2e-636c-4cba-94e4-e1523ef58c03',
  'x-ms-client-request-id',
  '368643a3-1dd9-4fab-abcd-9287a4beaf31',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QEGCYQAAAABxyyKPD1y3QbhPqjHTjf0TV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 03 Nov 2021 07:58:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/d41f1300-c843-49e0-a241-1238b631c7d1/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"aa43fa76-892b-481d-b88f-d630a952010c","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'a0fae5dc-445d-4fc6-8b20-78792dc1df18',
  'x-ms-client-request-id',
  '508201e5-82ac-4735-bfec-163a69297ceb',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QUGCYQAAAAB6ZaggdStwTIadZAI8/nKKV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 03 Nov 2021 07:58:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/d41f1300-c843-49e0-a241-1238b631c7d1/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '2de7bc3d-c8db-4e45-8650-911a80d82ec7',
  'x-ms-client-request-id',
  '91f520cc-6dff-44bb-acb6-efa74f51564b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0S0GCYQAAAACcfEPpH8LIQ67GWHIRgq5YV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 03 Nov 2021 07:59:07 GMT',
  'Content-Length',
  '0'
]);

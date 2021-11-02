let nock = require('nock');

module.exports.hash = "a408222633e95f57d4cb6d9b42356c6b";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId163588155539809897","operationContext":"operationContext163588155539803449"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-8205-3533-e141-094822000959"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'HKkbAq7dqkiWz8fRgwJh7Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'fbbc6295-e8e2-4dcb-ad98-fa9e6f89e74a',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '39ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0UpKBYQAAAAC7PBUWZYh+TqzhtmUyMNKvV1NURURHRTA4MTgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:32:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15512477863"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-8205-3533-e141-094822000959"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"4f1f1300-e88f-4307-b278-c0a8b9bcbba3"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '68ae3cb4-7d81-4517-90c7-b816c770db35',
  'X-Microsoft-Skype-Chain-ID',
  'b5313621-bba4-4b1c-9238-c6998970c9c8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0UpKBYQAAAACDEGd//e8fT7PgnjxRhYzuV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:32:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/4f1f1300-e88f-4307-b278-c0a8b9bcbba3/:playAudio', {"audioFileUri":"https://endpoint/audio/sample-message.wav","loop":true,"operationContext":"operationContext163588155539803449","audioFileId":"audioFileId163588155539809897","callbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(202, {"operationId":"3e9d155e-0e7f-46a9-9a29-9eb3ddcbc9a2","status":"running","operationContext":"operationContext163588155539803449"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '435821fb-7594-4d3f-a3b2-01e87bef0758',
  'x-ms-client-request-id',
  '70e7fc5a-46ed-4810-b44e-660c5701e0ba',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0XZKBYQAAAAAQ3sODUG78Q4M8Yv5R2Cn1V1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:32:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/4f1f1300-e88f-4307-b278-c0a8b9bcbba3/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"4465dd3b-ab2a-4809-a6b6-768b29644972","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '49ba713e-e471-46de-aa07-89fd456873bc',
  'x-ms-client-request-id',
  'e5a5874d-2304-49b1-bdfb-2068e7bdc695',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0XZKBYQAAAAA3Dpayn01MRqPW3l8W7bHKV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:32:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/4f1f1300-e88f-4307-b278-c0a8b9bcbba3/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '33fbca87-1154-41f0-95d0-93b829c9573e',
  'x-ms-client-request-id',
  '6069c56f-aa4e-4050-a4d0-881cc513e34c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0aJKBYQAAAAA6Z6ERZ0ZrRYN2HDTK0YhGV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:32:56 GMT',
  'Content-Length',
  '0'
]);

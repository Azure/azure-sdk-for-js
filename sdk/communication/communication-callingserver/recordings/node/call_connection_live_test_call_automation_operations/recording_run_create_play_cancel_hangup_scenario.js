let nock = require('nock');

module.exports.hash = "a408222633e95f57d4cb6d9b42356c6b";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId163436537407103469","operationContext":"operationContext163436537407205945"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-27a6-195d-03fd-9c3a0d001a2e"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'lBSvLBWLvkCzrCnVCe+vOg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '7d05867c-0ab3-4f72-8795-80bba9eebab7',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '117ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0u29qYQAAAADiYQUsSiwgTYgZO4s/sq0BV1NURURHRTA4MTQAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 16 Oct 2021 06:22:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15512477863"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000d-27a6-195d-03fd-9c3a0d001a2e"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"22201300-c1d9-4192-b2d7-fec285b6d4df"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'a7a23554-1aeb-4256-83ff-4b1e9108bb1b',
  'X-Microsoft-Skype-Chain-ID',
  '6e5a47b2-7306-477e-87a6-7159fa81fa04',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vG9qYQAAAABwI36XC6S2SLSNMnWA5imaV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 16 Oct 2021 06:22:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/22201300-c1d9-4192-b2d7-fec285b6d4df/:playAudio', {"audioFileUri":"https://endpoint/audio/sample-message.wav","loop":true,"operationContext":"operationContext163436537407205945","audioFileId":"audioFileId163436537407103469","callbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(202, {"operationId":"5fe9fa8b-fd04-4c01-a88f-2d10aa11a6d0","status":"running","operationContext":"operationContext163436537407205945"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '1a4f28dd-0d20-46de-8fb3-abadd48e662a',
  'x-ms-client-request-id',
  '02a508e2-390e-442f-905f-e8f61c62b333',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yG9qYQAAAACOY7BbiY9NSqRto59N6r/KV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 16 Oct 2021 06:23:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/22201300-c1d9-4192-b2d7-fec285b6d4df/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"b0a49a88-a3cf-4738-b01f-f68600878a6e","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '798c02b1-83fd-41e6-9d1a-c0f10e9bf836',
  'x-ms-client-request-id',
  '3c497b27-1169-4cb8-ab8a-9088c55ce8e5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yW9qYQAAAAAOiatNoEKkSYmgxnZg6FENV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 16 Oct 2021 06:23:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/22201300-c1d9-4192-b2d7-fec285b6d4df/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '311b34d4-2cf2-48df-8513-74b171c9041d',
  'x-ms-client-request-id',
  'd74757e8-c4bd-4e86-989a-e41e596e8eff',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0029qYQAAAACXCM2y0ilwQ7cztEClZIUEV1NURURHRTA4MTcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sat, 16 Oct 2021 06:23:14 GMT',
  'Content-Length',
  '0'
]);

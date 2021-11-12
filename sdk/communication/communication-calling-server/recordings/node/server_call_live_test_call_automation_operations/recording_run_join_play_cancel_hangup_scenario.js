let nock = require('nock');

module.exports.hash = "4d189a9bb7b3b4cb4c8584858eff9ee2";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId163688041997901564","operationContext":"operationContext163688041997908171"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"bf1f1300-2a60-4366-872a-fbdde451b4fb"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'ba1514ad-bb2e-4efd-a52e-e573a0dba86b',
  'X-Microsoft-Skype-Chain-ID',
  '7149bad8-1e97-4694-b8cc-349ae9639b02',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ItCQYQAAAACKt6nuIu/nRIDIGbiVlBY5V1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:00:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"bf1f1300-971f-4798-86ef-86600401abc3"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '0d5da42a-cec3-4927-854d-314cd591b109',
  'X-Microsoft-Skype-Chain-ID',
  'c9bae3da-9148-4ef3-a185-619023b1d440',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0I9CQYQAAAABcqExIJgEqSpGdly/nNFMZV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:00:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:playAudio', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a"},"audioFileUri":"https://endpoint/audio/sample-message.wav","loop":true,"operationContext":"operationContext163688041997908171","audioFileId":"audioFileId163688041997901564","callbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(202, {"operationId":"bf1f1300-df49-46d6-95b3-d9623b1364ff","status":"running","operationContext":"operationContext163688041997908171"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'ace589c0-8d84-45fd-90eb-6edf5cba7850',
  'X-Microsoft-Skype-Chain-ID',
  '2ff44cb3-614d-4471-ae8c-d8612dab4175',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0MtCQYQAAAABhuxoaWD95S4t0VwDdJXeyV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:00:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/bf1f1300-2a60-4366-872a-fbdde451b4fb/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"218fb161-3b8c-457e-963e-380916bd05ce","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'd02605c6-03b2-40d8-b57e-56c8522849a7',
  'x-ms-client-request-id',
  '5b68a4bd-0fa5-453e-aa9a-e9c65bd950bb',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Q9CQYQAAAAA+3Ho3AabZQ7bC11l273j1V1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:00:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/bf1f1300-971f-4798-86ef-86600401abc3/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"d1218f00-d5b2-4527-a0e9-37992a8ab681","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '6e33da44-35d9-4df9-9e68-b3b76eeb4450',
  'x-ms-client-request-id',
  '573494b1-e6eb-4cbe-b312-67aa82efc52a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0RNCQYQAAAADKKjq0vk2BSK/OzsraJG6bV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:00:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/bf1f1300-2a60-4366-872a-fbdde451b4fb/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'e01b8fec-f06e-431d-a763-d9bf72263a2b',
  'x-ms-client-request-id',
  '88b89e6f-fe8f-4a7d-8347-e2f77c88a2fa',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0U9CQYQAAAADGgSIM8mW1R6c3z8R+5/bPV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:01:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/bf1f1300-971f-4798-86ef-86600401abc3/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'ce36aeb5-10c5-4287-87c5-bded001fbaea',
  'x-ms-client-request-id',
  '1ec07e69-f15f-4177-932e-27da46a025b1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0U9CQYQAAAABkX556odSRTINpRZnu1dmPV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Sun, 14 Nov 2021 09:01:07 GMT',
  'Content-Length',
  '0'
]);

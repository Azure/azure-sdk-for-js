let nock = require('nock');

module.exports.hash = "48d6dad44db4e6bdea6ed54d7fbd5637";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1350d9e6-946f-5cd9-9f29-a1cb488a2c71","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"69201300-9403-44ce-b80f-b1eb79e6ad1b"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '221e33c6-3956-4a3a-973c-be39c52c83bb',
  'X-Microsoft-Skype-Chain-ID',
  'c4be0c94-a621-4ebb-93f9-8ee21aa84a45',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wF+EYQAAAAASBMYX2vAMRaReyD7FGQbEV1NURURHRTA4MTUAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 04 Nov 2021 22:33:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"1350d9e6-946f-5cd9-9f29-a1cb488a2c71","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"69201300-ee78-4b8d-a475-ad99ce7f4dad"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '41638b6e-6aec-47cf-887e-cf4b94a81ecf',
  'X-Microsoft-Skype-Chain-ID',
  '5e6b5690-1278-41f0-b25d-f666e1f3b19a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wV+EYQAAAACUsbiCSmBcSpE0QO8GI3oXV1NURURHRTA4MTUAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 04 Nov 2021 22:33:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"groupCallId":"1350d9e6-946f-5cd9-9f29-a1cb488a2c71","kind":"groupCallLocator"},"recordingStateCallbackUri":"/not/absolute/url"})
  .query(true)
  .reply(400, {"error":{"code":"BadRequest","message": ""}}, [
  'x-ms-client-request-id',
  'af17cf79-ff22-4b4d-8220-e2bac4903231',
  'X-Microsoft-Skype-Chain-ID',
  '5e4707da-4062-4d99-98a1-66af5cb112b2',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wV+EYQAAAAD93HuAcEICTZun2Lbz373nV1NURURHRTA4MTUAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 04 Nov 2021 22:33:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2OTIwMTMwMC1jMTEyLTQ5ZDItYjU1YS03ZGZkZTc0NjY2NjUiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxZDcyNDdkYS0xZjA1LTRjZjMtOWU5MS01ZmE1ZjEwMmRlYTQifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'a71f5286-52c8-4027-a113-07da25995c03',
  'x-ms-client-request-id',
  '7f9da620-df7c-4791-9562-2b81d755ed05',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0x1+EYQAAAABgITbCFFK/RJpGeS9apa2WV1NURURHRTA4MTUAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 04 Nov 2021 22:33:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/69201300-9403-44ce-b80f-b1eb79e6ad1b/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'a0af77ad-411f-4b39-afb1-15a754b88326',
  'x-ms-client-request-id',
  '157a5afd-5194-4009-9f82-66e02d082eff',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0x1+EYQAAAABekgOQL9wDTpZM4RERT8MAV1NURURHRTA4MTUAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 04 Nov 2021 22:33:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/69201300-ee78-4b8d-a475-ad99ce7f4dad/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '6a26fac2-b964-44a9-bfb7-6e23e1eba69b',
  'x-ms-client-request-id',
  'abb1aa5b-8a82-43b6-8e04-e809aa4fb631',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0x1+EYQAAAADbt8ami74dTK7I25BXbyazV1NURURHRTA4MTUAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Thu, 04 Nov 2021 22:33:43 GMT',
  'Content-Length',
  '0'
]);

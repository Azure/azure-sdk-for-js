let nock = require('nock');

module.exports.hash = "b33dae347866a6fc7385dc0a98619e1d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"651f1300-7d69-43d6-bd9a-edb80084d347"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'ad743e4f-b3d8-46aa-833c-276038831874',
  'X-Microsoft-Skype-Chain-ID',
  '16f5012e-faea-49db-8ee0-a09c6ee38a4a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Kh3wYQAAAAAKcsKFY957RqdiNf0Ho/VIS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:54:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"651f1300-ee27-4f4d-bfc6-04600ef39f95"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '778a2ad8-0a28-433b-b900-51c429aade55',
  'X-Microsoft-Skype-Chain-ID',
  '2fb4bd96-c5d8-42f1-bd2d-92e980531173',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0LB3wYQAAAADXzocrcOV3ToBGqB+2v5EZS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:54:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"recordingStateCallbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2NTFmMTMwMC04MTIzLTRlODItOGJjMC00YzBjOGUzMTVhZGQiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJmNmExMjYwZC1hYWQ5LTQyNTUtODU2ZS0yYzYzYmQ3MTk4MTIifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'b9913a60-195b-4609-b992-80bc77f17036',
  'X-Microsoft-Skype-Chain-ID',
  'e158ba65-4e64-4c54-815c-a4924ee5eb5d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0LR3wYQAAAADZg+PtSb8ZR4MUDiakp/0dS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:54:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2NTFmMTMwMC04MTIzLTRlODItOGJjMC00YzBjOGUzMTVhZGQiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJmNmExMjYwZC1hYWQ5LTQyNTUtODU2ZS0yYzYzYmQ3MTk4MTIifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '7e84a039-4ed1-48fd-a399-92ae679a235a',
  'x-ms-client-request-id',
  '690a7a83-522e-43c4-a35d-82f5dc99e918',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0RB3wYQAAAABFOCAPhtubTKjaXWkkFogJS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:54:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2NTFmMTMwMC04MTIzLTRlODItOGJjMC00YzBjOGUzMTVhZGQiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJmNmExMjYwZC1hYWQ5LTQyNTUtODU2ZS0yYzYzYmQ3MTk4MTIifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '7e84a039-4ed1-48fd-a399-92ae679a235a',
  'x-ms-client-request-id',
  'c891fe0f-2cc4-42ab-a930-9b6fd6d862a7',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0SR3wYQAAAACrupEW4qgqS7jpW67+anYuS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:54:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2NTFmMTMwMC04MTIzLTRlODItOGJjMC00YzBjOGUzMTVhZGQiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJmNmExMjYwZC1hYWQ5LTQyNTUtODU2ZS0yYzYzYmQ3MTk4MTIifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '7e84a039-4ed1-48fd-a399-92ae679a235a',
  'x-ms-client-request-id',
  '7afc965e-9a7e-4a63-b340-8524f84a1a72',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Vh3wYQAAAAA7GmeP0o+eS4YMewyRweTXS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:55:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2NTFmMTMwMC04MTIzLTRlODItOGJjMC00YzBjOGUzMTVhZGQiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJmNmExMjYwZC1hYWQ5LTQyNTUtODU2ZS0yYzYzYmQ3MTk4MTIifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '7e84a039-4ed1-48fd-a399-92ae679a235a',
  'x-ms-client-request-id',
  'bf1aa570-ca03-40af-8ca6-037a3e2fba21',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Vx3wYQAAAAD/XHlK4yIQRaAErhUjrgFmS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:55:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2NTFmMTMwMC04MTIzLTRlODItOGJjMC00YzBjOGUzMTVhZGQiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJmNmExMjYwZC1hYWQ5LTQyNTUtODU2ZS0yYzYzYmQ3MTk4MTIifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '7e84a039-4ed1-48fd-a399-92ae679a235a',
  'x-ms-client-request-id',
  '6624241b-f75c-4a27-ab6a-9866daa7f9f4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0Yx3wYQAAAABXVBoYXPViT7sFDWfWCeZRS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:55:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI2NTFmMTMwMC04MTIzLTRlODItOGJjMC00YzBjOGUzMTVhZGQiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJmNmExMjYwZC1hYWQ5LTQyNTUtODU2ZS0yYzYzYmQ3MTk4MTIifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '7e84a039-4ed1-48fd-a399-92ae679a235a',
  'x-ms-client-request-id',
  '5f3a9920-e28c-48f8-ad92-708c05d67fdc',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ZB3wYQAAAAC4cKKVKo+WSoEMy3tino8+S1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:55:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/651f1300-7d69-43d6-bd9a-edb80084d347/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '7e84a039-4ed1-48fd-a399-92ae679a235a',
  'x-ms-client-request-id',
  '5445ea06-23c3-470e-b56d-eb585d07ab13',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ZB3wYQAAAADMxLKFoDV3T6XeGOsXY+dkS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:55:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/651f1300-ee27-4f4d-bfc6-04600ef39f95/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '7e84a039-4ed1-48fd-a399-92ae679a235a',
  'x-ms-client-request-id',
  '124ed54f-44c7-46f9-a619-4b1e4a9a068a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ZR3wYQAAAACjSaqxzNHjSqfkDq/XlI8JS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 15:55:17 GMT',
  'Content-Length',
  '0'
]);

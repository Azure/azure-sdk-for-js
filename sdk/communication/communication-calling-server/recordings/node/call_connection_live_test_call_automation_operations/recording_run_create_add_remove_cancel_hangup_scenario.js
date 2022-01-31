let nock = require('nock');

module.exports.hash = "227a0d7d3b0df867c14e2cd39402671f";

module.exports.testInfo = {"uniqueName":{"audioFileId":"audioFileId164327284393907912","operationContext":"operationContext164327284393905440"},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a92-fe08-ec8d-08482200b036"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '3x4SwPJ0iEakc8r0pktveQ.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '82aaba0a-ec80-4051-91fb-07ce7e150ca6',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '30ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0dFryYQAAAADBd9E32kJrSr7hU6Dgwt8ZQk9NMDFFREdFMDUxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 08:40:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a92-fe08-ec8d-08482200b036"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"fe1f1300-6094-4fbc-9d83-9505e25c500b"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '1e75c286-ceb9-42a9-91fd-cc3cfe05bedf',
  'X-Microsoft-Skype-Chain-ID',
  '27d76747-317e-4c26-8bec-adf35f4f928a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0dVryYQAAAACBaouD+1iAT4Oya7zaJnsWQk9NMDFFREdFMDUwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 08:40:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/fe1f1300-6094-4fbc-9d83-9505e25c500b/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a61-2e44-69ff-9c3a0d00abe3"}}})
  .query(true)
  .reply(202, {"operationId":"387b7b0e-f2a7-4a0e-bb2c-880a3b0d2d58","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '27d76747-317e-4c26-8bec-adf35f4f928a',
  'x-ms-client-request-id',
  '8c98f66d-8934-41ad-8c63-8e7305dae9fe',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0gVryYQAAAAB1DZjde955S5ugqsbyUJ0wQk9NMDFFREdFMDUwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 08:40:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/callConnections/fe1f1300-6094-4fbc-9d83-9505e25c500b/participants')
  .query(true)
  .reply(200, [{"identifier":{"rawId":"4:+15551234567","phoneNumber":{"value":"+15551234567"}},"participantId":"8fcfa76a-6f26-4e14-80fa-2be2890da577","isMuted":false},{"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a61-2e44-69ff-9c3a0d00abe3","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a61-2e44-69ff-9c3a0d00abe3"}},"participantId":"a2828e5d-e58c-4b4c-91ea-a655d08a651e","isMuted":false},{"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a92-fe08-ec8d-08482200b036","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a92-fe08-ec8d-08482200b036"}},"participantId":"4e0f210b-935c-4859-9a3f-5eef6b787076","isMuted":false}], [
  'Content-Length',
  '729',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '27d76747-317e-4c26-8bec-adf35f4f928a',
  'x-ms-client-request-id',
  'c4eb4ba0-ef70-412f-bfbe-0b9c41a07f98',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iVryYQAAAABA4jDNyISsTpA6VXZMoJ/bQk9NMDFFREdFMDUwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 08:40:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/fe1f1300-6094-4fbc-9d83-9505e25c500b/participants:playAudio', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a61-2e44-69ff-9c3a0d00abe3"}},"audioFileUri":"https://acsfunctionappstorage.blob.core.windows.net/acs-audio-files/sample-message.wav","loop":true,"operationContext":"operationContext164327284393905440","audioFileId":"audioFileId164327284393907912"})
  .query(true)
  .reply(202, {"operationId":"fe1f1300-5d4c-4b93-b5f5-1f41db93a787","status":"running","operationContext":"operationContext164327284393905440"}, [
  'Content-Length',
  '129',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '27d76747-317e-4c26-8bec-adf35f4f928a',
  'x-ms-client-request-id',
  '8fcfee07-dd6a-4bd6-80a3-8156755cbefb',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0i1ryYQAAAAB5RuF/l6LxQJYH3E09tK2RQk9NMDFFREdFMDUwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 08:40:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/fe1f1300-6094-4fbc-9d83-9505e25c500b/participants:cancelMediaOperation', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a61-2e44-69ff-9c3a0d00abe3"}},"mediaOperationId":"fe1f1300-5d4c-4b93-b5f5-1f41db93a787"})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '27d76747-317e-4c26-8bec-adf35f4f928a',
  'x-ms-client-request-id',
  'de747fe3-cd09-49b1-b69f-5ff90e45ba77',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0k1ryYQAAAABQezGbE1YLSrA7vSGVHGkrQk9NMDFFREdFMDUwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 08:40:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/fe1f1300-6094-4fbc-9d83-9505e25c500b/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3a61-2e44-69ff-9c3a0d00abe3"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '27d76747-317e-4c26-8bec-adf35f4f928a',
  'x-ms-client-request-id',
  'a7768c20-1dab-4a25-9e21-ab369fcdc1ec',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0l1ryYQAAAADXH5I5m4WjTaLp2baQep9MQk9NMDFFREdFMDUwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 08:40:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/fe1f1300-6094-4fbc-9d83-9505e25c500b/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '27d76747-317e-4c26-8bec-adf35f4f928a',
  'x-ms-client-request-id',
  '6739ae37-09e4-4255-9113-8c01414aff73',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0m1ryYQAAAACsRsU7U8r1SororO5k38UOQk9NMDFFREdFMDUwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 08:40:59 GMT',
  'Content-Length',
  '0'
]);

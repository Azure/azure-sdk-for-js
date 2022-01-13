let nock = require('nock');

module.exports.hash = "4ee351e1422e7e4212e09bcc719457ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f358-ef2e-1000-343a0d00bb19"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '/l6L/p8rJkuVODZdGCzFkA.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '3345e2b5-a7eb-4b1c-8d65-df1be712008d',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '27ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iR7gYQAAAADsxbaFxRd4S5LJrMRioFanREVMMDFFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:43:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f358-ef2e-1000-343a0d00bb19"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"01201300-e3b4-429c-9dba-c37286ffa8eb"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'e7b30a8b-b993-47b9-af5d-08d6a7fc3214',
  'X-Microsoft-Skype-Chain-ID',
  'd11149e6-90f2-404e-9def-85a426ff9580',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ih7gYQAAAABuyoHmsic7TZBhRD/Rt0W/REVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:43:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/01201300-e3b4-429c-9dba-c37286ffa8eb/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}}})
  .query(true)
  .reply(202, {"operationId":"7b76dd46-9955-4340-a01a-d447102d61d5","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'd11149e6-90f2-404e-9def-85a426ff9580',
  'x-ms-client-request-id',
  '03f1a026-594c-4bbf-9e2c-f7613b8bdec2',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0lx7gYQAAAAB4HJMD/gUzRaapypN7jGo1REVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:44:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/01201300-e3b4-429c-9dba-c37286ffa8eb/participants:mute', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}}})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'd11149e6-90f2-404e-9def-85a426ff9580',
  'x-ms-client-request-id',
  '1f3b6fa3-c2d2-47e6-af1d-5f6df1d1a461',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0rB7gYQAAAAAbOnI/I439RoOFN5HTELRCREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:44:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/01201300-e3b4-429c-9dba-c37286ffa8eb/participants:get', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}}})
  .query(true)
  .reply(200, {"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}},"participantId":"48573278-0d22-4dc9-99a1-48ef56f5f151","isMuted":true}, [
  'Content-Length',
  '285',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'd11149e6-90f2-404e-9def-85a426ff9580',
  'x-ms-client-request-id',
  '6569d5f0-ae76-4820-bb16-c815807634b3',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0sB7gYQAAAADrd/1p5pJpRYd0BNoa5pAPREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:44:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/01201300-e3b4-429c-9dba-c37286ffa8eb/participants:unmute', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}}})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'd11149e6-90f2-404e-9def-85a426ff9580',
  'x-ms-client-request-id',
  '267e6a8e-4a5a-48cb-997e-84627b1e1543',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0sx7gYQAAAABcsPGFOyPkQp/H0LJEiLN6REVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:44:35 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/01201300-e3b4-429c-9dba-c37286ffa8eb/participants:get', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}}})
  .query(true)
  .reply(200, {"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}},"participantId":"48573278-0d22-4dc9-99a1-48ef56f5f151","isMuted":false}, [
  'Content-Length',
  '286',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'd11149e6-90f2-404e-9def-85a426ff9580',
  'x-ms-client-request-id',
  'ffad13d5-cc5c-46ee-81a6-3972c1a7262b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tx7gYQAAAADa6BL+suqhQr+OFin7PCZxREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:44:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/01201300-e3b4-429c-9dba-c37286ffa8eb/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f33d-4612-defd-8b3a0d00faca"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'd11149e6-90f2-404e-9def-85a426ff9580',
  'x-ms-client-request-id',
  'e0c3610f-bbee-4a8f-b25c-c6e8be93e4f0',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0uh7gYQAAAACR0jchCNHLS7kBap8hG8hOREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:44:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/01201300-e3b4-429c-9dba-c37286ffa8eb/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'd11149e6-90f2-404e-9def-85a426ff9580',
  'x-ms-client-request-id',
  '0873a2a3-74c7-404b-a30c-698d34704062',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vR7gYQAAAACtH6J3VeOLS5+5+5paQiQbREVMMDFFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 12:44:45 GMT',
  'Content-Length',
  '0'
]);

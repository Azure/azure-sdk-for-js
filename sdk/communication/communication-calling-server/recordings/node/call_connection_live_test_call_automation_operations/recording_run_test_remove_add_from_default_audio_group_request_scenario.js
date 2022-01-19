let nock = require('nock');

module.exports.hash = "a1972f1e8e9bc05dee5763f051968677";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f846-3f03-35f3-343a0d00f5c9"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'H3iThbc070Ce8Iu4hBugMg.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '25d2b0f6-c529-4316-8e34-4f23746c51a7',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '30ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bmHhYQAAAABdv28HsxWtSLZ4afzPYWSkREVMMDFFREdFMDYxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:41:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f846-3f03-35f3-343a0d00f5c9"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"471f1300-34a2-4333-989d-c20160c739e1"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '31e29cc8-2797-4a36-9f0d-ff9b6fdd2c0d',
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0b2HhYQAAAAC/h9IgtXjVSpuxy7+bhbGzREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:41:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}})
  .query(true)
  .reply(202, {"operationId":"e3cf8657-68fa-4ff0-8235-d6638feb708e","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  '6a008aee-e03a-4a99-8e34-1e33a35ab9b9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fGHhYQAAAACh+YN8g2MvRpnyrl0qEzD0REVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:41:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/:createAudioGroup', {"audioRoutingMode":"multicast","targets":[{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}]})
  .query(true)
  .reply(201, {"audioGroupId":"1624b62e-13d6-469e-8a28-6203ac326f5c"}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  '337b5bbd-1e9b-4f03-99a6-d71570c28ef5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jWHhYQAAAAC8PNXmMiaIQ7I5rjifISbhREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:42:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/audioGroups/1624b62e-13d6-469e-8a28-6203ac326f5c')
  .query(true)
  .reply(200, {"audioRoutingMode":"multicast","targets":[{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}]}, [
  'Content-Length',
  '245',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  '2d2fffb4-3b6c-4ea1-98ff-95e08dafe607',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0j2HhYQAAAACiDWNgZZR1QqGEpiYeSGgRREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:42:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7ec-e8f2-fa5d-573a0d003d42"}}})
  .query(true)
  .reply(202, {"operationId":"8854216a-6232-4da9-abb1-d3c9d2815bf4","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  '51744401-a284-4f19-a555-263bb831ab09',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0mGHhYQAAAAC66Ba4t2bUTK6zgsCZHTKVREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:42:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/audioGroups/1624b62e-13d6-469e-8a28-6203ac326f5c', {"targets":[{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7ec-e8f2-fa5d-573a0d003d42"}}]})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  '1ded6daa-b311-4fcd-99fa-a2cc8865ee5a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0omHhYQAAAAD43FCENog8TKMiLDBsbV98REVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:42:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/audioGroups/1624b62e-13d6-469e-8a28-6203ac326f5c')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  'bc2ba0cb-bca8-46ee-a091-57687154cd14',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0o2HhYQAAAACFGvWmhV5fR4QzyEKoVHmBREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:42:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7b9-cda1-eef0-8b3a0d0028ea"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  '51fd50bb-9e5d-49f2-b992-f28d78679c4c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0rWHhYQAAAACTrBiOxHlPQZKnO6qLmKj6REVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:42:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000e-f7ec-e8f2-fa5d-573a0d003d42"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  '38f96433-c96c-47dd-874d-76ec70ee2d01',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0rmHhYQAAAADXotrhBJStT7i/39zAfVusREVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:42:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/471f1300-34a2-4333-989d-c20160c739e1/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '44a3f44b-65f5-4eee-adb0-e6770d89d8f3',
  'x-ms-client-request-id',
  '7c0cd10e-5a4a-486e-a800-cb4e153d1bd7',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zWHhYQAAAAA9nduHfBtLQJ5tupjbTkQ1REVMMDFFREdFMDUwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 11:43:08 GMT',
  'Content-Length',
  '0'
]);

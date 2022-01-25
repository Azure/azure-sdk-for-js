let nock = require('nock');

module.exports.hash = "166949ba5a9464cf338d53da73b961be";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-322e-4293-d68a-084822003c40"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '7JwyL8rzFECC90xEZgyYsw.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '455601fc-43a3-42e8-8734-cae7097b43cb',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '64ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0YTTwYQAAAABLYebm1loMRKkQVxm4hzH2S1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:33:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-322e-4293-d68a-084822003c40"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"f01f1300-da09-4e9f-9d44-15c6cf7ba5f3"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '31b3f4f3-5bbb-4e9e-b763-1235ea0b47ef',
  'X-Microsoft-Skype-Chain-ID',
  'afdce944-5c84-4490-8421-e675e3417fcd',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ZTTwYQAAAABtXrQHMcXMR59Ij3v8WDJwS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:33:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/f01f1300-da09-4e9f-9d44-15c6cf7ba5f3/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}}})
  .query(true)
  .reply(202, {"operationId":"8d3f7fbc-662a-4c3a-bf42-bc14368837b8","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'afdce944-5c84-4490-8421-e675e3417fcd',
  'x-ms-client-request-id',
  'f8a1edb7-2450-4e78-9774-d52e0be7b602',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hjTwYQAAAABTmGkvKW2cRK6uPQeMuJtNS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:33:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/f01f1300-da09-4e9f-9d44-15c6cf7ba5f3/participants:mute', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}}})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'afdce944-5c84-4490-8421-e675e3417fcd',
  'x-ms-client-request-id',
  '147711f2-2260-45cf-b0ce-ec7609458fa4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0pjTwYQAAAACnLVy8NheSQbR73ub7W2Z2S1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:34:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/f01f1300-da09-4e9f-9d44-15c6cf7ba5f3/participants:get', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}}})
  .query(true)
  .reply(200, {"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}},"participantId":"4bf3d936-dd07-407a-a4d2-88cb6eb6ff4e","isMuted":true}, [
  'Content-Length',
  '285',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'afdce944-5c84-4490-8421-e675e3417fcd',
  'x-ms-client-request-id',
  '35cb03c8-a69f-445c-b1cc-ed9944a2b64d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vDTwYQAAAACZYbzp5z0aQao0ODAUiV/3S1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:34:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/f01f1300-da09-4e9f-9d44-15c6cf7ba5f3/participants:unmute', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}}})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'afdce944-5c84-4490-8421-e675e3417fcd',
  'x-ms-client-request-id',
  '0db67f59-d740-4267-b5ef-f2c9dfce6830',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zzTwYQAAAACVWxP0M+WPTq4FWH/4YfUwS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:35:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/f01f1300-da09-4e9f-9d44-15c6cf7ba5f3/participants:get', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}}})
  .query(true)
  .reply(200, {"identifier":{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}},"participantId":"4bf3d936-dd07-407a-a4d2-88cb6eb6ff4e","isMuted":false}, [
  'Content-Length',
  '286',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'afdce944-5c84-4490-8421-e675e3417fcd',
  'x-ms-client-request-id',
  'f3aacbbe-4efa-4f8a-a145-4bba16f11b3e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03jTwYQAAAABGWdckiqk+QI2H533B8W6SS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:35:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/f01f1300-da09-4e9f-9d44-15c6cf7ba5f3/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-31de-3672-570c-113a0d00233c"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'afdce944-5c84-4490-8421-e675e3417fcd',
  'x-ms-client-request-id',
  'de3352e6-039f-4a44-a1f6-0c93d98a6c49',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '07TTwYQAAAABiRclUmT0jR7XL3RYnTpJHS1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:35:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/f01f1300-da09-4e9f-9d44-15c6cf7ba5f3/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'afdce944-5c84-4490-8421-e675e3417fcd',
  'x-ms-client-request-id',
  '27d2becd-95c0-44e9-bf4e-8a7d02a42eec',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+zTwYQAAAACYw0/Rxg/jRLICkcyt4kA9S1VMMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 25 Jan 2022 17:35:55 GMT',
  'Content-Length',
  '0'
]);

let nock = require('nock');

module.exports.hash = "11ac49147386d3fc94db14f3b0ab509f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"26201300-710b-458f-a68d-0c51579a3569"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '1bad0e5b-7f92-429a-a87a-334b6778dff8',
  'X-Microsoft-Skype-Chain-ID',
  '5efdba4c-ee46-467c-af57-5c3ce574cace',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/GJoYQAAAAAsNlgem84xS6i37oTlOOYBUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:03:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"26201300-e14c-44a9-82bc-6d67a4aea1e9"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6d5e4fde-aec7-4d1a-a49c-96c912f8ae75',
  'X-Microsoft-Skype-Chain-ID',
  '018eafe5-173e-4b6f-88ea-f1f3a4965422',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/WJoYQAAAAB0m42Y30FiSIQpuPnMQhz9UERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:03:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc"},"startCallRecordingRequest":{"recordingStateCallbackUri":"https://bot.contoso.io/callback"}})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIyNjIwMTMwMC01NWNhLTQ3NzAtOTc5Yy01MzIwNjA1MjkxZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI3ZTg5ZDU0My0yNmY2LTQ4M2YtYTg0MS1kNDkxNTc2MzlkMDMifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'fe698f3e-bb63-41a8-95c8-ac7eafcec5a4',
  'X-Microsoft-Skype-Chain-ID',
  '1643a5d3-6e2f-453c-a036-61a8dc54859c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/2JoYQAAAADNJBP2ohVtR4/bZalZpx/jUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIyNjIwMTMwMC01NWNhLTQ3NzAtOTc5Yy01MzIwNjA1MjkxZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI3ZTg5ZDU0My0yNmY2LTQ4M2YtYTg0MS1kNDkxNTc2MzlkMDMifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '99cfa820-5464-41c2-b467-7c30e91d69e8',
  'x-ms-client-request-id',
  'de699442-f344-4bc5-9a69-86c4bf6396a9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0D2NoYQAAAABRTdPtLg3dRo+JgcQuXW/4UERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIyNjIwMTMwMC01NWNhLTQ3NzAtOTc5Yy01MzIwNjA1MjkxZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI3ZTg5ZDU0My0yNmY2LTQ4M2YtYTg0MS1kNDkxNTc2MzlkMDMifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'd048eb5e-2abb-43c9-a497-b5ae2cd3fc2a',
  'x-ms-client-request-id',
  'd3c251ae-d721-4e26-9ef8-c7cfdad4a3fe',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0D2NoYQAAAACLHwqA2yAqQ7duS83V8gyRUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIyNjIwMTMwMC01NWNhLTQ3NzAtOTc5Yy01MzIwNjA1MjkxZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI3ZTg5ZDU0My0yNmY2LTQ4M2YtYTg0MS1kNDkxNTc2MzlkMDMifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '20cb67df-cd94-4469-80bf-c239e2ba17db',
  'x-ms-client-request-id',
  'f932e6bb-91e9-4fef-93ff-b756988e1bd9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GmNoYQAAAABZ/XDy+Cf+SI5yrGe6IjZrUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIyNjIwMTMwMC01NWNhLTQ3NzAtOTc5Yy01MzIwNjA1MjkxZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI3ZTg5ZDU0My0yNmY2LTQ4M2YtYTg0MS1kNDkxNTc2MzlkMDMifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '46cd1a18-9522-4282-a6d5-3b4b9e0b574b',
  'x-ms-client-request-id',
  '272b295f-88c9-4873-bcf2-ddac8ca2b7f6',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GmNoYQAAAAAjgPhFdohSRrUMmbg2wrCKUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIyNjIwMTMwMC01NWNhLTQ3NzAtOTc5Yy01MzIwNjA1MjkxZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI3ZTg5ZDU0My0yNmY2LTQ4M2YtYTg0MS1kNDkxNTc2MzlkMDMifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '6d6f2b48-6b69-4deb-8340-dcef71a2e4ad',
  'x-ms-client-request-id',
  'ab4d3cd4-7abc-4237-afe6-c84c7a3b98ab',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0JGNoYQAAAAD+unp91bRERrZEV1awtQSdUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIyNjIwMTMwMC01NWNhLTQ3NzAtOTc5Yy01MzIwNjA1MjkxZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI3ZTg5ZDU0My0yNmY2LTQ4M2YtYTg0MS1kNDkxNTc2MzlkMDMifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '611596ac-653b-49f2-88ad-9f93bbfe7e15',
  'x-ms-client-request-id',
  '2fced4f2-dfb1-4920-912c-00478f6c6de7',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0JGNoYQAAAACXrImDuFBQSbmmivta1uZsUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/26201300-710b-458f-a68d-0c51579a3569/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'fad877f0-9ab2-43f5-9dc3-721f1dd0dcc9',
  'x-ms-client-request-id',
  'f2610778-c07a-4236-bedf-b365410796c5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0JWNoYQAAAACETS64mYFHRJrgrbLnoI9SUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/26201300-e14c-44a9-82bc-6d67a4aea1e9/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'c08fad32-a2e0-460b-96fb-3057788d3c31',
  'x-ms-client-request-id',
  'b532beb4-0e38-4417-ab68-46bb8a54e199',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0JWNoYQAAAAAYeK8dhWeIQ4H9U5ujmj8BUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 14 Oct 2021 17:04:36 GMT',
  'Content-Length',
  '0'
]);

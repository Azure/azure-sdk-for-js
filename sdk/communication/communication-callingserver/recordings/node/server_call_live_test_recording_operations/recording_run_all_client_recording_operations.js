let nock = require('nock');

module.exports.hash = "513661600b76db980c986cc78acc7020";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"7b1f1300-fe2d-45e5-87b7-51505c0eb689"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '9949a10c-2e13-476a-8c70-994b39ad6d5b',
  'X-Microsoft-Skype-Chain-ID',
  'f8c21514-34aa-4c3a-a72c-46de160e9f81',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0s7lkYQAAAABsp+absNTXSakXK/7LBjvHUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:24:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"7b1f1300-7c1c-4bac-97a3-33f3d6c0fb49"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '20be6705-a7ed-48db-a662-3672c6420b98',
  'X-Microsoft-Skype-Chain-ID',
  'ac031e13-392c-4193-ba33-6284cfda1abd',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tLlkYQAAAABGgvTcR+ZqRpxWqH16+b6wUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:24:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc"},"startCallRecordingRequest":{"recordingStateCallbackUri":"https://bot.contoso.io/callback"}})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YjFmMTMwMC03N2YzLTRiNjUtOTFjNy1mYWQxNzQ2N2Y5ODciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJlYzNiYjQ0MC0xY2Q2LTRlMTgtYjk3OC0yNjgyMmVkMDZmNTIifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '49fde52d-caa2-4faf-bc4e-c5703f86fd2b',
  'X-Microsoft-Skype-Chain-ID',
  '85734620-d490-405c-9aca-932ab04b1b74',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tblkYQAAAADz4tf4iY5UTqX82vmp9DGbUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:24:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YjFmMTMwMC03N2YzLTRiNjUtOTFjNy1mYWQxNzQ2N2Y5ODciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJlYzNiYjQ0MC0xY2Q2LTRlMTgtYjk3OC0yNjgyMmVkMDZmNTIifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'eb188460-9819-4eb9-b09b-0e578fa6d9eb',
  'x-ms-client-request-id',
  '5bad848a-610c-4520-a963-de5923c52503',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wrlkYQAAAABtmyEZhncaQ5LqjY4T3x7kUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:25:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YjFmMTMwMC03N2YzLTRiNjUtOTFjNy1mYWQxNzQ2N2Y5ODciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJlYzNiYjQ0MC0xY2Q2LTRlMTgtYjk3OC0yNjgyMmVkMDZmNTIifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '292bebf7-fb4e-4741-b2ea-c653898eb52a',
  'x-ms-client-request-id',
  'd5b39a6b-6ba8-4647-a6e7-cdc66a55be0a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wrlkYQAAAAA093ABHWKyRI9KvRYg7SHPUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:25:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YjFmMTMwMC03N2YzLTRiNjUtOTFjNy1mYWQxNzQ2N2Y5ODciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJlYzNiYjQ0MC0xY2Q2LTRlMTgtYjk3OC0yNjgyMmVkMDZmNTIifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '259143fb-57b6-431d-897a-05c1a90f6ed6',
  'x-ms-client-request-id',
  '4c738a11-ffab-4be8-9aaa-8988a59f0ec9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zblkYQAAAACqjuhvfeVJRpT6lJ4uSEcAUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:25:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YjFmMTMwMC03N2YzLTRiNjUtOTFjNy1mYWQxNzQ2N2Y5ODciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJlYzNiYjQ0MC0xY2Q2LTRlMTgtYjk3OC0yNjgyMmVkMDZmNTIifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'e93da8c6-cf11-4e54-907b-b74e24e168db',
  'x-ms-client-request-id',
  '34346bfb-8f67-4aee-a815-645b6966a5b8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zblkYQAAAABPPHfpyrElR53B4jUTMuzJUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:25:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YjFmMTMwMC03N2YzLTRiNjUtOTFjNy1mYWQxNzQ2N2Y5ODciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJlYzNiYjQ0MC0xY2Q2LTRlMTgtYjk3OC0yNjgyMmVkMDZmNTIifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '3186bd0f-a2a0-48d1-8051-f0db857205bb',
  'x-ms-client-request-id',
  '3c05851a-759f-41d2-93f8-c93ce452c8f1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '017lkYQAAAACvgYqipKtoSqmpPUlsrCSdUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:25:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YjFmMTMwMC03N2YzLTRiNjUtOTFjNy1mYWQxNzQ2N2Y5ODciLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJlYzNiYjQ0MC0xY2Q2LTRlMTgtYjk3OC0yNjgyMmVkMDZmNTIifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'a713dfda-e94c-47fe-9d86-9b889694fb9f',
  'x-ms-client-request-id',
  'c0733361-94e0-46cc-b3fb-654c014104c6',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '017lkYQAAAADDBL91aJDHRrockDGxHbzxUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:25:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/7b1f1300-fe2d-45e5-87b7-51505c0eb689/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '468b712a-f463-44ce-8aa3-90554e18a05d',
  'x-ms-client-request-id',
  '871c32e3-e019-41db-a837-2e38f99c54da',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '017lkYQAAAACVnkwFrZHsSreyNz4wgSiaUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:25:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/7b1f1300-7c1c-4bac-97a3-33f3d6c0fb49/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'f0664b30-98a4-497e-91ab-72f4d0f4403d',
  'x-ms-client-request-id',
  'bd29d244-e725-4493-a59c-7352c3bede9d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '017lkYQAAAADCBQJaidEQSJgmQDd4E2ZiUERYMzFFREdFMDIwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 22:25:27 GMT',
  'Content-Length',
  '0'
]);

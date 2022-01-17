let nock = require('nock');

module.exports.hash = "605b089970efc63a144b14f3e635c7f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"recordingStateCallbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI1ZDFmMTMwMC1iZTMwLTQxM2EtOWRiYy1lYjlmZDhmYjdjZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI4MjcyNzFiMi02MGU0LTRiY2YtODAwMC0yNDAyNTlkYTdjMjMifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '674c21a9-8d66-4ad4-a813-31294ba98749',
  'X-Microsoft-Skype-Chain-ID',
  '02191eed-5b94-4393-9047-a8aa03f61e4c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0W5LlYQAAAACrL15s5s8HSo4gPV9/9L3cREVMMDFFREdFMDQxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 15:59:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI1ZDFmMTMwMC1iZTMwLTQxM2EtOWRiYy1lYjlmZDhmYjdjZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI4MjcyNzFiMi02MGU0LTRiY2YtODAwMC0yNDAyNTlkYTdjMjMifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '02191eed-5b94-4393-9047-a8aa03f61e4c',
  'x-ms-client-request-id',
  '7df2e1d7-d5ef-4bbb-a734-208fa1f3d513',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bJLlYQAAAABG6nS6R355RY8NfUFP5t/BREVMMDFFREdFMDQxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 15:59:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI1ZDFmMTMwMC1iZTMwLTQxM2EtOWRiYy1lYjlmZDhmYjdjZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI4MjcyNzFiMi02MGU0LTRiY2YtODAwMC0yNDAyNTlkYTdjMjMifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '02191eed-5b94-4393-9047-a8aa03f61e4c',
  'x-ms-client-request-id',
  '38505dc9-05f9-4c15-bb27-d7f014099391',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0b5LlYQAAAACETWrMerYST4LnMiBhE19SREVMMDFFREdFMDQxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 15:59:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI1ZDFmMTMwMC1iZTMwLTQxM2EtOWRiYy1lYjlmZDhmYjdjZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI4MjcyNzFiMi02MGU0LTRiY2YtODAwMC0yNDAyNTlkYTdjMjMifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '02191eed-5b94-4393-9047-a8aa03f61e4c',
  'x-ms-client-request-id',
  'e06f3f9b-5ced-4657-89cf-5bd5e87348ee',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0c5LlYQAAAACYtrqmSp5aRa5NO0D/flMpREVMMDFFREdFMDQxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 15:59:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI1ZDFmMTMwMC1iZTMwLTQxM2EtOWRiYy1lYjlmZDhmYjdjZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI4MjcyNzFiMi02MGU0LTRiY2YtODAwMC0yNDAyNTlkYTdjMjMifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '02191eed-5b94-4393-9047-a8aa03f61e4c',
  'x-ms-client-request-id',
  '40e18505-e709-4ff4-b073-b819236f86fa',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0dZLlYQAAAACvP9FEsymBQ4LQMdyjDXOlREVMMDFFREdFMDQxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 15:59:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI1ZDFmMTMwMC1iZTMwLTQxM2EtOWRiYy1lYjlmZDhmYjdjZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI4MjcyNzFiMi02MGU0LTRiY2YtODAwMC0yNDAyNTlkYTdjMjMifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '02191eed-5b94-4393-9047-a8aa03f61e4c',
  'x-ms-client-request-id',
  'beae07f0-fb05-480c-8c89-e66411233790',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0eZLlYQAAAABN1zR3+h5cSa2ITXkmwQ/MREVMMDFFREdFMDQxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 15:59:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI1ZDFmMTMwMC1iZTMwLTQxM2EtOWRiYy1lYjlmZDhmYjdjZDkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiI4MjcyNzFiMi02MGU0LTRiY2YtODAwMC0yNDAyNTlkYTdjMjMifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '02191eed-5b94-4393-9047-a8aa03f61e4c',
  'x-ms-client-request-id',
  '99e838cb-2b60-43b3-a022-d6eecaaf3637',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fZLlYQAAAAC/4W8EhYiNQblPg/bbomuNREVMMDFFREdFMDQxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 17 Jan 2022 15:59:57 GMT',
  'Content-Length',
  '0'
]);

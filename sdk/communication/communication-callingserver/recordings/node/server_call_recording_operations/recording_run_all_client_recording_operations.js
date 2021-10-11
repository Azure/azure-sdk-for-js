let nock = require('nock');

module.exports.hash = "f1eb51f79ab90927d4dcf0dcf79bfb35";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"9d201300-0f8a-4179-97c0-ec69e3dd4cd1"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '2b27431c-f1b5-4e77-a14a-80248a5d0a89',
  'X-Microsoft-Skype-Chain-ID',
  'ce82dacb-7283-4fd3-9017-d666225616f8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0s7BkYQAAAADRjp9v2+UkQak3AL+mvBZeUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:46:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"9d201300-0c36-4bbc-a8c5-b6af418987c1"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'a698e281-ce94-4afc-9cfc-3cd2d8b3e3fe',
  'X-Microsoft-Skype-Chain-ID',
  '6f2ad767-eed8-4082-8bb1-4c7d489d24c4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tLBkYQAAAAC6GqCZE9NgS5+V0XO2f8fbUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:46:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc"},"startCallRecordingRequest":{"recordingStateCallbackUri":"https://bot.contoso.io/callback"}})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI5ZDIwMTMwMC0zMGFmLTRlOWQtODFhZC1hMGIwMWQzYTNjYjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiODI1NDExOS05ZGJlLTQ2ZTktYmRkMi00ZGQ1YjFiYTRjNzcifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'bb3737c1-da7b-42e5-8ad6-31a302ef6c0f',
  'X-Microsoft-Skype-Chain-ID',
  '2c2cddea-32fe-44d6-95a3-ba736b796fb2',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tLBkYQAAAACgNKNacUs/Rb6OKtsPhijgUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:46:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI5ZDIwMTMwMC0zMGFmLTRlOWQtODFhZC1hMGIwMWQzYTNjYjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiODI1NDExOS05ZGJlLTQ2ZTktYmRkMi00ZGQ1YjFiYTRjNzcifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '601b57b0-47d9-4e2e-b985-ad7c4706ff67',
  'x-ms-client-request-id',
  '3bdd6631-7874-4a40-bcbb-cd11cd0dfabd',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wbBkYQAAAAAWL8JNRG+kSY2OiQDZME5PUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:46:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI5ZDIwMTMwMC0zMGFmLTRlOWQtODFhZC1hMGIwMWQzYTNjYjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiODI1NDExOS05ZGJlLTQ2ZTktYmRkMi00ZGQ1YjFiYTRjNzcifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '8082cb91-2a35-4792-9f92-6ed18b592dd4',
  'x-ms-client-request-id',
  'ccdde3b9-bf12-4c1f-a3ef-68d1d689463e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wbBkYQAAAACUG8HagK6NS6wh1vZV9dbxUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:46:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI5ZDIwMTMwMC0zMGFmLTRlOWQtODFhZC1hMGIwMWQzYTNjYjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiODI1NDExOS05ZGJlLTQ2ZTktYmRkMi00ZGQ1YjFiYTRjNzcifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '9736b87e-6cd2-4de6-8121-283a8d5cec70',
  'x-ms-client-request-id',
  '2626830c-5a62-4819-89d5-99d78b2fdb99',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zLBkYQAAAAApp2qFy1XpQ6O9TvruT8V7UERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:46:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI5ZDIwMTMwMC0zMGFmLTRlOWQtODFhZC1hMGIwMWQzYTNjYjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiODI1NDExOS05ZGJlLTQ2ZTktYmRkMi00ZGQ1YjFiYTRjNzcifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '94c1f819-cacc-4ca6-b510-74c404212fd8',
  'x-ms-client-request-id',
  'c8fb1b24-0c0b-400a-86e8-b2a770dfb8c8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zLBkYQAAAACqepI4ZcDNS60IYwiks+s2UERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:46:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI5ZDIwMTMwMC0zMGFmLTRlOWQtODFhZC1hMGIwMWQzYTNjYjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiODI1NDExOS05ZGJlLTQ2ZTktYmRkMi00ZGQ1YjFiYTRjNzcifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '9d606598-20e3-4f26-b671-4748049a7ff5',
  'x-ms-client-request-id',
  'd9c2e418-5e8b-4fd4-a3ad-23c6c43441b5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01rBkYQAAAAC81ahkanDsQqwtCk5wIW5kUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:47:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI5ZDIwMTMwMC0zMGFmLTRlOWQtODFhZC1hMGIwMWQzYTNjYjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiODI1NDExOS05ZGJlLTQ2ZTktYmRkMi00ZGQ1YjFiYTRjNzcifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '89fe0e82-44ed-4578-9ac9-b686cfdf97db',
  'x-ms-client-request-id',
  '7792d66f-780a-46b4-b4b5-417ce89f70a0',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01rBkYQAAAAC6eXfcchYYRqIbh3yKzxOTUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:47:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/9d201300-0f8a-4179-97c0-ec69e3dd4cd1/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '93508eab-ff09-47e3-a0f4-90e96f4cd2f1',
  'x-ms-client-request-id',
  '7cb4b712-35a3-4a71-9562-06471f382ca3',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '017BkYQAAAAAmDUDwy518SaUM1j0I/raqUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:47:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/9d201300-0c36-4bbc-a8c5-b6af418987c1/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'a9742a66-8229-4ef6-917b-086bc1ce28d9',
  'x-ms-client-request-id',
  'f75f221a-ae25-4c8a-903b-ff74e8339caa',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '017BkYQAAAAAFCbgzYXlWS5p5LnrCWDYjUERYMzFFREdFMDIwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 11 Oct 2021 21:47:03 GMT',
  'Content-Length',
  '0'
]);

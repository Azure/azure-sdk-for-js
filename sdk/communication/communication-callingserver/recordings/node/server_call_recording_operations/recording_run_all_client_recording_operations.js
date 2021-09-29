let nock = require('nock');

module.exports.hash = "c49dd3588bc1db1fa4d2c25ffdc15032";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/:join', {"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"00000480-eae9-44d3-9c90-7f3c30d84f67"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'cdc6828b-f731-432e-afb6-78cce5fe7d3d',
  'X-Microsoft-Skype-Chain-ID',
  '1627b9de-7819-400a-8502-c4ea2bb20292',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0mfRUYQAAAAA7gdYORsiiQKvSawoLAPUhUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:19:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/:join', {"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"00000480-c188-44ab-8d5f-3772b8bac273"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6af95fab-042d-49aa-89e3-5eac279cb314',
  'X-Microsoft-Skype-Chain-ID',
  '7e7693dc-61ee-435c-b8d3-edec5308d116',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0mvRUYQAAAAASMIjGRENnTKZULSoEd48tUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:19:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings', {"recordingStateCallbackUri":"https://bot.contoso.io/callback"})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMDQ4MC1lMTM5LTQyODMtYTNlMC1jNDE0MjNmNzUzYjMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiNmQyOTVlOC1lYWY5LTQ2ZjctODFiZi1mY2NmYTFkODYzZmQifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'c85dc5be-bbb8-48a5-9901-f71f825aa084',
  'X-Microsoft-Skype-Chain-ID',
  '36ff4623-4966-4e26-8194-5f2428921546',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0m/RUYQAAAACNvjZwsiyGS6HpsQn99aWOUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:19:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMDQ4MC1lMTM5LTQyODMtYTNlMC1jNDE0MjNmNzUzYjMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiNmQyOTVlOC1lYWY5LTQ2ZjctODFiZi1mY2NmYTFkODYzZmQifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '6d12dd00-067a-484a-9168-f79d25332821',
  'x-ms-client-request-id',
  'c7272c39-2ffe-4a70-982d-0af1d19e4ebe',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0qfRUYQAAAABaST5Xov+0R7OC7hzRewmfUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:20:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMDQ4MC1lMTM5LTQyODMtYTNlMC1jNDE0MjNmNzUzYjMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiNmQyOTVlOC1lYWY5LTQ2ZjctODFiZi1mY2NmYTFkODYzZmQifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '6eaeadef-08a1-4f01-8a0f-204b584dac62',
  'x-ms-client-request-id',
  '4dcc82a1-2082-4dcf-a313-f4e9f3a49147',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0qfRUYQAAAAD1TkYvebImQLox8Z/ppC/zUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:20:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMDQ4MC1lMTM5LTQyODMtYTNlMC1jNDE0MjNmNzUzYjMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiNmQyOTVlOC1lYWY5LTQ2ZjctODFiZi1mY2NmYTFkODYzZmQifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'afac1d34-f2e8-4f6a-a2c9-8abc72df4723',
  'x-ms-client-request-id',
  '7bff88bd-27b4-4e82-a70b-39caf8acc8d1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tPRUYQAAAADvjZYJyfLTRpell7coKxdVUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:20:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMDQ4MC1lMTM5LTQyODMtYTNlMC1jNDE0MjNmNzUzYjMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiNmQyOTVlOC1lYWY5LTQ2ZjctODFiZi1mY2NmYTFkODYzZmQifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'c74ab212-32d3-429c-a80f-4c9f5f25aef9',
  'x-ms-client-request-id',
  'e3d4d246-c5cd-41c1-9ca0-93c0fc1292bc',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0tPRUYQAAAABBr6LI7iyWR7IYZJb330TLUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:20:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMDQ4MC1lMTM5LTQyODMtYTNlMC1jNDE0MjNmNzUzYjMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiNmQyOTVlOC1lYWY5LTQ2ZjctODFiZi1mY2NmYTFkODYzZmQifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '2aa4681d-7236-47d6-b1c0-6e6314820663',
  'x-ms-client-request-id',
  '1dd8d87c-6a45-466a-8246-6a635fcbbcf8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vvRUYQAAAAB+TdfqWUP5SbLs1b/chum6UERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:20:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMDQ4MC1lMTM5LTQyODMtYTNlMC1jNDE0MjNmNzUzYjMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiNmQyOTVlOC1lYWY5LTQ2ZjctODFiZi1mY2NmYTFkODYzZmQifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '1831960b-bb39-42f9-aa95-4768cf7f4b47',
  'x-ms-client-request-id',
  'bc15a2fd-a6a2-4fdd-b708-7d8c3515624e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vvRUYQAAAACyqESuggnuQYHx0kTSSaJnUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:20:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMDQ4MC1lMTM5LTQyODMtYTNlMC1jNDE0MjNmNzUzYjMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJiNmQyOTVlOC1lYWY5LTQ2ZjctODFiZi1mY2NmYTFkODYzZmQifQ')
  .query(true)
  .reply(404, {"error":{"code":"8522","message":"Recording not found."}}, [
  'Content-Length',
  '58',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '0a6bc5da-76f0-418e-b3bc-fe8b033c15b3',
  'x-ms-client-request-id',
  '5718bed2-505d-4a18-8d1c-78cd93c91156',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0v/RUYQAAAAAAMSO/FGV8T79gOlB+WXWBUERYMzFFREdFMDIxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 29 Sep 2021 23:20:31 GMT'
]);

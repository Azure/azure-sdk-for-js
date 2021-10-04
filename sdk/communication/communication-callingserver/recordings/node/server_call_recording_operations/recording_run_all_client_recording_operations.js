let nock = require('nock');

module.exports.hash = "710a8384805dd9d5d558f8979ef8882a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000c-ec34-3813-28f7-234822000424"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'aKUVHsUv5kKpbPxZRSRnIw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'ad391098-035e-4104-be90-bcce856b2e42',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '115ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09DdbYQAAAACaBUFaf1L7Q7kUKp41ptGeV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:20:52 GMT'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000c-ec34-391d-28f7-234822000425"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '3VBrwmVJeUmf9bR8cjKPQg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '5bf25d41-e955-4657-9309-becbca6b61b8',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '95ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09DdbYQAAAAAJAZxcwoNRQINdx7UuGeYSV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:20:52 GMT'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/:join', {"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000c-ec34-3813-28f7-234822000424"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"7a1f6800-9087-44a3-a06a-fd59f86409bb"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'adda5ce3-6b2c-49ab-9817-cc3c5b32c0ad',
  'X-Microsoft-Skype-Chain-ID',
  'b72e34a0-9d93-4097-9bbb-86aba77f46eb',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09TdbYQAAAAAvqo1gYMy0QZCOhGUtSBMVV1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:20:52 GMT'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/:join', {"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000c-ec34-391d-28f7-234822000425"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"7a1f6800-02fa-4b9e-9222-7628b0163dc9"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'e4c18e23-5e3b-4111-9c3d-60f28b36d6f1',
  'X-Microsoft-Skype-Chain-ID',
  '5ec18594-ab0c-4223-ac6d-f4e05b949aaf',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09TdbYQAAAABbw1e42nWkSqgC/WWmBKZjV1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:20:53 GMT'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings', {"recordingStateCallbackUri":"https://bot.contoso.io/callback"})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YTFmNjgwMC0xN2U0LTQwZDMtOTgxNi0wNGRhYWZjNDM5ZjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxMjdkM2Y0Mi0zYjNhLTQwMWMtODYxOC04OGI2ZDZhZDQ4MzQifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '6b372ce3-8456-49fa-a774-ce65765b3584',
  'X-Microsoft-Skype-Chain-ID',
  '9741cc9a-38ee-45c3-864e-1b616e0107e9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '09jdbYQAAAAACKZfbGkM1RLLqvqM9IMMaV1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:20:56 GMT'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YTFmNjgwMC0xN2U0LTQwZDMtOTgxNi0wNGRhYWZjNDM5ZjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxMjdkM2Y0Mi0zYjNhLTQwMWMtODYxOC04OGI2ZDZhZDQ4MzQifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '29e0a03c-1d67-4e1c-857c-4934174991a4',
  'x-ms-client-request-id',
  'af729f66-a6c9-466d-bfaa-f75143c6e940',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0AzhbYQAAAACPY1lVOV0BSqC8ehyxJh76V1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:21:06 GMT'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YTFmNjgwMC0xN2U0LTQwZDMtOTgxNi0wNGRhYWZjNDM5ZjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxMjdkM2Y0Mi0zYjNhLTQwMWMtODYxOC04OGI2ZDZhZDQ4MzQifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '8a054c94-da02-4b30-b491-9aa5bc14c0a6',
  'x-ms-client-request-id',
  '68d54b24-c577-4c4f-890f-d8aa00949267',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0AzhbYQAAAAA/14EJMJEpR4EhkDsjG9IzV1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:21:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YTFmNjgwMC0xN2U0LTQwZDMtOTgxNi0wNGRhYWZjNDM5ZjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxMjdkM2Y0Mi0zYjNhLTQwMWMtODYxOC04OGI2ZDZhZDQ4MzQifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'f0e8d0bc-8690-4d09-ba3e-f18b986e3d79',
  'x-ms-client-request-id',
  '5fa9170f-0858-4612-bf73-98236d0ea1f7',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DThbYQAAAACJWh1Np6AcQ6KQiLi2tyicV1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:21:17 GMT'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .post('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YTFmNjgwMC0xN2U0LTQwZDMtOTgxNi0wNGRhYWZjNDM5ZjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxMjdkM2Y0Mi0zYjNhLTQwMWMtODYxOC04OGI2ZDZhZDQ4MzQifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '358a710d-6b68-40bd-84aa-3b56ce6f9097',
  'x-ms-client-request-id',
  '62f8c0e8-ce77-4828-a465-f35bcacf7476',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DThbYQAAAABPp0FsqNVHQYLmid00+cuHV1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:21:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YTFmNjgwMC0xN2U0LTQwZDMtOTgxNi0wNGRhYWZjNDM5ZjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxMjdkM2Y0Mi0zYjNhLTQwMWMtODYxOC04OGI2ZDZhZDQ4MzQifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'e558ae73-cf5d-4ffb-80a9-d91b29145631',
  'x-ms-client-request-id',
  '6705dfc3-ab64-45ed-8192-72766ba8782e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GDhbYQAAAAAQ2zLL4cdUQaTTe6z0UuN5V1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:21:27 GMT'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .delete('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YTFmNjgwMC0xN2U0LTQwZDMtOTgxNi0wNGRhYWZjNDM5ZjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxMjdkM2Y0Mi0zYjNhLTQwMWMtODYxOC04OGI2ZDZhZDQ4MzQifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'a7eb22f3-d1f3-4886-ac6a-cd6604f324ca',
  'x-ms-client-request-id',
  'bacd4c8d-27d1-4f73-b8f0-9e2b54dca209',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GDhbYQAAAABsVt/4CNQPRpxtyThetowzV1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:21:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://acstestbot1.communication.azure.com:443', {"encodedQueryParams":true})
  .delete('/calling/serverCalls/31fccfc0-d804-5e92-9d9e-900b7b3eb6cc/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiI3YTFmNjgwMC0xN2U0LTQwZDMtOTgxNi0wNGRhYWZjNDM5ZjkiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxMjdkM2Y0Mi0zYjNhLTQwMWMtODYxOC04OGI2ZDZhZDQ4MzQifQ')
  .query(true)
  .reply(404, {"error":{"code":"8522","message":"Recording not found."}}, [
  'Content-Length',
  '58',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '07bb7993-19ad-4357-b083-dfc847c30dbb',
  'x-ms-client-request-id',
  'cc166c69-7901-4980-af64-22ffd6cd2341',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GDhbYQAAAABy+gPj/USWSb1uPXhpaOkZV1NURURHRTA4MTEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 04 Oct 2021 17:21:27 GMT'
]);

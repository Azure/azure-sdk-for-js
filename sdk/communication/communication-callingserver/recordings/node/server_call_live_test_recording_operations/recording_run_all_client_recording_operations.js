let nock = require('nock');

module.exports.hash = "11ac49147386d3fc94db14f3b0ab509f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"18201300-1d89-4624-af66-1d9ae49d41ed"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '8d880e17-5cb4-45e2-836a-32b0203148d6',
  'X-Microsoft-Skype-Chain-ID',
  '82457443-f4e6-4368-9a45-e3eee72ea886',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0X5SBYQAAAADg09vsqEupQrlQqHKWEslSV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"18201300-b646-49dd-911a-70303cc6df27"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '42a5e342-2559-4049-ada5-006773fdeca3',
  'X-Microsoft-Skype-Chain-ID',
  'a6905978-1ce6-41bb-a468-e249b3e7ca3c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0YZSBYQAAAABDtHpEOQylTbuPq08cVhGJV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings', {"callLocator":{"groupCallId":"31fccfc0-d804-5e92-9d9e-900b7b3eb6cc","kind":"groupCallLocator"},"recordingStateCallbackUri":"https://endpoint/callback"})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIxODIwMTMwMC0yMTdlLTRmYTAtOWYzMC01MjFlYWQxZGZkNjEiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJjZDcxM2Q1YS05ZDcxLTQ5NDUtYjkwYS03OGJlYTY1MTBhNDQifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '33d12f20-3e31-47a7-8b0f-573237971133',
  'X-Microsoft-Skype-Chain-ID',
  '612a0231-72f9-4a33-ab75-d343c8596736',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0YpSBYQAAAADKcR/ZsivLTqND8TwV64s7V1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIxODIwMTMwMC0yMTdlLTRmYTAtOWYzMC01MjFlYWQxZGZkNjEiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJjZDcxM2Q1YS05ZDcxLTQ5NDUtYjkwYS03OGJlYTY1MTBhNDQifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '04ea09da-f574-46fd-b1c8-fd8969f40ba9',
  'x-ms-client-request-id',
  '79307aa7-0f59-4aa3-afd7-d35ca5094c2e',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0cJSBYQAAAAD2+h4wTQggQpPnN5G1q8rlV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIxODIwMTMwMC0yMTdlLTRmYTAtOWYzMC01MjFlYWQxZGZkNjEiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJjZDcxM2Q1YS05ZDcxLTQ5NDUtYjkwYS03OGJlYTY1MTBhNDQifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '8a51e4bd-ad06-48e5-818a-125e4877ea27',
  'x-ms-client-request-id',
  'ae80d139-d7dd-4ef7-88fb-446a2ebd8d21',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0cZSBYQAAAAAOJbNz/cULTLNuI2N/5qdiV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:36 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIxODIwMTMwMC0yMTdlLTRmYTAtOWYzMC01MjFlYWQxZGZkNjEiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJjZDcxM2Q1YS05ZDcxLTQ5NDUtYjkwYS03OGJlYTY1MTBhNDQifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '3c73e3dc-2074-4d44-abf4-eae49675a31f',
  'x-ms-client-request-id',
  'a40c513b-5f62-4d39-81a0-ef8721726bfb',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0e5SBYQAAAAC+8xDF0pZaTLcT4hX/ofYOV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIxODIwMTMwMC0yMTdlLTRmYTAtOWYzMC01MjFlYWQxZGZkNjEiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJjZDcxM2Q1YS05ZDcxLTQ5NDUtYjkwYS03OGJlYTY1MTBhNDQifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'b206a1d8-558c-4a8e-bfca-46c68b1e59df',
  'x-ms-client-request-id',
  'df4eb977-3821-4813-9120-78f3ed0b6151',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0e5SBYQAAAAArDV9XJpgeQ6ApYl62sstiV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:47 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIxODIwMTMwMC0yMTdlLTRmYTAtOWYzMC01MjFlYWQxZGZkNjEiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJjZDcxM2Q1YS05ZDcxLTQ5NDUtYjkwYS03OGJlYTY1MTBhNDQifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '95029a1c-bffc-4247-8a5d-5e62ee954d97',
  'x-ms-client-request-id',
  '3bc2c036-29e6-408d-9424-27e77e9bbe4f',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hZSBYQAAAAAOKAxpNrkMSIDeECT4rwwjV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIxODIwMTMwMC0yMTdlLTRmYTAtOWYzMC01MjFlYWQxZGZkNjEiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiJjZDcxM2Q1YS05ZDcxLTQ5NDUtYjkwYS03OGJlYTY1MTBhNDQifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'ac6efd75-32cd-45a1-b1ce-00ee529f714a',
  'x-ms-client-request-id',
  '89455cf2-255d-4dfc-b7df-9d4b327f7b44',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hZSBYQAAAAA0x1cYZzPYQJ0QLZamvhdVV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/18201300-1d89-4624-af66-1d9ae49d41ed/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '31306d71-62a9-48c3-893a-3fdcd7d0e7dc',
  'x-ms-client-request-id',
  '1e2f6ea0-e05b-4fe3-b39e-b0de4ea29d6c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hpSBYQAAAADFC3/yN4iVT5JecI4EyBVRV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:57 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/18201300-b646-49dd-911a-70303cc6df27/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '465dcafc-0832-4baa-a080-7d52e1933617',
  'x-ms-client-request-id',
  'd850299e-7e51-4ffa-8da0-c3f1f4c279e1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0hpSBYQAAAABnEtJER0Y+Q7WPei0UMNNMV1NURURHRTA4MDkAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 02 Nov 2021 19:41:57 GMT',
  'Content-Length',
  '0'
]);

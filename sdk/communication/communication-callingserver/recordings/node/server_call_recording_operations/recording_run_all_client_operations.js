let nock = require('nock');

module.exports.hash = "18e72bc7778a60574921747a842d464a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000c-ce99-a1a7-6c4e-094822000210"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '1/6EeV2WqEmV5g0aEDq9lw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'b50318c4-f702-420b-a542-b5cdb3060bb0',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '47ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01qNTYQAAAADKuKZYIOreRY3YotBtVPcaUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000c-ce99-a1e9-6c4e-094822000211"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'KbO5woYuj0id2J2caiU2sg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '4a379c29-cf28-43ed-b5d0-9983464997d4',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview',
  'X-Processing-Time',
  '29ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01qNTYQAAAAANjMzHFQhDQZ0T5dkFed7XUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/:join', {"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000c-ce99-a1e9-6c4e-094822000211"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"00000b80-b8fd-4c98-b451-5565cadde133"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'f805a25c-d8c4-4408-8416-5b41cdb3be2e',
  'X-Microsoft-Skype-Chain-ID',
  'c1626550-476d-421c-af99-12639227266c',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01qNTYQAAAADFBpZfUvmDQanrNf/o94euUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/:join', {"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000c-ce99-a1a7-6c4e-094822000210"}},"callbackUri":"https://bot.contoso.io/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"00000b80-3604-4e65-95c1-0f6feb102521"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '859b642a-107f-4f5e-bb54-599d0a9d61f1',
  'X-Microsoft-Skype-Chain-ID',
  '040b4221-72b3-473b-b7ed-f699ad3c0f9d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '016NTYQAAAADQPqfOcBO9RY7QH8cxqL77UERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/recordings', {"recordingStateCallbackUri":"https://bot.contoso.io/callback"})
  .query(true)
  .reply(200, {"recordingId":"eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMGI4MC0xMDZhLTQ4MjUtOGMzYy1lZTZmMGQ3NzYwODMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxNmVlMDUxNy1lZTE0LTQwODEtOWQ2Yy1mNjI2YTNiYzg2ZjMifQ"}, [
  'Content-Length',
  '180',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '062dcc5f-b8a2-41cd-a09c-2e71e7e1a197',
  'X-Microsoft-Skype-Chain-ID',
  'd076444e-d76e-4421-ae8c-5533071c3271',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '016NTYQAAAABVhVt2zHIbSqwOAa5p/aiSUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMGI4MC0xMDZhLTQ4MjUtOGMzYy1lZTZmMGQ3NzYwODMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxNmVlMDUxNy1lZTE0LTQwODEtOWQ2Yy1mNjI2YTNiYzg2ZjMifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '7998acc3-2406-4e4d-a2fd-ed5e949b4ace',
  'x-ms-client-request-id',
  '0ea820a2-1af6-441c-bf32-51bcb7cb023d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05aNTYQAAAACbNZvYMZ6qT7jBPy0QFEVmUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMGI4MC0xMDZhLTQ4MjUtOGMzYy1lZTZmMGQ3NzYwODMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxNmVlMDUxNy1lZTE0LTQwODEtOWQ2Yy1mNjI2YTNiYzg2ZjMifQ/:pause')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '561dd5b7-f2f1-4524-890e-a7a420931707',
  'x-ms-client-request-id',
  '2f1a680c-4547-4f22-9a25-4653689b583b',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05aNTYQAAAABsfAvPTIUYSrHOU+EOrozFUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMGI4MC0xMDZhLTQ4MjUtOGMzYy1lZTZmMGQ3NzYwODMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxNmVlMDUxNy1lZTE0LTQwODEtOWQ2Yy1mNjI2YTNiYzg2ZjMifQ')
  .query(true)
  .reply(200, {"recordingState":"inactive"}, [
  'Content-Length',
  '29',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'ae3fb0a6-fd9d-424d-b289-e295b2177bff',
  'x-ms-client-request-id',
  'd0b02f98-5f42-448d-921c-fd1b0847db3a',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '08KNTYQAAAADQi6TO4u0CR60BK6PH6mbhUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMGI4MC0xMDZhLTQ4MjUtOGMzYy1lZTZmMGQ3NzYwODMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxNmVlMDUxNy1lZTE0LTQwODEtOWQ2Yy1mNjI2YTNiYzg2ZjMifQ/:resume')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'ae0e74fc-3f4d-4bf4-8ff1-1b781c8c20c7',
  'x-ms-client-request-id',
  '34059507-1c93-483e-bf24-dfdfcc27e2f5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '08KNTYQAAAAAg+rl3ecFpSZKKiiuaAfaWUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMGI4MC0xMDZhLTQ4MjUtOGMzYy1lZTZmMGQ3NzYwODMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxNmVlMDUxNy1lZTE0LTQwODEtOWQ2Yy1mNjI2YTNiYzg2ZjMifQ')
  .query(true)
  .reply(200, {"recordingState":"active"}, [
  'Content-Length',
  '27',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'e49db353-fbdc-41fe-899c-140da369ba65',
  'x-ms-client-request-id',
  '28328873-a71d-40c9-8fd2-e75a278f1417',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+qNTYQAAAACIoHvWUD4PT62WUTUKqAnaUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/serverCalls/dcaa70b7-372d-42d2-b20d-0cddae2548f2/recordings/eyJQbGF0Zm9ybUVuZHBvaW50SWQiOiIwMDAwMGI4MC0xMDZhLTQ4MjUtOGMzYy1lZTZmMGQ3NzYwODMiLCJSZXNvdXJjZVNwZWNpZmljSWQiOiIxNmVlMDUxNy1lZTE0LTQwODEtOWQ2Yy1mNjI2YTNiYzg2ZjMifQ')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  '3e4b2b2b-eb54-4534-b5de-b545d07ab3ad',
  'x-ms-client-request-id',
  '95b9b7e7-4ab0-45da-849a-8e6519ca3bf4',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+qNTYQAAAADRp174JTtCTbaFaB1I7+7pUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/00000b80-b8fd-4c98-b451-5565cadde133/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'fac4306a-bf8f-4903-b846-ad55667c9bd3',
  'x-ms-client-request-id',
  '36f7582a-9451-486d-8bd6-e36e1375b699',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+6NTYQAAAAA3dYhUk0bvTLa6NHM3P/ESUERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/00000b80-3604-4e65-95c1-0f6feb102521/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'd06779f7-c7f6-46ff-94b5-a6e93b757113',
  'x-ms-client-request-id',
  'c988832d-ffef-4427-af78-385ef13d80e3',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+6NTYQAAAABvGOBryuuYTJMspifEUgg+UERYMzFFREdFMDIyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 28 Sep 2021 23:23:39 GMT',
  'Content-Length',
  '0'
]);

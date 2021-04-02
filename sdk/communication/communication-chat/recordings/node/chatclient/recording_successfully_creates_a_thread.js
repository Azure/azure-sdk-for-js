let nock = require('nock');

module.exports.hash = "d1eddafa7cd3950c0aef9f6678bb0ddd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ck6wqAzwNE2kDhJOeuZxgQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'f8863746-16d8-4d7a-94ba-65e2965feeb3',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '18ms',
  'X-Azure-Ref',
  '0dCkPYAAAAAB6C9bW6Xc9R6k0Vs8pg9VbWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3Aec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0/:issueAccessToken', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"token":"token","expiresOn":"2021-01-26T20:26:29.1912255+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'iTfxviDiB0euXVNQ2zxedQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '8fcdf97b-9e2b-4554-9c76-5fc47b0870f0',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '27ms',
  'X-Azure-Ref',
  '0dikPYAAAAAAQZqRscdwHQZ1KT8iXdbsQWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'pLSsT7/vu0SK6ANUIYDJxw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '29733691-d7ea-46b2-89bb-333037fae683',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '18ms',
  'X-Azure-Ref',
  '0dikPYAAAAABcCAGqi2AiT5Qmdfp7WYfLWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/8%3Aacs%3Aec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1/:issueAccessToken', {"scopes":["chat"]})
  .query(true)
  .reply(200, {"token":"token","expiresOn":"2021-01-26T20:26:29.3323233+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'QYbxmTCypEKDeQr92qA11g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '9e363fda-fa67-46ef-acaa-d0e00414fcd5',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '22ms',
  'X-Azure-Ref',
  '0dikPYAAAAACsJy5AHvtLT4yeYqHW2nKkWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","members":[{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0"},{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1"}]})
  .query(true)
  .reply(207, {"multipleStatus":[{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0","statusCode":201,"type":"ThreadMember"},{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1","statusCode":201,"type":"ThreadMember"},{"id":"19:14724b43dee94c22a938d44457110b8a@thread.v2","statusCode":201,"type":"Thread"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://13.64.171.212/chat/threads/19%3A14724b43dee94c22a938d44457110b8a@thread.v2',
  'MS-CV',
  'XEEI2MfM3kW8nsrMK+XNrg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '297ms',
  'X-Azure-Ref',
  '0dikPYAAAAACRBs6LzcxJRKIPoxL1gWwtWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:30 GMT'
]);

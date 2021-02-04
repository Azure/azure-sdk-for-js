let nock = require('nock');

module.exports.hash = "86d7fc5fcb952314632ab6bf97514815";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-a3d6-b0b7-3a3a0d0000a6"},"accessToken":{"token":"token","expiresOn":"2021-02-05T20:21:30.0522841+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'iIQXoYibq026VdNYOpAi8g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'ea83ab70-083a-4b70-ae07-7254000397de',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '332ms',
  'X-Azure-Ref',
  '0S1ccYAAAAADh3XJE8t4JT4DBFnwoQM8JWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities', {"createTokenWithScopes":["chat"]})
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-a570-b0b7-3a3a0d0000a7"},"accessToken":{"token":"token","expiresOn":"2021-02-05T20:21:31.5359102+00:00"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ZtGRZPrWoU2q/HV9IpT38A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  '73148848-7fcb-43f5-b094-f1cb25f831f6',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '425ms',
  'X-Azure-Ref',
  '0TFccYAAAAAALtECScNbASaTIgbygeaRvWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads', {"topic":"test topic","participants":[{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-a3d6-b0b7-3a3a0d0000a6"},{"id":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-a570-b0b7-3a3a0d0000a7"}]})
  .query(true)
  .reply(201, {"chatThread":{"id":"19:d0e0035f2cab42f0a4410cbee3cb6781@thread.v2","topic":"test topic","createdOn":"2021-02-04T20:21:32Z","createdBy":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-a3d6-b0b7-3a3a0d0000a6"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-sdktester-e2e.int.communication.azure.net/chat/threads/19%3Ad0e0035f2cab42f0a4410cbee3cb6781@thread.v2',
  'MS-CV',
  'SbpYziAENEWAcjy5yIfgbA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '882ms',
  'X-Azure-Ref',
  '0TFccYAAAAAC94OM8usLXSK7zrWK7Ta80WVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:33 GMT'
]);

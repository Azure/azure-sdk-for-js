let nock = require('nock');

module.exports.hash = "83c28f4ed758d8c7b92b56697f30ed8a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AXTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:XTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1@thread.v2","topic":"test topic","createdOn":"2021-06-16T23:06:09Z","createdByCommunicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Q+Qcd7CkTUSkGeq+M3itaw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '105ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04YPKYAAAAAAQb/7HWC8ERoTEAFQ7QI6DWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:08 GMT'
]);

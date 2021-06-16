let nock = require('nock');

module.exports.hash = "10dd04e171c2258c64ce665e70a9383f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AXTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '3UUdZ+dQW0WWYoF+LLRaRA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '128ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '04oPKYAAAAAAajV/4dwp2TZIbbgmkBi/MWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:09 GMT',
  'Content-Length',
  '0'
]);

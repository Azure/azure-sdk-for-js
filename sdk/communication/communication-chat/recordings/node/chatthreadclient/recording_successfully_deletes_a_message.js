let nock = require('nock');

module.exports.hash = "1a814ddcbc4190c3adefc3fc8633ba57";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3AXTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1%40thread.v2/messages/1623884770449')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'OzNuWm5BnUK1EvZWxl+fUA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '260ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05IPKYAAAAABs2kMqM1gkT7iJQBixsluqWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:11 GMT'
]);

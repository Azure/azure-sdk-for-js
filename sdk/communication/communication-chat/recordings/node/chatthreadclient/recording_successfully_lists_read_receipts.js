let nock = require('nock');

module.exports.hash = "9efaea99e71681e119e42483f0f46e96";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AXTvysZD4351uz6bY6_ZO6PK6M5Ovmh0-VmHO9GhQLtM1%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderCommunicationIdentifier":{"rawId":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0","communicationUser":{"id":"8:acs:ac80d96a-85de-48b1-995d-a3a3fa3627c8_0000000a-b6f4-c88c-edbe-a43a0d00fdd0"}},"chatMessageId":"1623884770449","readOn":"2021-06-16T23:06:10Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'KXkWur2/1UKzXHNHDEXP5g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '141ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05oPKYAAAAACILKCLVxP4TZMQJxk1q96fWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:06:13 GMT'
]);

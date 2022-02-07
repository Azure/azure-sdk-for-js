let nock = require('nock');

module.exports.hash = "5f24872081379cf3a7425479e8f94dde";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3AsgWbjFj1JHxjXzZ9D35LCwjbKqV0PXSvXPUQc9hlP-I1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '6gNYLE0gJUywOMZjdR8R+A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '259ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0WMn5YQAAAAC/ebNfMDNGRYK2B1o3Ag/KUERYMzFFREdFMDIxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 23:59:19 GMT'
]);

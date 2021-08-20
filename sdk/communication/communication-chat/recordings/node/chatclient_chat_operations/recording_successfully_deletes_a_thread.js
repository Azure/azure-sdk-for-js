let nock = require('nock');

module.exports.hash = "5f24872081379cf3a7425479e8f94dde";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Ae2CS1IPpUGqRw-eCp-DMyyc0fceVtm5QOa3jnFD3x5U1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'xr6pD04W+kuiffmxr24csw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '116ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0av0fYQAAAADq2x/exK6bSLcuevJW1pwtUERYMzFFREdFMDIxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 20 Aug 2021 19:07:22 GMT'
]);

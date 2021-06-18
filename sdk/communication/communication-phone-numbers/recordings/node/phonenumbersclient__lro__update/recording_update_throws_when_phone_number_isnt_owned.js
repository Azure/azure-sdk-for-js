let nock = require('nock');

module.exports.hash = "589e5bdee94eb9bd247280ac7870ecb7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(false)
  .reply(404, {"error":{"code":"InternalError","message":"The server encountered an internal error."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'PfYyHVvc0ku7lxK8DAyblg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '475ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0qOfLYAAAAAAIPF8XmcW4SJPIXcP23MfbWVZSMzBFREdFMDMwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:24:09 GMT'
]);

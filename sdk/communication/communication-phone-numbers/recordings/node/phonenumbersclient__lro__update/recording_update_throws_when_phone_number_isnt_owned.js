let nock = require('nock');

module.exports.hash = "a029440b94d74f4bb37d8021fa55d003";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(false)
  .reply(404, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'fU9j8+OI7EmE9k8PZIG2+g.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '451ms',
  'X-Azure-Ref',
  '0XFGQYAAAAACh31vBO+kXTIBFyev1o9sFWVZSMzBFREdFMDQwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 03 May 2021 19:39:08 GMT',
  'Content-Length',
  '0'
]);

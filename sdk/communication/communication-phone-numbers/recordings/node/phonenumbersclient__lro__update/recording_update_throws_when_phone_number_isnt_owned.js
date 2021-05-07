let nock = require('nock');

module.exports.hash = "a029440b94d74f4bb37d8021fa55d003";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(true)
  .reply(404, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'hco6GfFnwkSfsj+6NNbOAg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '440ms',
  'X-Azure-Ref',
  '024+RYAAAAAD+xy9k1TFlSaHfMTHC5rKrWVZSMzBFREdFMDMxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 04 May 2021 18:18:04 GMT',
  'Content-Length',
  '0'
]);

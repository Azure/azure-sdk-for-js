let nock = require('nock');

module.exports.hash = "9d22e91b3c0859e19eebf021b89a898f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(true)
  .reply(404, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'gSnHgOKetEmOZoEI9jY9PQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '443ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '044bKYAAAAACaoL6VIvwWSpV8a2VvSOPFWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:59 GMT',
  'Content-Length',
  '0'
]);

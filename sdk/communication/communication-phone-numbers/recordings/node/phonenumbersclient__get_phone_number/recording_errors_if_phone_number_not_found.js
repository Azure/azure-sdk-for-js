let nock = require('nock');

module.exports.hash = "9db468d876f027cff1a56c0b2ccac1a5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(404, {"error":{"code":"PhoneNumberNotFound","message":"The specified phone number +14155550100 cannot be found.","target":"phonenumber"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'iHCcarEEpkiclAyzF4xJhg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '345ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xVi2YAAAAAC4ob71ReBlQYzjbDLSxmjbWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Jun 2021 15:56:52 GMT'
]);

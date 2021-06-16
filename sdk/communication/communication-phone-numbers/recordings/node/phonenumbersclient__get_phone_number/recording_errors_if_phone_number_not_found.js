let nock = require('nock');

module.exports.hash = "7fe97cc9f7a6a76e155e31170ab6a4d9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
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
  'DQ7CxTWvh0u2mmy4yzTKMw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '716ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0v4bKYAAAAACBBLYmAp/UTJho77pZfsneWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:24 GMT'
]);

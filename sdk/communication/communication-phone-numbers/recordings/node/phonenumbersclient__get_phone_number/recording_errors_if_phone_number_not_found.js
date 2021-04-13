let nock = require('nock');

module.exports.hash = "b0bd89c3f5f4e7f0b3ac8d2a117e7888";

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
  '+WoFOJ3lIUCabXCqtwuujw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '308ms',
  'X-Azure-Ref',
  '0rtdsYAAAAADEk070zGJRTpBd49NfTcjqWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:50:38 GMT'
]);

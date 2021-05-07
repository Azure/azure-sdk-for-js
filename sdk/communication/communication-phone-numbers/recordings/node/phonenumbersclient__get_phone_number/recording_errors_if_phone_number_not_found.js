let nock = require('nock');

module.exports.hash = "03462f630cc0e2c677645148f9d6c62d";

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
  'Z6lnAIAqdUG7rXyTp170Vg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '294ms',
  'X-Azure-Ref',
  '0fD16YAAAAACHcYIncnqhRKoapArjuc07WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 17 Apr 2021 01:44:28 GMT'
]);

let nock = require('nock');

module.exports.hash = "1f4665bf36a13e89931d298eb1eafd19";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"person","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(true)
  .reply(400, {"error":{"code":"InternalError","message":"The server encountered an internal error.","innererror":{"code":"BadRequest","message":"We are unable to find phone plans to match your requested capabilities."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'mMDiNg7Q5Em6+lre1tV79Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1720ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '07uN8YgAAAAAJ9V2qZh0jQZpe/SLsT51eUFJHMDFFREdFMDYxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 12 May 2022 10:39:43 GMT'
]);

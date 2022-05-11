let nock = require('nock');

module.exports.hash = "1f4665bf36a13e89931d298eb1eafd19";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"person","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(false)
  .reply(429, {"error":{"code":"InternalError","message":"The server encountered an internal error.","innererror":{"code":"TooManyRequests","message":""}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'WGUWMmRFbkCxau9th8iAfA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1609ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '05dN7YgAAAACPyHwnktfwQIIWhQkNhXQfUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:19:03 GMT'
]);

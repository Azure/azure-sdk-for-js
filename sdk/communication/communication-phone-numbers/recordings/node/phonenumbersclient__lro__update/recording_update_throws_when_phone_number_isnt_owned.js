let nock = require('nock');

module.exports.hash = "9d22e91b3c0859e19eebf021b89a898f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"outbound","sms":"none"})
  .query(false)
  .reply(404, {"error":{"code":"InternalError","message":"The server encountered an internal error."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  '1R4J32zfJUWiTbNSEAvS1Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '370ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '08dN7YgAAAABzwzB2bYVwTLK6oGPVtezmUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:19:14 GMT'
]);

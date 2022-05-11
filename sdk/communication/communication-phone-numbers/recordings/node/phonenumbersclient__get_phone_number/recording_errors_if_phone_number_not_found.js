let nock = require('nock');

module.exports.hash = "0e7dfc48726c677be0b03c6a752e49fc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(false)
  .reply(404, {"error":{"code":"NotFound","message":"Input phoneNumber +14155550100 cannot be found.","target":"phonenumber"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  '7xgv7ijKUk+J6n4t4m8BhQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '428ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QTB6YgAAAAC5dxe40bqhSb3RT3rSIiTXUFJHMDFFREdFMDYwNgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Tue, 10 May 2022 09:28:33 GMT'
]);

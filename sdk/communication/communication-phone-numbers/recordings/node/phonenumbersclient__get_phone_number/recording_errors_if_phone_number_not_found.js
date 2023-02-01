let nock = require('nock');

module.exports.hash = "72d3da66787ce7ec1b5bd2e51979dcaa";

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
  'weLPJ06R702wwIC1iy6fNg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '971ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oAqSYwAAAACHjzyy3z69Rpd+2CcF+8R0TUVYMzFFREdFMDMxNQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 08 Dec 2022 16:02:40 GMT'
]);

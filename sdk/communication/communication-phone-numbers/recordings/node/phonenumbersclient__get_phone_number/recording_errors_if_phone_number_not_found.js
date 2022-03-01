let nock = require('nock');

module.exports.hash = "72d3da66787ce7ec1b5bd2e51979dcaa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(404, {"error":{"code":"NotFound","message":"Input phoneNumber +14155550100 cannot be found.","target":"phonenumber"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  '2/33YKyd1kay3PIhKfH2Lw.0',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '313ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0oATeYQAAAAD/ORbYyt7eRI2GK/HeKyL8UklPMDFFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 11 Jan 2022 22:28:48 GMT'
]);

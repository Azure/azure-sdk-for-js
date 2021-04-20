let nock = require('nock');

module.exports.hash = "549b167dc03a3cf6dae04aefb3aae12b";

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
  'MQcqFgpZNk+fdVb4DMSkrQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '317ms',
  'X-Azure-Ref',
  '0GQZ2YAAAAAA1fvTcallKQ5K+BA3+W+EHWVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 13 Apr 2021 20:59:05 GMT'
]);

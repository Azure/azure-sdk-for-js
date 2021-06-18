let nock = require('nock');

module.exports.hash = "ccf3f19e89ba8ee2022114c37de83955";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(false)
  .reply(404, {"error":{"code":"NotFound","message":"Input phoneNumber +14155550100 cannot be found.","target":"phonenumber"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'LObHguDgR0e81wKIkU21LA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '398ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0/ObLYAAAAADXR78by5HhR6VoX72T9Yz8WVZSMzBFREdFMDQxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:16 GMT'
]);

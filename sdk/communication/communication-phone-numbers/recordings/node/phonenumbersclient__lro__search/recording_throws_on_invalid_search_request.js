let nock = require('nock');

module.exports.hash = "b64a8c93e95970054ede9c66155c7333";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"person","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(true)
  .reply(400, {"error":{"code":"InvalidInput","message":"We are unable to find phone plans to match your requested capabilities.","target":"areacode"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'TB4UrhQPQUu/qESVMjyBzw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1199ms',
  'X-Azure-Ref',
  '0XNVsYAAAAACLnMZE90ojRK7OvNuSdEKbWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:40:45 GMT'
]);

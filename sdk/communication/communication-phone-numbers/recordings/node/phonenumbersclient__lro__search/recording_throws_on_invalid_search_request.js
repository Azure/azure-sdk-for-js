let nock = require('nock');

module.exports.hash = "8e8d67d2d9f666e4996b87eb20d8be04";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"person","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(false)
  .reply(400, {"error":{"code":"InternalError","message":"The server encountered an internal error.","innererror":{"code":"BadRequest","message":"We are unable to find phone plans to match your requested capabilities."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ivBD3iuSHkqHwAZ1PhopGA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1865ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0gOfLYAAAAADVDDHjj4Q0RIaquwyEfKpuWVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:30 GMT'
]);

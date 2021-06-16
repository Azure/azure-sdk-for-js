let nock = require('nock');

module.exports.hash = "c2062ea5f2048a6c30795f545cbe7db3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"person","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(true)
  .reply(400, {"error":{"code":"InternalError","message":"The server encountered an internal error.","innererror":{"code":"BadRequest","message":"We are unable to find phone plans to match your requested capabilities."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'XzOmuMesoEu41H7PX/Z+vw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1754ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0z4bKYAAAAAAHzJ1r541gQZvSfGKM7cAdWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:18:40 GMT'
]);

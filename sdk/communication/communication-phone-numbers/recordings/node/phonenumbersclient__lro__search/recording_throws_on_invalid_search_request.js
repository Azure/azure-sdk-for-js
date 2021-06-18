let nock = require('nock');

module.exports.hash = "c2062ea5f2048a6c30795f545cbe7db3";

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
  '6h62eGZKf0y3cvasS5Kvag.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1940ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '07cvMYAAAAACRMlGwBt7bTLnOHBy0AY/LWVZSMzBFREdFMDQyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:38:07 GMT'
]);

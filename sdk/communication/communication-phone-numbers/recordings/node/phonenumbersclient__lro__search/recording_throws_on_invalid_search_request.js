let nock = require('nock');

module.exports.hash = "ea194035e8c8171fc5cab96f8ca9719a";

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
  'Gzg5lEuNK0G+gSyKWMcGXg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1285ms',
  'X-Azure-Ref',
  '0UAZ2YAAAAAAVJYwTVXRTQqeUM4icfkb8WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 13 Apr 2021 21:00:01 GMT'
]);

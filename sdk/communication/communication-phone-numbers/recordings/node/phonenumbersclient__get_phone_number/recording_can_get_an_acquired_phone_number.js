let nock = require('nock');

module.exports.hash = "3c0b6773c8363a8fc034ffc2603f15df";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"18332159176","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"TollFree","capabilities":{"calling":"inbound+outbound","sms":"outbound"},"assignmentType":"Application","callbackUri":null,"applicationId":null}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'E4Qk/JAt2kK5m4juJIq/vg.0',
  'X-Processing-Time',
  '736ms',
  'X-Azure-Ref',
  '0Kf4aYAAAAABSHaKO0banTKvuHdPyGrlxWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 03 Feb 2021 19:48:58 GMT'
]);

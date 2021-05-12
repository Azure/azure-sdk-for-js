let nock = require('nock');

module.exports.hash = "7c385414847089140bc9b5a744d55b6a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-02-10T17:52:41.818335+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'xHECDRpMX0Wk8Y+XlSAQDw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1572ms',
  'X-Azure-Ref',
  '0ez16YAAAAACfW09HqulXSadKLAnDk//vWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 17 Apr 2021 01:44:28 GMT'
]);

let nock = require('nock');

module.exports.hash = "3739dc8b8d7e4683ccfcebc0489ae499";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-26T22:41:03.6935096+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'cD/M3wHw0kmZg80cAq4mag.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1061ms',
  'X-Azure-Ref',
  '0rddsYAAAAAD9+YW8bMiGSoj5feP5btOCWVZSMzBFREdFMDQxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:50:38 GMT'
]);

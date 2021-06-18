let nock = require('nock');

module.exports.hash = "6e2aa0c261e9424059ecb87e0e89552a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(false)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:03:04.7513808+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '3EO2Uu74ckudeJhy+J9fpQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1869ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0+ubLYAAAAABQtGJfT+JYTqk8nK4UzF1zWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:21:15 GMT'
]);

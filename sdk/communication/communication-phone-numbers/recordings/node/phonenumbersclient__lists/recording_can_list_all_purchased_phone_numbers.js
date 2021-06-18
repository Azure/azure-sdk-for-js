let nock = require('nock');

module.exports.hash = "43b58e99c6ce1c8d4df4f3bcbd767346";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers')
  .query(false)
  .reply(200, {"phoneNumbers":[{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"geographic","capabilities":{"calling":"inbound+outbound","sms":"none"},"assignmentType":"application","purchaseDate":"2021-04-14T00:23:52.1861991+00:00","cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"geographic","capabilities":{"calling":"outbound","sms":"none"},"assignmentType":"application","purchaseDate":"2021-04-06T23:27:52.858607+00:00","cost":{"amount":1,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-05-25T00:03:06.2985305+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-05-24T23:39:11.2079613+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-05-26T23:18:22.4715623+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-05-27T03:05:50.816041+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"outbound","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-02-10T17:52:41.818335+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-02-10T18:01:46.4199999+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:01:55.0949003+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:03:04.7513808+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"outbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2000-01-01T00:00:00+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'kM9OuVzFn0KXEbCP8o/0Rw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '2142ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0csvMYAAAAACjDu27xlBWSo+EhXJjLdP3WVZSMzBFREdFMDMwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 16:36:04 GMT'
]);

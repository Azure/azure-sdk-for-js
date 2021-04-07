let nock = require('nock');

module.exports.hash = "e02794a97d339037266108f86425a55e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1327',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'sanitized',
  'x-ms-ests-server',
  '2.1.11562.10 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgQHD2i3hVZClNkbY0AOlKtWyo4SBQAAAPrN_tcOAAAA; expires=Thu, 06-May-2021 21:47:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 06 Apr 2021 21:47:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers')
  .query(true)
  .reply(200, {"phoneNumbers":[{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-02-10T17:51:13.4876763+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound"},"assignmentType":"application","purchaseDate":"2021-02-10T17:52:41.818335+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-02-10T18:01:46.4199999+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:01:55.0949003+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:03:04.7513808+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-26T21:13:23.5677014+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-26T20:48:35.6663829+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"outbound","sms":"inbound"},"assignmentType":"application","purchaseDate":"2021-03-26T22:41:03.6935096+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-03-29T20:13:20.1694649+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-03-30T23:10:20.4361699+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-04-06T17:35:42.8155189+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-04-06T21:36:18.8554333+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2000-01-01T00:00:00+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'pzpklG03uE2gyhI3hAMB/w.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '6505ms',
  'X-Azure-Ref',
  '0B9dsYAAAAAAlzWHRnN0mQonlhvbJMm5tWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:47:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers')
  .query(true)
  .reply(200, {"phoneNumbers":[{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound"},"assignmentType":"application","purchaseDate":"2021-02-10T17:52:41.818335+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-02-10T18:01:46.4199999+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:01:55.0949003+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-03-09T15:03:04.7513808+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-26T21:13:23.5677014+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"outbound"},"assignmentType":"application","purchaseDate":"2021-03-26T20:48:35.6663829+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"outbound","sms":"inbound"},"assignmentType":"application","purchaseDate":"2021-03-26T22:41:03.6935096+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-03-29T20:13:20.1694649+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-03-30T23:10:20.4361699+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-04-06T17:35:42.8155189+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-04-06T21:36:18.8554333+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}},{"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2000-01-01T00:00:00+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}]}, [
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'MpOl35R/n0SE6szo1CCAtg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '6598ms',
  'X-Azure-Ref',
  '0DddsYAAAAAAOzlbFvgOAT72efG/BeAmbWVZSMzBFREdFMDMyMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:48:03 GMT',
  'Connection',
  'close'
]);

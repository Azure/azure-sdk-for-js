let nock = require('nock');

module.exports.hash = "54fc9ee98e5f24aed78d2ab61a21b45d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"outbound","sms":"none"},"quantity":1})
  .query(true)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'd3kapLhhLkSZCO6tzfq7XQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2022-01-11-preview2',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '1977ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0d98fYgAAAADQtc3BSCgAQo7ufQyqIb31TEFYMzExMDAwMTA4MDI5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 21:19:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"operationType":"search","status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2022-01-11-preview2","createdDateTime":"2022-03-02T21:19:52.6704705+00:00","id":"search_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'p9sAJn1TREut8PybB4cl5Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '300ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ed8fYgAAAADU6VMebOR9QYTbxPDcQYuvTEFYMzExMDAwMTA4MDI5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 21:19:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":[],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"outbound","sms":"none"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2022-03-02T21:19:55.7954140+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'GxGZ1aKfxU2MV7MKPAOutA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '1343ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0e98fYgAAAAAIJGNi2qeqTJVnQ1KqdxWpTEFYMzExMDAwMTA4MDI5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 21:19:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"outbound","sms":"none"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2022-03-02T21:35:54.5825400+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'xcE0IpPHXEOx0AG9GqU9Pg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '872ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ft8fYgAAAADZBcgOY1shTLORY+8VzgDlTEFYMzExMDAwMTA4MDI5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 21:19:59 GMT'
]);

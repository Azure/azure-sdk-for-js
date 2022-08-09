let nock = require('nock');

module.exports.hash = "54fc9ee98e5f24aed78d2ab61a21b45d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"outbound","sms":"none"},"quantity":1})
  .query(false)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'MS-CV',
  'QhKBkQQUzE2H/bqxrPogDw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '2358ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0EfDyYgAAAABldYiZy/FnSqG7V5RA3f4hTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:38:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(false)
  .reply(200, {"operationType":"search","status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview","createdDateTime":"2022-08-09T23:38:59.7101359+00:00","id":"search_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'oim3XI0SBk6N2TNp5lFXYQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '425ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FPDyYgAAAAAiDQDcUy91SaLVn5j0Jr3WTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(false)
  .reply(200, {"operationType":"search","status":"succeeded","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview","createdDateTime":"2022-08-09T23:38:59.7101359+00:00","id":"search_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'gcVkHTFyfUid3tunOsUhhw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '396ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0FvDyYgAAAAC0a2foFmwwQKYqORjmDs/cTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(false)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"outbound","sms":"none"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2022-08-09T23:55:01.7932475+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '2C3As0WQN0KED+9Geogjug.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview, 2022-12-01',
  'X-Processing-Time',
  '1036ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0GfDyYgAAAACzdgJYjIIGTpCB4wWPzPaNTEFYMzExMDAwMTA4MDQ3ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Tue, 09 Aug 2022 23:39:05 GMT'
]);

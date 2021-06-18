let nock = require('nock');

module.exports.hash = "747f13593654c097a406a650a310040c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"outbound","sms":"none"},"quantity":1})
  .query(false)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'dX4l4z6FJEC1gu2BTW/TgQ.0',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2021-03-07',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '2712ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0defLYAAAAADB8+SVEqYTQot2BcpoLI6QWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:20.1191473+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Iwp1c9gV3ki9+mmv7Zj5iQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '372ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0eOfLYAAAAABQyp8PGZugSomTG9GSKC8IWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-06-18T00:23:20.1191473+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Vh4gJZpYVUeinY3p7MpPWA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '395ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0e+fLYAAAAABFOT0CM2e7QZVlsIqfGPZsWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(false)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"outbound","sms":"none"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2021-06-18T00:39:21.7850772+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Uej6ivUEY0OPYnOKkn7tHg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1161ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0fefLYAAAAAAuPdeXZKnBS5hnKhlnBskDWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:23:25 GMT'
]);

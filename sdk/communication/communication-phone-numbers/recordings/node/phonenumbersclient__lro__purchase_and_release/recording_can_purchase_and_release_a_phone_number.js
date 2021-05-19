let nock = require('nock');

module.exports.hash = "6c835632b11dfe0f94a5adfb386bba37";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(true)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'e9cD/BsAYUe54/uIxbnmyQ.0',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2021-03-07',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '2541ms',
  'X-Azure-Ref',
  '09tRsYAAAAAA8eX0J8fwpSbQ0mD2GaagBWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-04-06T21:39:04.2186381+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'n0WDdaD+xEucmmGKGceqYw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '360ms',
  'X-Azure-Ref',
  '0+NRsYAAAAACv3ACNAV7OSIqxkTdKmD3cWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-04-06T21:39:04.2186381+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'QWBE/+ne00iHzdXLimCo2g.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '278ms',
  'X-Azure-Ref',
  '0/dRsYAAAAADufUiNhAUxSKQ0U06JIkrjWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-04-06T21:39:04.2186381+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'IG8axGHug0S10NaK4XfriQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '317ms',
  'X-Azure-Ref',
  '0/9RsYAAAAADTrVIpVEpfRJzZt1smhuqrWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2021-04-06T21:55:09.3888548+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Gc+2UG8VvkuLBYwHMTa/uw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '812ms',
  'X-Azure-Ref',
  '0AtVsYAAAAADfAUa6VF27SIdpRrgooFiDWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/availablePhoneNumbers/:purchase', {"searchId":"sanitized"})
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,purchase-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'OSoCxhOxU0u3K7mwsZT7HQ.0',
  'Operation-Location',
  '/phoneNumbers/operations/purchase_sanitized?api-version=2021-03-07',
  'operation-id',
  'purchase_sanitized',
  'purchase-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1697ms',
  'X-Azure-Ref',
  '0BdVsYAAAAAC8Tc5DL+hHQbHLzEoADw/aWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-04-06T21:39:04.2186381+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'XxG/dC/1GkGRS6l6dt0K4w.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '512ms',
  'X-Azure-Ref',
  '0BtVsYAAAAADu3JSCiX9VQ5FxJvYhvc07WVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-04-06T21:39:04.2186381+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '1HJ2lqcGj0Cq9jwfLQ+U1A.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '361ms',
  'X-Azure-Ref',
  '0DtVsYAAAAAAQZTd660RZS41sqmUG3xX9WVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-04-06T21:39:04.2186381+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '/5TiKAJWykm2unYc5Dc9uA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '344ms',
  'X-Azure-Ref',
  '0H9VsYAAAAACNsuSnvXPxQqsVAUOxJ6QgWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-04-06T21:39:39.0816987+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '6do2yHxd5k6WYQXh8c3gTw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1531ms',
  'X-Azure-Ref',
  '0I9VsYAAAAAAZrWRsWP1gQpNSMyRjvvWZWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,release-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'YwktFPlIBkm53C+KMwb1+g.0',
  'Operation-Location',
  '/phoneNumbers/operations/release_sanitized?api-version=2021-03-07',
  'operation-id',
  'release_sanitized',
  'release-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '894ms',
  'X-Azure-Ref',
  '0JdVsYAAAAAD2r9JyPUq3T4HwTQtWtRxoWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:49 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-04-06T21:39:49.5494807+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'v3bo0akAI06fUF64OghoOw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '261ms',
  'X-Azure-Ref',
  '0JtVsYAAAAAAivBOwJiYCQaIn6TUGm7c1WVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-04-06T21:39:49.5494807+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '+8ibZ3X4RU+p66cseF6ISg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '833ms',
  'X-Azure-Ref',
  '0KNVsYAAAAAAGSNU2PzH4QLPfoJcveoVBWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:39:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-04-06T21:39:49.5494807+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '7tEv4+2580ed+o5yGSDkCA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '364ms',
  'X-Azure-Ref',
  '0NdVsYAAAAACoBLGIKkdzRITqB0jlAZaCWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:40:04 GMT'
]);

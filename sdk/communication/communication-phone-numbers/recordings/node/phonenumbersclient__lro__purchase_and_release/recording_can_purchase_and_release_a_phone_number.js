let nock = require('nock');

module.exports.hash = "13def522ee31a2a933aced2eb64bc576";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(false)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'kEGRhFBFoECWaueGPngUNQ.0',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2021-03-07',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '2095ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0NufLYAAAAABi2SfXPMb8Tal0+Ll4ErlwWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  '1p89b7mxc0GNlvlUWpMO8g.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '370ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0OefLYAAAAADH8AZIs7vOT6axxkbWhhNeWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'PI5vMfMiNUW3WN0OETJs6w.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '369ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0O+fLYAAAAACeKhNSxAO4Q4LhaTTYOAQMWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(false)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2021-06-18T00:38:18.0891230+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'bpYDbSgkME+AY9OEnGfa9Q.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '868ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0PefLYAAAAACGG/R54qxVTLUWb0Z9qsRrWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/:purchase', {"searchId":"sanitized"})
  .query(false)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,purchase-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  '9Cu+U+lAXkaZqO8z0DKimg.0',
  'Operation-Location',
  '/phoneNumbers/operations/purchase_sanitized?api-version=2021-03-07',
  'operation-id',
  'purchase_sanitized',
  'purchase-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1837ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QOfLYAAAAAAevNbXMTeCSqk/hrQv+ENDWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'cHPlQfszeUWUvNFoHJT2+w.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '491ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QufLYAAAAADdYfY5/YndSKTlbKIXPBpIWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'ktRW7OU7/ECzGH/HWyNqJw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '359ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0RefLYAAAAABWr1W5+IJwTboyXQvFo5uNWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'cKcx0TygwUO/2PLZ9c96zw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '398ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0R+fLYAAAAABvzlm5YjWHRLccuFGnpcvOWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'h47j1M4UBEqnA02RqiN+jA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '361ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0SufLYAAAAADenPeY/DM3Qb0XBJcFltcBWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '+TnZhzS1Nkm+iWU7D5hW5A.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '350ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0TOfLYAAAAADk2QhjPVFvTr4fHO7oEs2fWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '8Jemx5ycaE6sqE9kXxvmDA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '416ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0T+fLYAAAAADWfrXPGLoMSJ9G1g8KPlYWWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:16.4530495+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'c4m+s+5LUUyomwFyFJZpxw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '895ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0UefLYAAAAADT5WaDEVKeSJahZeXoZwEiWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(false)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-06-18T00:22:40.4677282+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'zovk+yi0PUadMbtTNOPCiw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1307ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0VufLYAAAAABsbrL/cwKZRoP5Iuy2Wy4XWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .delete('/phoneNumbers/%2B14155550100')
  .query(false)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,release-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'WSSG7KVkIU6CtP/Oyu7zHQ.0',
  'Operation-Location',
  '/phoneNumbers/operations/release_sanitized?api-version=2021-03-07',
  'operation-id',
  'release_sanitized',
  'release-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '890ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0WOfLYAAAAADPtmCYp+80TpWZhmjdx5gYWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:48 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:48.642703+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'YJvMaBcZ+kO0VXXrT3dupw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '308ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0WefLYAAAAAC4jUzMWzEwT6FKquONyuYNWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:48.642703+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '8oJToAHu7k60YSeR0Lj9UA.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '297ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0W+fLYAAAAAArGGUvTscLQoTtOL7JxjpzWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:48.642703+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '2yAeo5Ure0KMWEOJ586XAQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '298ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0XefLYAAAAADf2RR/ASN5TL6NXr4scgv2WVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:48.642703+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'NgZRwKN/L0qzEJrlqiJ0Ug.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '288ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0YOfLYAAAAACQsHKXkq+TQ6NjWk4D3iPZWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(false)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-06-18T00:22:48.642703+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'FvLIsq+0hUiIBHQ8EDDrXw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '297ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0YufLYAAAAADfbMWcTeCPQr3FG3/c+yHGWVZSMzBFREdFMDMyMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 18 Jun 2021 00:22:58 GMT'
]);

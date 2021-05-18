let nock = require('nock');

module.exports.hash = "6c835632b11dfe0f94a5adfb386bba37";

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
  '2.1.11562.11 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmaFr2-Cs2VCtiSCzRkBTexWyo4SBgAAAG3L_tcOAAAA; expires=Thu, 06-May-2021 21:37:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 06 Apr 2021 21:37:52 GMT'
]);

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
  'k2+B1opsYEilL/2LuT+8lA.0',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2021-03-07',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '2613ms',
  'X-Azure-Ref',
  '0sNRsYAAAAADyrpHRXnaHRLCGQJSnT8OJWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:37:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-04-06T21:37:54.7262553+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'V2bCwrWbM0qgeEgkq9IDcw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '343ms',
  'X-Azure-Ref',
  '0tdRsYAAAAACCgrbwMKYwTpDtHmPlOEMLWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:37:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-04-06T21:37:54.7262553+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  '7DKUAJpRakOpqy5Ye0oe6A.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '294ms',
  'X-Azure-Ref',
  '0uNRsYAAAAACpj3GqRky/SKUUZNSQjJhXWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2021-03-07","createdDateTime":"2021-04-06T21:37:54.7262553+00:00","id":"search_sanitized","operationType":"search","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'aENNQAOvEkysZd7rWmtZEQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '328ms',
  'X-Azure-Ref',
  '0utRsYAAAAACHPOojEifCTJ3bOXaRUc1pWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2021-04-06T21:54:00.8056182+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'zGsdby8Bj0mWTKOfuMG0Fg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1057ms',
  'X-Azure-Ref',
  '0vdRsYAAAAAAoOiMS1MOmS56bFRjzmammWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:05 GMT'
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
  'gAygV8Faw0qgJxQDd3LvIw.0',
  'Operation-Location',
  '/phoneNumbers/operations/purchase_sanitized?api-version=2021-03-07',
  'operation-id',
  'purchase_sanitized',
  'purchase-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1759ms',
  'X-Azure-Ref',
  '0wNRsYAAAAABHxF4K46PLQKV2h/qlb6DdWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-04-06T21:37:54.7262553+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'HiRmRYuUSUOi4pMbqB4JQQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '366ms',
  'X-Azure-Ref',
  '0xtRsYAAAAAD187HJn/u4RK8/Mr4bCXsuWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-04-06T21:37:54.7262553+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'nP0RwmK1MEavgo1k1lD12g.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '306ms',
  'X-Azure-Ref',
  '0ydRsYAAAAADpxZEI8+f6TbQf1XE46GTYWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-04-06T21:37:54.7262553+00:00","id":"purchase_sanitized","operationType":"purchase","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'xEM2fflUo0yQ8lv4Um7ZRw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '316ms',
  'X-Azure-Ref',
  '03NRsYAAAAAAGX3+CnOxVS7Zw0xJ1minvWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2021-04-06T21:38:32.9344698+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '3wdLYFtYiUqWS/wfWExhtg.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1193ms',
  'X-Azure-Ref',
  '04dRsYAAAAABtpFnSyyJFSp9ydch6k2NVWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:42 GMT'
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
  '2jdZF1Q3D0WEA8WkPllCJQ.0',
  'Operation-Location',
  '/phoneNumbers/operations/release_sanitized?api-version=2021-03-07',
  'operation-id',
  'release_sanitized',
  'release-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '1042ms',
  'X-Azure-Ref',
  '04tRsYAAAAAC7W4LnXdPyT7L1Lf5nkVJJWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"notStarted","resourceLocation":null,"createdDateTime":"2021-04-06T21:38:42.7822119+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'YZ0egkHXGEWAb7TaVs9tqw.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '299ms',
  'X-Azure-Ref',
  '049RsYAAAAAD2QjzkX5vfR6CfqLGW1W1bWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"running","resourceLocation":null,"createdDateTime":"2021-04-06T21:38:42.7822119+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'MwaOi0Pq30qNA+jCvwjJ4g.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '406ms',
  'X-Azure-Ref',
  '05dRsYAAAAACTU56OjYRuR6tfhOu5KyBTWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"status":"succeeded","resourceLocation":null,"createdDateTime":"2021-04-06T21:38:42.7822119+00:00","id":"release_sanitized","operationType":"releasePhoneNumber","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '3s+Sk6skl0KSObnawnwy2w.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '261ms',
  'X-Azure-Ref',
  '08dRsYAAAAAA0jrzparKyQ4k+mbYCBXdhWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 06 Apr 2021 21:38:57 GMT'
]);

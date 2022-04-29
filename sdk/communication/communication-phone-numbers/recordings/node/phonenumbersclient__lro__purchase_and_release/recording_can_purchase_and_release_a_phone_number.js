let nock = require('nock');

module.exports.hash = "e40db4a771c5a86fc3580081e9b7cdc2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"quantity":1})
  .query(true)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-01-11-preview2',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'rpXJ/UJIf0qnMhZHI77q4Q.0',
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
  '3077ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0SwQgYgAAAAA2cjsrAYoCT7pSqkfIKgkgTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"operationType":"search","status":"notStarted","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2022-01-11-preview2","createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"search_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
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
  'N/GOZU1ZPUyyMliYmlFwqA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '432ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0TgQgYgAAAABgPbnLWIilQqGWRnyAyT7JTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":[],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2022-03-02T23:57:05.2764405+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '2wFvzoB+OkeHUn8mTbGmKA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '894ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0UAQgYgAAAAA8xoT57OP+QqyiK2Il/C0LTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"none","sms":"inbound+outbound"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2022-03-03T00:13:04.2299637+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '5Ay85CctB0i4ZNSbU5ZvQQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '1240ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0UwQgYgAAAADzcwZN13o6RI+ACUnDXwraTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/:purchase', {"searchId":"sanitized"})
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,purchase-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'YBAxoQTYg0iSgklwZdlVmQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/purchase_sanitized?api-version=2022-01-11-preview2',
  'operation-id',
  'purchase_sanitized',
  'purchase-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '2097ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0VQQgYgAAAABNF6Ar24SKSp7yYzRmRYrLTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"running","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Ts7hZhACTkS6anzFMXHDqg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '407ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0VwQgYgAAAABNDAzV0Nh2T6YRcFgCvv1rTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"running","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'AQSMXVkBGkK8aidxPVDIvg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '423ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0WQQgYgAAAACl/pG6UGf5R6vXuYfE7WAMTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'vqjVtjkrqkGArCCjX0nwdQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '413ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0XAQgYgAAAABda55E8+HeSrl014G/eG97TEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'dDHHMohH6EWah7huSsiBuQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '394ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0XgQgYgAAAADxVEvRWei1SJyOjcCx0W/rTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'x28MGVaUA0yXr7DRca+eFQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '402ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0YAQgYgAAAAD0/1ZoIWPwSbjHpvhLzhGrTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'mTnXCmw0h0W7PvKm5sUrEQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '400ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0YwQgYgAAAACm/wxaiWn2S6STC98HN+B7TEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'EKMOh2MmgEefw0fSd1bemw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '400ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ZQQgYgAAAACT/95+NxgeTqqtUdS9GfH3TEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"succeeded","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:01.9751797+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '/MfwQtDwHk2nvxcWm1Rw8g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '375ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0aAQgYgAAAABZOgCRCx+BS64Nf6tehrpZTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"none","sms":"inbound+outbound"},"assignmentType":"application","purchaseDate":"2022-03-02T23:57:26.2367125+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '/WxSYwQi4UOr3YARJKRWLw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '1639ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0aAQgYgAAAAB5Ghu/g41gQYKAlHz6XMbJTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .delete('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,release-id',
  'Request-Context',
  'appId=',
  'MS-CV',
  'neDsWo2EOEaH2y0yVtrLiA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/release_sanitized?api-version=2022-01-11-preview2',
  'operation-id',
  'release_sanitized',
  'release-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '942ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0agQgYgAAAAAjkYxGH4kKRYCU35NfnHt1TEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:30.6893593+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '+9GFs8RGWUaE0Hb2PmCUwA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '306ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0awQgYgAAAABdoXRnFOTUT4cb/9d3jAFxTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:30.6893593+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'qvKgxQCl9k2UW9vA9jNLdw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '412ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0bQQgYgAAAAAYH1bSUX9kQqL9B00MW0FxTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:30.6893593+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Ghk3wkxsu0yMvI3O5JHtzw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '368ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0cAQgYgAAAAByX3BSrmFoTpDpWZsTbzc8TEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:30.6893593+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '3xIQ6AeneEqLmsjJIXfkGA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '324ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0cgQgYgAAAAAt/R9vhACkTYVyXWDSbaJKTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"succeeded","resourceLocation":null,"createdDateTime":"2022-03-02T23:57:30.6893593+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'VHOXyXIe9U++O8rBujUjsw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2',
  'X-Processing-Time',
  '404ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0dAQgYgAAAADk5xOS8Z10Rq9rmUIBVAlcTEFYMzExMDAwMTA4MDE5ADlmYzdiNTE5LWE4Y2MtNGY4OS05MzVlLWM5MTQ4YWUwOWU4MQ==',
  'Date',
  'Wed, 02 Mar 2022 23:57:40 GMT'
]);

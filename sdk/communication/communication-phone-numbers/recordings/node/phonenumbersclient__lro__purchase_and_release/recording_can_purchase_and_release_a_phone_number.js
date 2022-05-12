let nock = require('nock');

module.exports.hash = "ca034d3023d52d19387ef9f4e9483ce7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/countries/US/:search', {"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"inbound+outbound","sms":"none"},"quantity":1})
  .query(true)
  .reply(202, "", [
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location,Operation-Location,operation-id,search-id',
  'MS-CV',
  '021X70IHYUWnB+883psImA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/search_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'search_sanitized',
  'search-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '3843ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0wdN7YgAAAABtMgUXJqLURpYp8JB2s8OSUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/search_sanitized')
  .query(true)
  .reply(200, {"operationType":"search","status":"running","resourceLocation":"/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview","createdDateTime":"2022-05-11T15:18:29.7380248+00:00","id":"search_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  '/availablePhoneNumbers/searchResults/sanitized?api-version=2022-06-01-preview',
  'Access-Control-Expose-Headers',
  'Location',
  'MS-CV',
  'cDKZS/krSkWvWA9Bd64M/Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '529ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xtN7YgAAAACcAc2rCUERT4AQWER2cPNlUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"inbound+outbound","sms":"none"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2022-05-11T15:34:31.1549446+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ChxBRsFYakex8Ny/lqV1RQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1352ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ydN7YgAAAABQGhuKLgydT529AtdPiq0BUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/availablePhoneNumbers/searchResults/sanitized')
  .query(true)
  .reply(200, {"searchId":"sanitized","phoneNumbers":["+14155550100"],"phoneNumberType":"tollFree","assignmentType":"application","capabilities":{"calling":"inbound+outbound","sms":"none"},"cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"searchExpiresBy":"2022-05-11T15:34:31.1549446+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Kr/k4yh8cEqpF3Z6fmUVFg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1662ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0zNN7YgAAAAD2zm7Z6m2cQ6/so3/PHpZjUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/availablePhoneNumbers/:purchase', {"searchId":"sanitized"})
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,purchase-id',
  'MS-CV',
  'biwmN/qV4UqrVJeBiGr69A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/purchase_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'purchase_sanitized',
  'purchase-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '2278ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ztN7YgAAAABqxva9CdzoTbFBsoR8XPnMUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-05-11T15:18:29.7380248+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'b/BN55F+s0WINxup7KqqFQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '482ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '00NN7YgAAAABFOmdqUas8RokAgOHXmO4iUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/purchase_sanitized')
  .query(true)
  .reply(200, {"operationType":"purchase","status":"succeeded","resourceLocation":null,"createdDateTime":"2022-05-11T15:18:29.7380248+00:00","id":"purchase_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'SWJOnMKyhUyGczrRrEwH/Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '416ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '009N7YgAAAAAC9dRiFH3bS5jOwKRIh7b2UFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(200, {"id":"14155550100","phoneNumber":"+14155550100","countryCode":"US","phoneNumberType":"tollFree","capabilities":{"calling":"inbound+outbound","sms":"none"},"assignmentType":"application","purchaseDate":"2022-05-11T15:18:41.2700426+00:00","cost":{"amount":2,"currencyCode":"USD","billingFrequency":"monthly"},"operatorId":"sanitized","operatorName":"Microsoft PPE (Dogfood)","phoneNumberSource":"cloud"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'hU6j3c7uXECNkWc2cx0c/g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1991ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01NN7YgAAAADy7BZhlQPTRLTPUuW0swWOUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .delete('/phoneNumbers/%2B14155550100')
  .query(true)
  .reply(202, "", [
  'Access-Control-Expose-Headers',
  'Operation-Location,operation-id,release-id',
  'MS-CV',
  'aChxDC98gEmXHx+cV1QwVA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'Operation-Location',
  '/phoneNumbers/operations/release_sanitized?api-version=2022-06-01-preview',
  'operation-id',
  'release_sanitized',
  'release-id',
  'sanitized',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '1245ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '01tN7YgAAAACX4AiPb3/MTacf/4OtO+FJUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"notStarted","resourceLocation":null,"createdDateTime":"2022-05-11T15:18:47.1285533+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'E0sLcreEakyWF5K+7BpLSA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '473ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '019N7YgAAAACOrrIYn2wrR733+VEMMG5VUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"running","resourceLocation":null,"createdDateTime":"2022-05-11T15:18:47.1285533+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'CnlKlj/ZR0yu+HBq/UJbYg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '353ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '02tN7YgAAAAAlfjWPecnXR4K5THcw4ZeGUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .get('/phoneNumbers/operations/release_sanitized')
  .query(true)
  .reply(200, {"operationType":"releasePhoneNumber","status":"succeeded","resourceLocation":null,"createdDateTime":"2022-05-11T15:18:47.1285533+00:00","id":"release_sanitized","lastActionDateTime":"0001-01-01T00:00:00+00:00"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'HzZOUv3fYEKOp3n0nYGkxQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2022-01-11-preview2, 2022-06-01-preview',
  'X-Processing-Time',
  '386ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '03dN7YgAAAAAn3a9Eg2GbQL3lK0Jrq8XHUFJHMDFFREdFMDkxNwBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 11 May 2022 15:18:52 GMT'
]);

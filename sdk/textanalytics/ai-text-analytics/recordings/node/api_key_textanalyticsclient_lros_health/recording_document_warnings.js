let nock = require('nock');

module.exports.hash = "0601cc9f8a14c8d0647830b22fa6ae0b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9',
  'x-envoy-upstream-service-time',
  '340',
  'apim-request-id',
  'f8fa8e7f-4e0b-4036-b494-0f0ad9d6bda8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9')
  .query(true)
  .reply(200, {"jobId":"5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9","lastUpdateDateTime":"2020-12-30T17:28:18Z","createdDateTime":"2020-12-30T17:28:18Z","expirationDateTime":"2020-12-31T17:28:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '595f384d-d4d7-4247-abb9-9fb96930b6f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9')
  .query(true)
  .reply(200, {"jobId":"5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9","lastUpdateDateTime":"2020-12-30T17:28:18Z","createdDateTime":"2020-12-30T17:28:18Z","expirationDateTime":"2020-12-31T17:28:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '8055d3bd-dc3f-4b2c-a507-0287bef0e90f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9')
  .query(true)
  .reply(200, {"jobId":"5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9","lastUpdateDateTime":"2020-12-30T17:28:18Z","createdDateTime":"2020-12-30T17:28:18Z","expirationDateTime":"2020-12-31T17:28:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c57681a3-947f-487e-ba47-25a4161aee22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9')
  .query(true)
  .reply(200, {"jobId":"5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9","lastUpdateDateTime":"2020-12-30T17:28:20Z","createdDateTime":"2020-12-30T17:28:18Z","expirationDateTime":"2020-12-31T17:28:18Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '4c7564a1-b11a-4390-bdb0-0827692be0a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9')
  .query(true)
  .reply(200, {"jobId":"5428d10e-37e1-48d4-b5ff-8b3d66c4c5c9","lastUpdateDateTime":"2020-12-30T17:28:20Z","createdDateTime":"2020-12-30T17:28:18Z","expirationDateTime":"2020-12-31T17:28:18Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '250',
  'apim-request-id',
  '8406e35a-f33a-4ab3-990e-ee18366e255c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:22 GMT'
]);

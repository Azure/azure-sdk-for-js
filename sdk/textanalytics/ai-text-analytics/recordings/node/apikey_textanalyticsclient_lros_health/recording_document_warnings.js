let nock = require('nock');

module.exports.hash = "e219eeaade4101fb86a8ad6fac7778fb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '0dbf8315-6a18-4364-83fa-65877c5d90fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:51 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:15:52Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '64604f3b-74b1-49fb-bd23-782f649aeb3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:51 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:15:52Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4da68124-cb9d-4f33-b4ea-8cf8e4fd0afe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:51 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:15:52Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a5090fbe-52ac-45fa-a1c3-79cba683383b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:15:52Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6732088a-2d29-4f7b-96d0-618423676e78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:55 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:15:52Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'eec86966-2f66-41f5-bec0-15691ee4e906',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:15:52Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '894f3139-7728-45dc-9117-73ac613c5c92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:15:52Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '50eda339-7f5e-46b5-b815-3fee5ff6a060',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:16:03Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '83ef1b37-55c5-4a3b-92ef-8d979f745af8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:04 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:16:03Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '789ba793-aeb2-4985-baf2-4d63cf0d9bb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:07 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:16:03Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'bd98a14e-63ea-44f3-b498-50f9dcb9c852',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:09 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:16:03Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '84c29184-a1cb-46b1-8f27-ae479f17a703',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:11 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:16:03Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '02740a8d-cc10-4d7a-b0ff-8455aa3a5670',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:16:13Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '2e5784f0-cd59-4fcf-9d06-a36ac0d63af1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:15 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/6117a975-9584-466b-b440-de43f9825ac0')
  .query(true)
  .reply(200, {"jobId":"6117a975-9584-466b-b440-de43f9825ac0","lastUpdateDateTime":"2021-08-03T03:16:13Z","createdDateTime":"2021-08-03T03:15:52Z","expirationDateTime":"2021-08-04T03:15:52Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'af194cc7-12db-4b37-8b12-275b7b0521d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:15 GMT'
]);

let nock = require('nock');

module.exports.hash = "75c4ec8f675a608b3d86a561fb1069d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  'f1af37df-6b48-4e26-8db4-2e82e2a0ca43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:07:49Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b4235dd3-c9e4-4bc1-8c81-09c1e5221d01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:07:49Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b263dac0-75b2-4a41-8f3a-d028664b459d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:07:49Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '47c011b1-b89a-443e-adc1-959e55bc738c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:07:49Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '67d6d74f-dcef-4b28-877d-95c9cdec5ce1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:07:49Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6ed9f54f-b801-4f4f-aff3-290d2c8382e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:07:49Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3da0ce1f-2156-423d-8c80-3c45952ed909',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:07:49Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '95e46f16-c42e-416f-871e-10b4c459278e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:08:00Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '84961578-ed4a-4dd2-9e27-7f4a8f2cf46d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:08:00Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'dd13d730-cdcc-49ab-b14e-e0415003f0cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:08:00Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '359662ef-f016-4f73-82b7-1978f82d3db4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:08:00Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'a6ac81c6-61cf-4887-9b11-612b175c7ecc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:08:00Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '18eb94e4-355f-4793-a709-5f1c5ae858f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:08:10Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  'dc84aadf-f494-41b5-8841-395eb62bbe63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/02e8109a-6c25-41eb-8d27-b569ac6fab56')
  .query(true)
  .reply(200, {"jobId":"02e8109a-6c25-41eb-8d27-b569ac6fab56","lastUpdateDateTime":"2020-12-22T20:08:10Z","createdDateTime":"2020-12-22T20:07:49Z","expirationDateTime":"2020-12-23T20:07:49Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '35d3fdd2-4fd1-4df8-b65c-ce4ce1534813',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:12 GMT'
]);

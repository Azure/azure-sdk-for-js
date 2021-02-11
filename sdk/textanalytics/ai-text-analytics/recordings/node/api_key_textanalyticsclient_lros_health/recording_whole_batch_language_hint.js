let nock = require('nock');

module.exports.hash = "6d1dfc4cc464358dcbb9e128eeffe563";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/0de2a9c2-6ee4-432f-bebf-414b2a41ebcc',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '80ecbc05-e359-4940-8fe6-b6a8e02a6bbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/0de2a9c2-6ee4-432f-bebf-414b2a41ebcc')
  .query(true)
  .reply(200, {"jobId":"0de2a9c2-6ee4-432f-bebf-414b2a41ebcc","lastUpdateDateTime":"2020-12-30T17:28:37Z","createdDateTime":"2020-12-30T17:28:37Z","expirationDateTime":"2020-12-31T17:28:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'dff9df56-07cd-41eb-897e-c3643cf8546b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/0de2a9c2-6ee4-432f-bebf-414b2a41ebcc')
  .query(true)
  .reply(200, {"jobId":"0de2a9c2-6ee4-432f-bebf-414b2a41ebcc","lastUpdateDateTime":"2020-12-30T17:28:37Z","createdDateTime":"2020-12-30T17:28:37Z","expirationDateTime":"2020-12-31T17:28:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '0e7c8f2c-2fcd-4bd4-8401-033c9b9e1a6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/0de2a9c2-6ee4-432f-bebf-414b2a41ebcc')
  .query(true)
  .reply(200, {"jobId":"0de2a9c2-6ee4-432f-bebf-414b2a41ebcc","lastUpdateDateTime":"2020-12-30T17:28:37Z","createdDateTime":"2020-12-30T17:28:37Z","expirationDateTime":"2020-12-31T17:28:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '471cebaa-8e23-4cc9-b17d-f95b180410d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/0de2a9c2-6ee4-432f-bebf-414b2a41ebcc')
  .query(true)
  .reply(200, {"jobId":"0de2a9c2-6ee4-432f-bebf-414b2a41ebcc","lastUpdateDateTime":"2020-12-30T17:28:40Z","createdDateTime":"2020-12-30T17:28:37Z","expirationDateTime":"2020-12-31T17:28:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'ac7af694-63ac-4a5b-87bd-fcf23fcc0e87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/0de2a9c2-6ee4-432f-bebf-414b2a41ebcc')
  .query(true)
  .reply(200, {"jobId":"0de2a9c2-6ee4-432f-bebf-414b2a41ebcc","lastUpdateDateTime":"2020-12-30T17:28:40Z","createdDateTime":"2020-12-30T17:28:37Z","expirationDateTime":"2020-12-31T17:28:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '66aa03f8-1cae-4d91-a311-0808baa40425',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:41 GMT'
]);

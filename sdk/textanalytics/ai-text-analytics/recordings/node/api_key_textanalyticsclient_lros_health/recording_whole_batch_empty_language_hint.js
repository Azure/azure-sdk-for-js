let nock = require('nock');

module.exports.hash = "53b8cbb2f8b9222a4857fd83eee00a3a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/c24f5468-70ad-4ce6-b662-eef807f41840',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'a454ad64-5962-4fc4-b4e4-4eacbca43b64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/c24f5468-70ad-4ce6-b662-eef807f41840')
  .query(true)
  .reply(200, {"jobId":"c24f5468-70ad-4ce6-b662-eef807f41840","lastUpdateDateTime":"2021-03-04T20:18:42Z","createdDateTime":"2021-03-04T20:18:42Z","expirationDateTime":"2021-03-05T20:18:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '8d9d9783-8151-4e0e-b771-bec3290ebfba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/c24f5468-70ad-4ce6-b662-eef807f41840')
  .query(true)
  .reply(200, {"jobId":"c24f5468-70ad-4ce6-b662-eef807f41840","lastUpdateDateTime":"2021-03-04T20:18:42Z","createdDateTime":"2021-03-04T20:18:42Z","expirationDateTime":"2021-03-05T20:18:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '894161da-20f3-4aac-8579-0687cf87b83f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/c24f5468-70ad-4ce6-b662-eef807f41840')
  .query(true)
  .reply(200, {"jobId":"c24f5468-70ad-4ce6-b662-eef807f41840","lastUpdateDateTime":"2021-03-04T20:18:44Z","createdDateTime":"2021-03-04T20:18:42Z","expirationDateTime":"2021-03-05T20:18:42Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '28ddb7a9-6b09-4cc1-b88c-986bf11cc203',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/c24f5468-70ad-4ce6-b662-eef807f41840')
  .query(true)
  .reply(200, {"jobId":"c24f5468-70ad-4ce6-b662-eef807f41840","lastUpdateDateTime":"2021-03-04T20:18:44Z","createdDateTime":"2021-03-04T20:18:42Z","expirationDateTime":"2021-03-05T20:18:42Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'a3f474b9-1a50-4696-95e4-4406628608b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:44 GMT'
]);

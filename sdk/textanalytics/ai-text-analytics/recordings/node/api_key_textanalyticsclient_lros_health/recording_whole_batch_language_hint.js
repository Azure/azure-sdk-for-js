let nock = require('nock');

module.exports.hash = "2b9b98c8788204bf3d0a1f4758dc43e5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/89ac7639-e160-4961-8fe3-dcb655ba629f',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '32707520-a81e-4bbe-8484-bd8e28214359',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/89ac7639-e160-4961-8fe3-dcb655ba629f')
  .query(true)
  .reply(200, {"jobId":"89ac7639-e160-4961-8fe3-dcb655ba629f","lastUpdateDateTime":"2021-05-12T19:05:09Z","createdDateTime":"2021-05-12T19:05:08Z","expirationDateTime":"2021-05-13T19:05:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '0ec793b3-f9a1-4a4c-a7a9-0d49229ac8be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/89ac7639-e160-4961-8fe3-dcb655ba629f')
  .query(true)
  .reply(200, {"jobId":"89ac7639-e160-4961-8fe3-dcb655ba629f","lastUpdateDateTime":"2021-05-12T19:05:09Z","createdDateTime":"2021-05-12T19:05:08Z","expirationDateTime":"2021-05-13T19:05:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '52e96a22-b617-4f88-b42c-9d5de9ab1c5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/89ac7639-e160-4961-8fe3-dcb655ba629f')
  .query(true)
  .reply(200, {"jobId":"89ac7639-e160-4961-8fe3-dcb655ba629f","lastUpdateDateTime":"2021-05-12T19:05:09Z","createdDateTime":"2021-05-12T19:05:08Z","expirationDateTime":"2021-05-13T19:05:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '187e4f71-6893-4bfa-a287-f5341ef57c5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/89ac7639-e160-4961-8fe3-dcb655ba629f')
  .query(true)
  .reply(200, {"jobId":"89ac7639-e160-4961-8fe3-dcb655ba629f","lastUpdateDateTime":"2021-05-12T19:05:12Z","createdDateTime":"2021-05-12T19:05:08Z","expirationDateTime":"2021-05-13T19:05:08Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '2716',
  'apim-request-id',
  '4e6d09e1-2952-492f-bb71-370edc722ef7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/89ac7639-e160-4961-8fe3-dcb655ba629f')
  .query(true)
  .reply(200, {"jobId":"89ac7639-e160-4961-8fe3-dcb655ba629f","lastUpdateDateTime":"2021-05-12T19:05:12Z","createdDateTime":"2021-05-12T19:05:08Z","expirationDateTime":"2021-05-13T19:05:08Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'c2954eb2-877a-496c-8f2e-a28aae41c764',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:15 GMT'
]);

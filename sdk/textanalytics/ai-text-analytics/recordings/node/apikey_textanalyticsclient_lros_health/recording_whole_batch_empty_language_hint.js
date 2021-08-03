let nock = require('nock');

module.exports.hash = "1569981548fb7e275b78787d7340dd48";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/2b9bcb7c-7405-464d-ad5b-a364e2987ed9',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '1a793e05-b385-45cf-9a6e-f54d4e3dd5c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2b9bcb7c-7405-464d-ad5b-a364e2987ed9')
  .query(true)
  .reply(200, {"jobId":"2b9bcb7c-7405-464d-ad5b-a364e2987ed9","lastUpdateDateTime":"2021-08-03T22:43:29Z","createdDateTime":"2021-08-03T22:43:29Z","expirationDateTime":"2021-08-04T22:43:29Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e8493a8b-d8de-436e-a99c-d514bf511fb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2b9bcb7c-7405-464d-ad5b-a364e2987ed9')
  .query(true)
  .reply(200, {"jobId":"2b9bcb7c-7405-464d-ad5b-a364e2987ed9","lastUpdateDateTime":"2021-08-03T22:43:29Z","createdDateTime":"2021-08-03T22:43:29Z","expirationDateTime":"2021-08-04T22:43:29Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'b1400b5b-f43e-48cb-871f-dccfb68f8cf9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2b9bcb7c-7405-464d-ad5b-a364e2987ed9')
  .query(true)
  .reply(200, {"jobId":"2b9bcb7c-7405-464d-ad5b-a364e2987ed9","lastUpdateDateTime":"2021-08-03T22:43:30Z","createdDateTime":"2021-08-03T22:43:29Z","expirationDateTime":"2021-08-04T22:43:29Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  'b415a2b6-550d-4f39-a1e3-bbf1aecec6a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/2b9bcb7c-7405-464d-ad5b-a364e2987ed9')
  .query(true)
  .reply(200, {"jobId":"2b9bcb7c-7405-464d-ad5b-a364e2987ed9","lastUpdateDateTime":"2021-08-03T22:43:30Z","createdDateTime":"2021-08-03T22:43:29Z","expirationDateTime":"2021-08-04T22:43:29Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'b52ba727-0649-4661-a0c3-a37659ce7396',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:31 GMT'
]);

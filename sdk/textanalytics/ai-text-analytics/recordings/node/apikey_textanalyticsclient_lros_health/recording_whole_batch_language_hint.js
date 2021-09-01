let nock = require('nock');

module.exports.hash = "cea98c2dd11df24fd03a475a71bfaad5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/a21ca83e-d7ab-4973-a882-a6675657dce3',
  'x-envoy-upstream-service-time',
  '256',
  'apim-request-id',
  'ae77dcdd-1197-44f2-9a2b-6e0d99e2ee2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a21ca83e-d7ab-4973-a882-a6675657dce3')
  .query(true)
  .reply(200, {"jobId":"a21ca83e-d7ab-4973-a882-a6675657dce3","lastUpdateDateTime":"2021-08-03T22:43:24Z","createdDateTime":"2021-08-03T22:43:24Z","expirationDateTime":"2021-08-04T22:43:24Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'dbc8141a-574d-417e-823e-249561688212',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a21ca83e-d7ab-4973-a882-a6675657dce3')
  .query(true)
  .reply(200, {"jobId":"a21ca83e-d7ab-4973-a882-a6675657dce3","lastUpdateDateTime":"2021-08-03T22:43:24Z","createdDateTime":"2021-08-03T22:43:24Z","expirationDateTime":"2021-08-04T22:43:24Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8fbf618a-0b20-4f50-9971-2bc661551bc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a21ca83e-d7ab-4973-a882-a6675657dce3')
  .query(true)
  .reply(200, {"jobId":"a21ca83e-d7ab-4973-a882-a6675657dce3","lastUpdateDateTime":"2021-08-03T22:43:24Z","createdDateTime":"2021-08-03T22:43:24Z","expirationDateTime":"2021-08-04T22:43:24Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '0e7c024e-eb34-46c9-8744-d3320874ebd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a21ca83e-d7ab-4973-a882-a6675657dce3')
  .query(true)
  .reply(200, {"jobId":"a21ca83e-d7ab-4973-a882-a6675657dce3","lastUpdateDateTime":"2021-08-03T22:43:27Z","createdDateTime":"2021-08-03T22:43:24Z","expirationDateTime":"2021-08-04T22:43:24Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '285d5807-7401-4ab7-9680-c227a3873de7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a21ca83e-d7ab-4973-a882-a6675657dce3')
  .query(true)
  .reply(200, {"jobId":"a21ca83e-d7ab-4973-a882-a6675657dce3","lastUpdateDateTime":"2021-08-03T22:43:27Z","createdDateTime":"2021-08-03T22:43:24Z","expirationDateTime":"2021-08-04T22:43:24Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '460a45d0-9fbd-4bc1-bee6-1d9103f3ee8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:28 GMT'
]);

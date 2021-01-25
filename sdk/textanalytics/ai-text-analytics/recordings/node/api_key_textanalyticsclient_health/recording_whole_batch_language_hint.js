let nock = require('nock');

module.exports.hash = "50df86296e2934da61ab33a01e362ca0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/75e1563c-8c4e-4c05-938c-4b92da4d4579',
  'x-envoy-upstream-service-time',
  '298',
  'apim-request-id',
  'c25848e4-9a9e-4f4f-9757-a68560500fd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/75e1563c-8c4e-4c05-938c-4b92da4d4579')
  .query(true)
  .reply(200, {"jobId":"75e1563c-8c4e-4c05-938c-4b92da4d4579","lastUpdateDateTime":"2020-11-20T00:13:18Z","createdDateTime":"2020-11-20T00:13:17Z","expirationDateTime":"2020-11-21T00:13:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '41150562-194d-40c2-b9d2-0e18c92c8413',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/75e1563c-8c4e-4c05-938c-4b92da4d4579')
  .query(true)
  .reply(200, {"jobId":"75e1563c-8c4e-4c05-938c-4b92da4d4579","lastUpdateDateTime":"2020-11-20T00:13:18Z","createdDateTime":"2020-11-20T00:13:17Z","expirationDateTime":"2020-11-21T00:13:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ce62904f-e0bd-4b2c-a870-6fe0223dfcb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/75e1563c-8c4e-4c05-938c-4b92da4d4579')
  .query(true)
  .reply(200, {"jobId":"75e1563c-8c4e-4c05-938c-4b92da4d4579","lastUpdateDateTime":"2020-11-20T00:13:18Z","createdDateTime":"2020-11-20T00:13:17Z","expirationDateTime":"2020-11-21T00:13:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '590',
  'apim-request-id',
  'e27c6eec-c9a7-43a3-9042-4620ccea94c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/75e1563c-8c4e-4c05-938c-4b92da4d4579')
  .query(true)
  .reply(200, {"jobId":"75e1563c-8c4e-4c05-938c-4b92da4d4579","lastUpdateDateTime":"2020-11-20T00:13:18Z","createdDateTime":"2020-11-20T00:13:17Z","expirationDateTime":"2020-11-21T00:13:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'f66e29e5-c652-4030-9c9d-b8057e11841b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:20 GMT'
]);

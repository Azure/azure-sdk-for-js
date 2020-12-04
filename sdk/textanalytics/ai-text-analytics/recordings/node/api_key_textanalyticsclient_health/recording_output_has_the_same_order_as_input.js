let nock = require('nock');

module.exports.hash = "cca3d852367a8f22e560c9113bc0d622";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/84bcc8b5-6e78-4d3a-8048-530da6c71155',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '0fa65a89-bc1a-4bab-b5f6-f64a41c4aa69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/84bcc8b5-6e78-4d3a-8048-530da6c71155')
  .query(true)
  .reply(200, {"jobId":"84bcc8b5-6e78-4d3a-8048-530da6c71155","lastUpdateDateTime":"2020-11-20T00:13:08Z","createdDateTime":"2020-11-20T00:13:08Z","expirationDateTime":"2020-11-21T00:13:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3513113b-d853-474a-bd56-4081f66d5a78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/84bcc8b5-6e78-4d3a-8048-530da6c71155')
  .query(true)
  .reply(200, {"jobId":"84bcc8b5-6e78-4d3a-8048-530da6c71155","lastUpdateDateTime":"2020-11-20T00:13:08Z","createdDateTime":"2020-11-20T00:13:08Z","expirationDateTime":"2020-11-21T00:13:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'dea20992-e8ad-460d-b267-7c2ffb7aa398',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/84bcc8b5-6e78-4d3a-8048-530da6c71155')
  .query(true)
  .reply(200, {"jobId":"84bcc8b5-6e78-4d3a-8048-530da6c71155","lastUpdateDateTime":"2020-11-20T00:13:09Z","createdDateTime":"2020-11-20T00:13:08Z","expirationDateTime":"2020-11-21T00:13:08Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":0,"length":3,"text":"one","category":"Dosage","confidenceScore":0.77,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[{"offset":0,"length":3,"text":"two","category":"Dosage","confidenceScore":0.62,"isNegated":false}],"relations":[],"warnings":[]},{"id":"3","entities":[{"offset":0,"length":5,"text":"three","category":"Dosage","confidenceScore":0.61,"isNegated":false}],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '7c25a78c-24cb-445d-ab7e-b4259a69aacd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/84bcc8b5-6e78-4d3a-8048-530da6c71155')
  .query(true)
  .reply(200, {"jobId":"84bcc8b5-6e78-4d3a-8048-530da6c71155","lastUpdateDateTime":"2020-11-20T00:13:09Z","createdDateTime":"2020-11-20T00:13:08Z","expirationDateTime":"2020-11-21T00:13:08Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":0,"length":3,"text":"one","category":"Dosage","confidenceScore":0.77,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[{"offset":0,"length":3,"text":"two","category":"Dosage","confidenceScore":0.62,"isNegated":false}],"relations":[],"warnings":[]},{"id":"3","entities":[{"offset":0,"length":5,"text":"three","category":"Dosage","confidenceScore":0.61,"isNegated":false}],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '4a885b47-f2a0-40e3-b7c1-7e7dafe29e00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:11 GMT'
]);

let nock = require('nock');

module.exports.hash = "73c72038e29468359d9a574b8fd7d944";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/36ebc47a-0dd7-40aa-a490-7fa126b4ad0c',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'f7b07656-788d-49cd-86a7-0a239a06e31b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/36ebc47a-0dd7-40aa-a490-7fa126b4ad0c')
  .query(true)
  .reply(200, {"jobId":"36ebc47a-0dd7-40aa-a490-7fa126b4ad0c","lastUpdateDateTime":"2020-12-22T20:07:28Z","createdDateTime":"2020-12-22T20:07:28Z","expirationDateTime":"2020-12-23T20:07:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '86ced37f-789e-45db-9a68-1f8b38e73174',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/36ebc47a-0dd7-40aa-a490-7fa126b4ad0c')
  .query(true)
  .reply(200, {"jobId":"36ebc47a-0dd7-40aa-a490-7fa126b4ad0c","lastUpdateDateTime":"2020-12-22T20:07:28Z","createdDateTime":"2020-12-22T20:07:28Z","expirationDateTime":"2020-12-23T20:07:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1ab38103-99e3-4215-9eda-fdd4d9bde674',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/36ebc47a-0dd7-40aa-a490-7fa126b4ad0c')
  .query(true)
  .reply(200, {"jobId":"36ebc47a-0dd7-40aa-a490-7fa126b4ad0c","lastUpdateDateTime":"2020-12-22T20:07:28Z","createdDateTime":"2020-12-22T20:07:28Z","expirationDateTime":"2020-12-23T20:07:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6f1352f8-5b33-4748-a170-f2ae4853eb71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/36ebc47a-0dd7-40aa-a490-7fa126b4ad0c')
  .query(true)
  .reply(200, {"jobId":"36ebc47a-0dd7-40aa-a490-7fa126b4ad0c","lastUpdateDateTime":"2020-12-22T20:07:28Z","createdDateTime":"2020-12-22T20:07:28Z","expirationDateTime":"2020-12-23T20:07:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ece389fa-1cc7-4e2e-81a1-28faa66878b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/36ebc47a-0dd7-40aa-a490-7fa126b4ad0c')
  .query(true)
  .reply(200, {"jobId":"36ebc47a-0dd7-40aa-a490-7fa126b4ad0c","lastUpdateDateTime":"2020-12-22T20:07:34Z","createdDateTime":"2020-12-22T20:07:28Z","expirationDateTime":"2020-12-23T20:07:28Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c552572a-e3fc-40f2-a687-6f413e400e42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/36ebc47a-0dd7-40aa-a490-7fa126b4ad0c')
  .query(true)
  .reply(200, {"jobId":"36ebc47a-0dd7-40aa-a490-7fa126b4ad0c","lastUpdateDateTime":"2020-12-22T20:07:35Z","createdDateTime":"2020-12-22T20:07:28Z","expirationDateTime":"2020-12-23T20:07:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":0,"length":3,"text":"one","category":"Dosage","confidenceScore":0.77,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[{"offset":0,"length":3,"text":"two","category":"Dosage","confidenceScore":0.62,"isNegated":false}],"relations":[],"warnings":[]},{"id":"3","entities":[{"offset":0,"length":5,"text":"three","category":"Dosage","confidenceScore":0.61,"isNegated":false}],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'e04adfb4-cecd-4b3f-8a13-9d77ae20a149',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/36ebc47a-0dd7-40aa-a490-7fa126b4ad0c')
  .query(true)
  .reply(200, {"jobId":"36ebc47a-0dd7-40aa-a490-7fa126b4ad0c","lastUpdateDateTime":"2020-12-22T20:07:35Z","createdDateTime":"2020-12-22T20:07:28Z","expirationDateTime":"2020-12-23T20:07:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":0,"length":3,"text":"one","category":"Dosage","confidenceScore":0.77,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[{"offset":0,"length":3,"text":"two","category":"Dosage","confidenceScore":0.62,"isNegated":false}],"relations":[],"warnings":[]},{"id":"3","entities":[{"offset":0,"length":5,"text":"three","category":"Dosage","confidenceScore":0.61,"isNegated":false}],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '56873f10-70c0-4c94-a0fa-7232d87cd013',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:07:36 GMT'
]);

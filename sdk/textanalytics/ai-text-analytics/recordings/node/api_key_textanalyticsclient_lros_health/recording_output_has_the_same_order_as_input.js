let nock = require('nock');

module.exports.hash = "ff8384019112408d9d573388002dce7c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/ec6556b7-5dc7-4235-8607-7572864184b7',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  '1d7db52d-a430-4429-8f73-bcf3737d135b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ec6556b7-5dc7-4235-8607-7572864184b7')
  .query(true)
  .reply(200, {"jobId":"ec6556b7-5dc7-4235-8607-7572864184b7","lastUpdateDateTime":"2020-12-30T17:28:23Z","createdDateTime":"2020-12-30T17:28:23Z","expirationDateTime":"2020-12-31T17:28:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '3ad5014d-397b-48d3-abd8-bb4b6c5facc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ec6556b7-5dc7-4235-8607-7572864184b7')
  .query(true)
  .reply(200, {"jobId":"ec6556b7-5dc7-4235-8607-7572864184b7","lastUpdateDateTime":"2020-12-30T17:28:23Z","createdDateTime":"2020-12-30T17:28:23Z","expirationDateTime":"2020-12-31T17:28:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f2874e8a-629b-4ba3-a973-2ab26cd4d577',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ec6556b7-5dc7-4235-8607-7572864184b7')
  .query(true)
  .reply(200, {"jobId":"ec6556b7-5dc7-4235-8607-7572864184b7","lastUpdateDateTime":"2020-12-30T17:28:23Z","createdDateTime":"2020-12-30T17:28:23Z","expirationDateTime":"2020-12-31T17:28:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '9a228de3-8ffe-4660-9676-ff7ea0533467',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ec6556b7-5dc7-4235-8607-7572864184b7')
  .query(true)
  .reply(200, {"jobId":"ec6556b7-5dc7-4235-8607-7572864184b7","lastUpdateDateTime":"2020-12-30T17:28:26Z","createdDateTime":"2020-12-30T17:28:23Z","expirationDateTime":"2020-12-31T17:28:23Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":0,"length":3,"text":"one","category":"Dosage","confidenceScore":0.77,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[{"offset":0,"length":3,"text":"two","category":"Dosage","confidenceScore":0.62,"isNegated":false}],"relations":[],"warnings":[]},{"id":"3","entities":[{"offset":0,"length":5,"text":"three","category":"Dosage","confidenceScore":0.61,"isNegated":false}],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'dcfc489e-e3f9-4c11-8509-50a0965e05ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/ec6556b7-5dc7-4235-8607-7572864184b7')
  .query(true)
  .reply(200, {"jobId":"ec6556b7-5dc7-4235-8607-7572864184b7","lastUpdateDateTime":"2020-12-30T17:28:26Z","createdDateTime":"2020-12-30T17:28:23Z","expirationDateTime":"2020-12-31T17:28:23Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[{"offset":0,"length":3,"text":"one","category":"Dosage","confidenceScore":0.77,"isNegated":false}],"relations":[],"warnings":[]},{"id":"2","entities":[{"offset":0,"length":3,"text":"two","category":"Dosage","confidenceScore":0.62,"isNegated":false}],"relations":[],"warnings":[]},{"id":"3","entities":[{"offset":0,"length":5,"text":"three","category":"Dosage","confidenceScore":0.61,"isNegated":false}],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '2101776e-2d3b-4900-9c2f-4b5b2ee1ebd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:26 GMT'
]);

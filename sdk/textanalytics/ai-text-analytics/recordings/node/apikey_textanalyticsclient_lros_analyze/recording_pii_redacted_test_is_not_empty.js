let nock = require('nock');

module.exports.hash = "782a96cbf88cb2448cd7eb594e95d410";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/315806d9-6def-4e2b-ae44-719c9c7207f2',
  'x-envoy-upstream-service-time',
  '362',
  'apim-request-id',
  'ddce8a2d-31df-4be2-b600-aac443d2f3b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/315806d9-6def-4e2b-ae44-719c9c7207f2')
  .query(true)
  .reply(200, {"jobId":"315806d9-6def-4e2b-ae44-719c9c7207f2","lastUpdateDateTime":"2021-10-23T00:40:54Z","createdDateTime":"2021-10-23T00:40:54Z","expirationDateTime":"2021-10-24T00:40:54Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '15dd2452-4b85-4f95-b5be-84de0ed11aed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/315806d9-6def-4e2b-ae44-719c9c7207f2')
  .query(true)
  .reply(200, {"jobId":"315806d9-6def-4e2b-ae44-719c9c7207f2","lastUpdateDateTime":"2021-10-23T00:40:54Z","createdDateTime":"2021-10-23T00:40:54Z","expirationDateTime":"2021-10-24T00:40:54Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '00fd09e3-4abf-4972-902e-49bbdd69490c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/315806d9-6def-4e2b-ae44-719c9c7207f2')
  .query(true)
  .reply(200, {"jobId":"315806d9-6def-4e2b-ae44-719c9c7207f2","lastUpdateDateTime":"2021-10-23T00:40:55Z","createdDateTime":"2021-10-23T00:40:54Z","expirationDateTime":"2021-10-24T00:40:54Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'a5fb01eb-7123-4667-8d19-9f9726542f93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/315806d9-6def-4e2b-ae44-719c9c7207f2')
  .query(true)
  .reply(200, {"jobId":"315806d9-6def-4e2b-ae44-719c9c7207f2","lastUpdateDateTime":"2021-10-23T00:40:55Z","createdDateTime":"2021-10-23T00:40:54Z","expirationDateTime":"2021-10-24T00:40:54Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'da4e3eb4-2bbd-4e3f-ae62-489859024923',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:40:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/315806d9-6def-4e2b-ae44-719c9c7207f2')
  .query(true)
  .reply(200, {"jobId":"315806d9-6def-4e2b-ae44-719c9c7207f2","lastUpdateDateTime":"2021-10-23T00:40:55Z","createdDateTime":"2021-10-23T00:40:54Z","expirationDateTime":"2021-10-24T00:40:54Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '9ae72e9f-caa8-456e-9924-a0a3c4e2d40b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/315806d9-6def-4e2b-ae44-719c9c7207f2')
  .query(true)
  .reply(200, {"jobId":"315806d9-6def-4e2b-ae44-719c9c7207f2","lastUpdateDateTime":"2021-10-23T00:41:02Z","createdDateTime":"2021-10-23T00:40:54Z","expirationDateTime":"2021-10-24T00:40:54Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:41:02.0526629Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'c5116e72-9ea5-41ae-ae6f-f4bd0093a730',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/315806d9-6def-4e2b-ae44-719c9c7207f2')
  .query(true)
  .reply(200, {"jobId":"315806d9-6def-4e2b-ae44-719c9c7207f2","lastUpdateDateTime":"2021-10-23T00:41:02Z","createdDateTime":"2021-10-23T00:40:54Z","expirationDateTime":"2021-10-24T00:40:54Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:41:02.0526629Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  'e7cabfd9-d95d-4037-a1a5-542b3ade1319',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:03 GMT'
]);

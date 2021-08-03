let nock = require('nock');

module.exports.hash = "0627b94eef6a969b005adf51cea00788";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/e3b97046-51e3-4cba-a120-2370e663cb11',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '01d291c8-4f4e-44df-9f6c-6747984846c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/e3b97046-51e3-4cba-a120-2370e663cb11')
  .query(true)
  .reply(200, {"jobId":"e3b97046-51e3-4cba-a120-2370e663cb11","lastUpdateDateTime":"2021-08-03T03:10:04Z","createdDateTime":"2021-08-03T03:10:04Z","expirationDateTime":"2021-08-04T03:10:04Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'cdec2a86-c7b7-4e69-a728-e02cc84388c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/e3b97046-51e3-4cba-a120-2370e663cb11')
  .query(true)
  .reply(200, {"jobId":"e3b97046-51e3-4cba-a120-2370e663cb11","lastUpdateDateTime":"2021-08-03T03:10:04Z","createdDateTime":"2021-08-03T03:10:04Z","expirationDateTime":"2021-08-04T03:10:04Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1cc88c7e-d8cb-444a-947f-0dea1bd25d8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:03 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/e3b97046-51e3-4cba-a120-2370e663cb11')
  .query(true)
  .reply(200, {"jobId":"e3b97046-51e3-4cba-a120-2370e663cb11","lastUpdateDateTime":"2021-08-03T03:10:06Z","createdDateTime":"2021-08-03T03:10:04Z","expirationDateTime":"2021-08-04T03:10:04Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c101860e-1f17-43f7-bc26-80d243ef4860',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:05 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/e3b97046-51e3-4cba-a120-2370e663cb11')
  .query(true)
  .reply(200, {"jobId":"e3b97046-51e3-4cba-a120-2370e663cb11","lastUpdateDateTime":"2021-08-03T03:10:06Z","createdDateTime":"2021-08-03T03:10:04Z","expirationDateTime":"2021-08-04T03:10:04Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '39c82c1e-5828-4c37-8ca3-81af8408a219',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/e3b97046-51e3-4cba-a120-2370e663cb11')
  .query(true)
  .reply(200, {"jobId":"e3b97046-51e3-4cba-a120-2370e663cb11","lastUpdateDateTime":"2021-08-03T03:10:06Z","createdDateTime":"2021-08-03T03:10:04Z","expirationDateTime":"2021-08-04T03:10:04Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '36525176-30ce-44ff-b3b9-4a125af1b71d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:10 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/e3b97046-51e3-4cba-a120-2370e663cb11')
  .query(true)
  .reply(200, {"jobId":"e3b97046-51e3-4cba-a120-2370e663cb11","lastUpdateDateTime":"2021-08-03T03:10:12Z","createdDateTime":"2021-08-03T03:10:04Z","expirationDateTime":"2021-08-04T03:10:04Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:10:12.198839Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '79114f7a-2eff-4b5e-9d8f-5e83d841e22c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:12 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/e3b97046-51e3-4cba-a120-2370e663cb11')
  .query(true)
  .reply(200, {"jobId":"e3b97046-51e3-4cba-a120-2370e663cb11","lastUpdateDateTime":"2021-08-03T03:10:12Z","createdDateTime":"2021-08-03T03:10:04Z","expirationDateTime":"2021-08-04T03:10:04Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:10:12.198839Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '32356e06-a358-4160-8926-82b5a3ff0fd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:12 GMT'
]);

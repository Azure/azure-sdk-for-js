let nock = require('nock');

module.exports.hash = "3762baf9b0060053b2d28b16ac486e17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a',
  'x-envoy-upstream-service-time',
  '390',
  'apim-request-id',
  '74479ec9-2389-47be-9989-e21c8104de4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:38:47Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2f0255bd-7922-4c05-8ab6-8fac2ba9cdf7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:38:47Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2cd520b0-0a0d-493d-8878-5dc33d297d85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:38:47Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b97848f5-c60d-4a1b-b4e1-3adfa29a74a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:38:50Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:50.5611939Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'e1bff7d2-72a2-4158-8fb6-b9e705edb2d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:38:53Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"running","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:50.5611939Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  'bb3bbe19-1e50-432c-b771-737dffc992d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:38:55Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:55.76482Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:50.5611939Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '249',
  'apim-request-id',
  '8fbc116d-8d7a-469b-bfc9-840eb773b84a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:38:55Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:55.76482Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:50.5611939Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  'a9e4c43d-7e05-46f8-80c9-ab9ce3b0341c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:38:55Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:55.76482Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:50.5611939Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '390',
  'apim-request-id',
  '508d2bc2-7c12-49a0-be89-4c798a4fc4f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:39:02Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:55.76482Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:50.5611939Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:02.2240583Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '344',
  'apim-request-id',
  '5471cf06-162f-4d91-bd16-4fc85c8b1569',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/3044e606-e1bf-4d69-853d-8fb04716070a')
  .query(true)
  .reply(200, {"jobId":"3044e606-e1bf-4d69-853d-8fb04716070a","lastUpdateDateTime":"2021-10-23T00:39:02Z","createdDateTime":"2021-10-23T00:38:47Z","expirationDateTime":"2021-10-24T00:38:47Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:55.76482Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:50.5611939Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:02.2240583Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '272',
  'apim-request-id',
  '1dd3ccff-2038-49ec-bb1f-9b0aee9913f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:02 GMT'
]);

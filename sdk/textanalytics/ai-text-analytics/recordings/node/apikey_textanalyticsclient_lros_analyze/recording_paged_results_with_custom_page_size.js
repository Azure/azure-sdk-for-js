let nock = require('nock');

module.exports.hash = "fdbd3ce95981ac4c2f94eeac2ac5aa32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb',
  'x-envoy-upstream-service-time',
  '684',
  'apim-request-id',
  '5b2c61ab-86ce-4250-83d4-6ac3947e6c97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:15Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '132e80f1-2b6e-46da-874c-41efc03d0316',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:15Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '2c5da900-472f-430d-90df-4652df8881f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:16Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b2e54e81-5d7d-4034-84af-c029e904deb6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:16 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:16Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f6753208-ded6-4edf-8805-a27fbdccaf9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:18 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:16Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '9348a25f-ae39-45c1-bb66-4e857070a82d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:20 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:22Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '63d0c1ea-3bc1-4636-985c-cbf06229747f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:22 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  '211432da-5c09-4fdd-85fc-52f79de6ff1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:24 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '60300efc-1ab2-4c5d-b008-91ccddf41bdd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:27 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  '2cc38155-0116-4b23-bf9b-e9f4da6f15f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:29 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  'ef0e51be-8491-4027-9011-56ca0c2e44e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:31 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  '0a5ef31a-2aaa-4858-ad9d-630f1f95d11c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:34 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  '2e4cc099-0b53-4ad4-9246-3fa7c293e3a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '212',
  'apim-request-id',
  '3dddcacf-d664-47ee-9179-9661097e6749',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:39 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  'b81246e9-b56e-4d0a-87bf-58967c70c3c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:41 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  'e719497a-1dd3-499a-861e-54a285ecddd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  '86183657-4f49-4b51-b03b-b1c44d92e8e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:46 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  'e887ef51-da5b-4090-ab38-ff5432bcc79e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:48 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  'aae4aa86-dfc9-451d-8d3f-0a2909cd6ef9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:50 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'fce6e5cb-63e5-4a31-85c9-ae12989aea32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:52 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'e85530f3-fb87-4aa0-a7b5-95f6730f42ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:55 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  '85e64ee9-a46c-4214-9ec5-542f052dcccf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '1c5eee5b-96c9-491f-94d3-16a2190ac1e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'e97db2f1-a9c4-423e-acea-1fcf718e703c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '340',
  'apim-request-id',
  '02d8450e-821d-4e8f-9194-b2b88037e379',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:04 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  '4dc7bf9e-ad74-4cff-93ac-9db02a620c5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:06 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  'aedfc795-dea1-4eb3-b09c-47265af2b60a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  '1318c75e-54d0-4a29-b5ca-18bde16ef221',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:11 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  'e872d67b-db88-4cf7-b5d3-50f97f7b29d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  '296e2517-e757-4aab-b41b-3701acdd75f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:15 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  '00803de2-3ece-4cdc-b41c-651652cb0719',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:17 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:13:23Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  '48aeebe1-a6a3-4a5a-b090-6ffa84788e49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:20 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:14:22Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  '58d9469a-3339-4cd0-beeb-1fe4612d393e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:22 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:14:24Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:24.050491Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '427',
  'apim-request-id',
  'ddcdf0af-2fb0-4ae4-8f75-50653c92218a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:24 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:14:24Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:24.050491Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=10&$top=10&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '282',
  'apim-request-id',
  '39a795bf-dc7b-44e3-81fb-2c0ca8ced820',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:25 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:14:24Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:24.050491Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '277',
  'apim-request-id',
  '0042a8e3-5781-4606-bde7-39a53e3fdc32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:25 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/58b8a20d-727f-4979-9266-52747dc318fb')
  .query(true)
  .reply(200, {"jobId":"58b8a20d-727f-4979-9266-52747dc318fb","lastUpdateDateTime":"2021-08-03T03:14:24Z","createdDateTime":"2021-08-03T03:13:14Z","expirationDateTime":"2021-08-04T03:13:14Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:23.9648777Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:24.050491Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '2d12776b-48f8-4523-a41e-f5ecf6e69b94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:25 GMT'
]);

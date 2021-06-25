let nock = require('nock');

module.exports.hash = "fcf347f6cb241de657ea5d5a47554eaf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69',
  'x-envoy-upstream-service-time',
  '768',
  'apim-request-id',
  '8743ed78-e487-402c-b3c8-e443affc225e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:54:51Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b7543782-54d5-4e5d-a0eb-2fc610f3bf2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:54:51Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '482a627e-940d-4214-8813-c37d5bb42643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:54:51Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e7c7c200-3222-4a0b-8957-6a462e99aab2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:54:51Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f8113aec-e367-479e-839c-8be3f5050069',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:54:57Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd679ab8d-0ffd-4dec-8eda-d6a28ae2bf20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:54:59Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":1,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:58.4255638Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  'c0eeff2b-f28d-48a3-b69c-bdd5fb563421',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:55:00Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:58.4255638Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:00.8189036Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '404',
  'apim-request-id',
  'f29ba5a8-2efb-48bb-8baa-e3244db8db69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:55:00Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:58.4255638Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:00.8189036Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69?$skip=10&$top=10&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '278',
  'apim-request-id',
  '9c5ea9a9-54e6-47c6-9980-c4694df67d92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:55:00Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:58.4255638Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:00.8189036Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69?$skip=20&$top=5&showStats=False"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '295',
  'apim-request-id',
  'cd2e9994-af09-49b5-b603-7f76c4e3a06c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/df7cd524-a6fe-455b-a63f-68d2a7e44e69')
  .query(true)
  .reply(200, {"jobId":"df7cd524-a6fe-455b-a63f-68d2a7e44e69","lastUpdateDateTime":"2021-06-25T19:55:00Z","createdDateTime":"2021-06-25T19:54:50Z","expirationDateTime":"2021-06-26T19:54:50Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:58.4255638Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:55:00.8189036Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'e01b076c-395e-4f89-af8f-9fd6282495b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:02 GMT'
]);

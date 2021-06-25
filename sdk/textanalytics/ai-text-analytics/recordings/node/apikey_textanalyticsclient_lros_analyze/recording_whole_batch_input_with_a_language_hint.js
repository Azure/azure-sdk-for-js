let nock = require('nock');

module.exports.hash = "4ffd3e67d009b80590ba217bf3c541ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a',
  'x-envoy-upstream-service-time',
  '257',
  'apim-request-id',
  '7b467243-d53a-4db6-b11f-08ca5843753e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:08Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b1e81c09-8931-4ca6-9b3e-4708bd90389f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:08Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '33947db5-07ab-421b-a79e-ed0db5f1b245',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:09Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a886eb66-24e3-4cb3-b634-84cf0018afbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:11Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ca809cd1-1fc9-484f-b765-75575c67d2b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:11Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '85aa6e82-a3ac-495a-b9ef-8d8978d72cdf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:11Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5bc20038-6e3e-45e9-87f8-6f19465a8477',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:11Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '5ac124da-d03c-4a22-8a84-442f8a8bf497',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:11Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '8f26050e-67d4-4a56-ae7a-6847b8ab4c47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:11Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '687aacc3-41bc-46d9-93e0-c66c9b194339',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:11Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd69fec67-a430-4f44-93e4-24c2b3a903f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:27Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:27.0832107Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'a288665b-c395-4a68-b549-2ea020e158e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:29Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:29.4045408Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:27.0832107Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '916c1851-cfc6-4950-b156-57363395e200',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:29Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:29.4045408Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:27.0832107Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '04557aa8-6195-4015-9d20-c44ef6e06097',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:33Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:29.4045408Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:27.0832107Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:33.9261088Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '31c2adc4-9726-4d5b-bb3e-afdb112669e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/40dedd22-c918-4b5e-8e21-be9bddcaae5a')
  .query(true)
  .reply(200, {"jobId":"40dedd22-c918-4b5e-8e21-be9bddcaae5a","lastUpdateDateTime":"2021-06-25T19:54:33Z","createdDateTime":"2021-06-25T19:54:08Z","expirationDateTime":"2021-06-26T19:54:08Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:29.4045408Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:27.0832107Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:54:33.9261088Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '13126df1-6737-4fde-92d0-785cbbc9c5e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:54:33 GMT'
]);

let nock = require('nock');

module.exports.hash = "ce68d594d903ed92dd603e6d0dc15d1d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":"w"},{"id":"19","text":":P"},{"id":"1","text":":D"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce',
  'x-envoy-upstream-service-time',
  '438',
  'apim-request-id',
  '2f699a23-24c4-49a4-b5bc-ac0325b81c6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:25Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '75228dd9-fcd6-4210-b335-c74b7cb80db9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:25Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'ca559e99-267b-451e-81dd-7eb45b5b81e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:25Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b11009e0-27a7-4cf5-af63-1feb914fa561',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:25Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '29ea279a-6752-4a0f-8595-dc3682d1b14f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:31Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '63086936-e35e-4b72-b404-e728813a5dea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:33Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '383ff65d-3dc2-4736-83df-c3a51d674026',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:33Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'd1a6afb6-3e21-4103-aa22-2c3e2d25c3f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:33Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '4a0f4f96-0646-42e5-b3c6-b3e71bc0c033',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:40Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:40.1975875Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '4dcc8576-491b-4555-9e5f-f1b3d5de70cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:40Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:40.1975875Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '9ad529f7-8553-4dc7-a861-79a1e03b6af9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:40Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:40.1975875Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '7785a341-a6a2-4800-abe6-f12b25457cb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:40Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:40.1975875Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'ddcd0f3e-3cff-4bd6-9ae2-77af017eed00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:40Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:40.1975875Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'adf300d4-82e5-4270-b48b-9d2f0abfd57d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:50Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:50.6708537Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:40.1975875Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  '19ea55b1-7fad-4235-8d60-e17a3e4f88a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2ede272a-0f96-4ea8-a1a7-b6f04f223fce')
  .query(true)
  .reply(200, {"jobId":"2ede272a-0f96-4ea8-a1a7-b6f04f223fce","lastUpdateDateTime":"2021-06-25T19:51:50Z","createdDateTime":"2021-06-25T19:51:25Z","expirationDateTime":"2021-06-26T19:51:25Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:50.6708537Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:31.8517641Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:40.1975875Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '253',
  'apim-request-id',
  '1ae2f2a9-e891-425e-83fb-52100f88e1e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:52 GMT'
]);

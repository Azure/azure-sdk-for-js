let nock = require('nock');

module.exports.hash = "b6dab0e11a2daa4075c7fcd42cd9c5a6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":"w"},{"id":"19","text":":P"},{"id":"1","text":":D"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/83284ce9-0a65-47c3-98fb-1874d8a83d87',
  'x-envoy-upstream-service-time',
  '319',
  'apim-request-id',
  '880649b0-d0d9-4593-8e71-3ae7ec1b4ecb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/83284ce9-0a65-47c3-98fb-1874d8a83d87')
  .query(true)
  .reply(200, {"jobId":"83284ce9-0a65-47c3-98fb-1874d8a83d87","lastUpdateDateTime":"2021-08-03T22:40:26Z","createdDateTime":"2021-08-03T22:40:25Z","expirationDateTime":"2021-08-04T22:40:25Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '024c8428-992d-4ba7-a7ff-a0234bd2b7c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/83284ce9-0a65-47c3-98fb-1874d8a83d87')
  .query(true)
  .reply(200, {"jobId":"83284ce9-0a65-47c3-98fb-1874d8a83d87","lastUpdateDateTime":"2021-08-03T22:40:26Z","createdDateTime":"2021-08-03T22:40:25Z","expirationDateTime":"2021-08-04T22:40:25Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '74b9f080-8e41-4368-801f-8a2bee71f013',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/83284ce9-0a65-47c3-98fb-1874d8a83d87')
  .query(true)
  .reply(200, {"jobId":"83284ce9-0a65-47c3-98fb-1874d8a83d87","lastUpdateDateTime":"2021-08-03T22:40:26Z","createdDateTime":"2021-08-03T22:40:25Z","expirationDateTime":"2021-08-04T22:40:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '69fc6a59-99b8-4928-8350-4a31a5ad6916',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/83284ce9-0a65-47c3-98fb-1874d8a83d87')
  .query(true)
  .reply(200, {"jobId":"83284ce9-0a65-47c3-98fb-1874d8a83d87","lastUpdateDateTime":"2021-08-03T22:40:26Z","createdDateTime":"2021-08-03T22:40:25Z","expirationDateTime":"2021-08-04T22:40:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '4dde2e0d-42bc-429c-9851-e5e16cbf4509',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/83284ce9-0a65-47c3-98fb-1874d8a83d87')
  .query(true)
  .reply(200, {"jobId":"83284ce9-0a65-47c3-98fb-1874d8a83d87","lastUpdateDateTime":"2021-08-03T22:40:26Z","createdDateTime":"2021-08-03T22:40:25Z","expirationDateTime":"2021-08-04T22:40:25Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2bfeb8fe-43c3-44da-b2d5-3c02922ff346',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/83284ce9-0a65-47c3-98fb-1874d8a83d87')
  .query(true)
  .reply(200, {"jobId":"83284ce9-0a65-47c3-98fb-1874d8a83d87","lastUpdateDateTime":"2021-08-03T22:40:32Z","createdDateTime":"2021-08-03T22:40:25Z","expirationDateTime":"2021-08-04T22:40:25Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T22:40:32.5084993Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:40:32.6394933Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:40:32.5598876Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '233',
  'apim-request-id',
  '12cfcda0-da72-45a8-899b-413cad0b6a5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/83284ce9-0a65-47c3-98fb-1874d8a83d87')
  .query(true)
  .reply(200, {"jobId":"83284ce9-0a65-47c3-98fb-1874d8a83d87","lastUpdateDateTime":"2021-08-03T22:40:32Z","createdDateTime":"2021-08-03T22:40:25Z","expirationDateTime":"2021-08-04T22:40:25Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T22:40:32.5084993Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:40:32.6394933Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:40:32.5598876Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '286',
  'apim-request-id',
  '625cd299-94cd-44dc-8b7a-539903079a09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:34 GMT'
]);

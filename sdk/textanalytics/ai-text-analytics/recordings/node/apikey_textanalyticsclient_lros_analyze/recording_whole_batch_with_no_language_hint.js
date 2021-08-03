let nock = require('nock');

module.exports.hash = "7a9444d84d6e0c6d520177fc6448a80c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  '6cfe0859-e06c-4b35-afd8-f21a67736423',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18')
  .query(true)
  .reply(200, {"jobId":"aac7fe2d-f05b-4e77-8680-ad1677ca5d18","lastUpdateDateTime":"2021-08-03T03:12:33Z","createdDateTime":"2021-08-03T03:12:33Z","expirationDateTime":"2021-08-04T03:12:33Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '560c5689-c85f-4f57-8f3e-cec78e9894c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18')
  .query(true)
  .reply(200, {"jobId":"aac7fe2d-f05b-4e77-8680-ad1677ca5d18","lastUpdateDateTime":"2021-08-03T03:12:33Z","createdDateTime":"2021-08-03T03:12:33Z","expirationDateTime":"2021-08-04T03:12:33Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a84af142-ba0c-4103-831e-c7e0615970ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18')
  .query(true)
  .reply(200, {"jobId":"aac7fe2d-f05b-4e77-8680-ad1677ca5d18","lastUpdateDateTime":"2021-08-03T03:12:33Z","createdDateTime":"2021-08-03T03:12:33Z","expirationDateTime":"2021-08-04T03:12:33Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '1f172f49-5329-447f-827a-18f2df3a1b83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:35 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18')
  .query(true)
  .reply(200, {"jobId":"aac7fe2d-f05b-4e77-8680-ad1677ca5d18","lastUpdateDateTime":"2021-08-03T03:12:36Z","createdDateTime":"2021-08-03T03:12:33Z","expirationDateTime":"2021-08-04T03:12:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0b5844c1-818c-4221-84fc-29ee5d904d41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18')
  .query(true)
  .reply(200, {"jobId":"aac7fe2d-f05b-4e77-8680-ad1677ca5d18","lastUpdateDateTime":"2021-08-03T03:12:36Z","createdDateTime":"2021-08-03T03:12:33Z","expirationDateTime":"2021-08-04T03:12:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1cd50ea1-41ec-4a72-8266-c6ac43234706',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:39 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18')
  .query(true)
  .reply(200, {"jobId":"aac7fe2d-f05b-4e77-8680-ad1677ca5d18","lastUpdateDateTime":"2021-08-03T03:12:36Z","createdDateTime":"2021-08-03T03:12:33Z","expirationDateTime":"2021-08-04T03:12:33Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '003ae36a-b5c5-4433-82ed-2f78798b5653',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:41 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18')
  .query(true)
  .reply(200, {"jobId":"aac7fe2d-f05b-4e77-8680-ad1677ca5d18","lastUpdateDateTime":"2021-08-03T03:12:42Z","createdDateTime":"2021-08-03T03:12:33Z","expirationDateTime":"2021-08-04T03:12:33Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:42.504347Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:42.5256056Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:41.9896089Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  '88fb1ad6-c2d1-42d9-b0c7-2656c3fa7b0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/aac7fe2d-f05b-4e77-8680-ad1677ca5d18')
  .query(true)
  .reply(200, {"jobId":"aac7fe2d-f05b-4e77-8680-ad1677ca5d18","lastUpdateDateTime":"2021-08-03T03:12:42Z","createdDateTime":"2021-08-03T03:12:33Z","expirationDateTime":"2021-08-04T03:12:33Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:42.504347Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:42.5256056Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:12:41.9896089Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  '1f1446ee-5767-4bdb-91bb-b3b59d932211',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:44 GMT'
]);

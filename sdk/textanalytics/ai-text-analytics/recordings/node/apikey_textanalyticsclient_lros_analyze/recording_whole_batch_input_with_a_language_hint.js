let nock = require('nock');

module.exports.hash = "b44ce97462cc970dede8a09b78dc293c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  '7813441e-7632-4ade-951e-aa1311a981b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de')
  .query(true)
  .reply(200, {"jobId":"1cc494e2-42f6-48e5-937d-2b63d32054de","lastUpdateDateTime":"2021-08-03T03:12:53Z","createdDateTime":"2021-08-03T03:12:53Z","expirationDateTime":"2021-08-04T03:12:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '61fe885d-4a04-486f-8b7c-a47495601855',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de')
  .query(true)
  .reply(200, {"jobId":"1cc494e2-42f6-48e5-937d-2b63d32054de","lastUpdateDateTime":"2021-08-03T03:12:53Z","createdDateTime":"2021-08-03T03:12:53Z","expirationDateTime":"2021-08-04T03:12:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '09298e29-6834-4403-b2af-f6fd7d60811d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:53 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de')
  .query(true)
  .reply(200, {"jobId":"1cc494e2-42f6-48e5-937d-2b63d32054de","lastUpdateDateTime":"2021-08-03T03:12:53Z","createdDateTime":"2021-08-03T03:12:53Z","expirationDateTime":"2021-08-04T03:12:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '3eeedfda-7201-421a-a215-32ba6a5f7ab6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:55 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de')
  .query(true)
  .reply(200, {"jobId":"1cc494e2-42f6-48e5-937d-2b63d32054de","lastUpdateDateTime":"2021-08-03T03:12:56Z","createdDateTime":"2021-08-03T03:12:53Z","expirationDateTime":"2021-08-04T03:12:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd02970cc-ec74-4e1b-9b9d-4077216dd7e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de')
  .query(true)
  .reply(200, {"jobId":"1cc494e2-42f6-48e5-937d-2b63d32054de","lastUpdateDateTime":"2021-08-03T03:12:56Z","createdDateTime":"2021-08-03T03:12:53Z","expirationDateTime":"2021-08-04T03:12:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c1ec4427-60ea-4ef3-8042-5e82dec65609',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:12:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de')
  .query(true)
  .reply(200, {"jobId":"1cc494e2-42f6-48e5-937d-2b63d32054de","lastUpdateDateTime":"2021-08-03T03:13:02Z","createdDateTime":"2021-08-03T03:12:53Z","expirationDateTime":"2021-08-04T03:12:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:02.0050846Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '223',
  'apim-request-id',
  'ef807ce3-e337-4308-baf7-fea620972c87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de')
  .query(true)
  .reply(200, {"jobId":"1cc494e2-42f6-48e5-937d-2b63d32054de","lastUpdateDateTime":"2021-08-03T03:13:02Z","createdDateTime":"2021-08-03T03:12:53Z","expirationDateTime":"2021-08-04T03:12:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:02.5496021Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:02.6464495Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:02.0050846Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '2d4d1f1a-9cc6-4235-8e87-283db16ed1c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:04 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/1cc494e2-42f6-48e5-937d-2b63d32054de')
  .query(true)
  .reply(200, {"jobId":"1cc494e2-42f6-48e5-937d-2b63d32054de","lastUpdateDateTime":"2021-08-03T03:13:02Z","createdDateTime":"2021-08-03T03:12:53Z","expirationDateTime":"2021-08-04T03:12:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:02.5496021Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:02.6464495Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:13:02.0050846Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '182',
  'apim-request-id',
  '22f80728-0d2b-4eae-9c0d-50aa094049e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:13:04 GMT'
]);

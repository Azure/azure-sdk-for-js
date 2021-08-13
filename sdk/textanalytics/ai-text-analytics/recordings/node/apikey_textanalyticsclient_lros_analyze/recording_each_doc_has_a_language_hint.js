let nock = require('nock');

module.exports.hash = "3bbfbdb882cf67c1af36e71a5e887013";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '187b9a50-66e8-4fbb-be12-ffc9e4ff8f6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef')
  .query(true)
  .reply(200, {"jobId":"ebb7e75c-56e2-4933-96ce-abd0d5c891ef","lastUpdateDateTime":"2021-08-03T22:40:53Z","createdDateTime":"2021-08-03T22:40:53Z","expirationDateTime":"2021-08-04T22:40:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'cdb11927-9d92-4a0f-a971-dc1d12b3ddbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef')
  .query(true)
  .reply(200, {"jobId":"ebb7e75c-56e2-4933-96ce-abd0d5c891ef","lastUpdateDateTime":"2021-08-03T22:40:53Z","createdDateTime":"2021-08-03T22:40:53Z","expirationDateTime":"2021-08-04T22:40:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '364a30d4-3f24-4286-80c3-60afb117beb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef')
  .query(true)
  .reply(200, {"jobId":"ebb7e75c-56e2-4933-96ce-abd0d5c891ef","lastUpdateDateTime":"2021-08-03T22:40:53Z","createdDateTime":"2021-08-03T22:40:53Z","expirationDateTime":"2021-08-04T22:40:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e2231ff4-ce9b-4498-a31a-5f12123ccb1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef')
  .query(true)
  .reply(200, {"jobId":"ebb7e75c-56e2-4933-96ce-abd0d5c891ef","lastUpdateDateTime":"2021-08-03T22:40:56Z","createdDateTime":"2021-08-03T22:40:53Z","expirationDateTime":"2021-08-04T22:40:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4aa27341-1cbc-4f8a-a68f-4266d90f7b77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef')
  .query(true)
  .reply(200, {"jobId":"ebb7e75c-56e2-4933-96ce-abd0d5c891ef","lastUpdateDateTime":"2021-08-03T22:40:56Z","createdDateTime":"2021-08-03T22:40:53Z","expirationDateTime":"2021-08-04T22:40:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '9f2a8fd0-b0a9-436d-a50d-b1b38233db5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:40:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef')
  .query(true)
  .reply(200, {"jobId":"ebb7e75c-56e2-4933-96ce-abd0d5c891ef","lastUpdateDateTime":"2021-08-03T22:41:02Z","createdDateTime":"2021-08-03T22:40:53Z","expirationDateTime":"2021-08-04T22:40:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:02.0764005Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '2e2320f1-511c-4a15-9b38-f3874fbf5884',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef')
  .query(true)
  .reply(200, {"jobId":"ebb7e75c-56e2-4933-96ce-abd0d5c891ef","lastUpdateDateTime":"2021-08-03T22:41:02Z","createdDateTime":"2021-08-03T22:40:53Z","expirationDateTime":"2021-08-04T22:40:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:02.5124073Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.97}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:02.5734544Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:02.0764005Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  'af4ab2b4-a230-4d71-8c72-92f6a523539a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ebb7e75c-56e2-4933-96ce-abd0d5c891ef')
  .query(true)
  .reply(200, {"jobId":"ebb7e75c-56e2-4933-96ce-abd0d5c891ef","lastUpdateDateTime":"2021-08-03T22:41:02Z","createdDateTime":"2021-08-03T22:40:53Z","expirationDateTime":"2021-08-04T22:40:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:02.5124073Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.97}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:02.5734544Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:02.0764005Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["good food","restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '873cf62c-9965-44e1-b12f-662a78ac6e10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:03 GMT'
]);

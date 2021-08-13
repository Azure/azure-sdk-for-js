let nock = require('nock');

module.exports.hash = "b44ce97462cc970dede8a09b78dc293c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/98e6a804-7639-4307-850d-3778a14be837',
  'x-envoy-upstream-service-time',
  '268',
  'apim-request-id',
  '803c8128-ac07-40cc-8f84-a4730954d847',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/98e6a804-7639-4307-850d-3778a14be837')
  .query(true)
  .reply(200, {"jobId":"98e6a804-7639-4307-850d-3778a14be837","lastUpdateDateTime":"2021-08-03T22:41:05Z","createdDateTime":"2021-08-03T22:41:04Z","expirationDateTime":"2021-08-04T22:41:04Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'af682f1b-fd54-4754-9387-f5eaa9b12638',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/98e6a804-7639-4307-850d-3778a14be837')
  .query(true)
  .reply(200, {"jobId":"98e6a804-7639-4307-850d-3778a14be837","lastUpdateDateTime":"2021-08-03T22:41:05Z","createdDateTime":"2021-08-03T22:41:04Z","expirationDateTime":"2021-08-04T22:41:04Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '90b57d65-f22f-4672-a4a8-ddf6324af893',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/98e6a804-7639-4307-850d-3778a14be837')
  .query(true)
  .reply(200, {"jobId":"98e6a804-7639-4307-850d-3778a14be837","lastUpdateDateTime":"2021-08-03T22:41:06Z","createdDateTime":"2021-08-03T22:41:04Z","expirationDateTime":"2021-08-04T22:41:04Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6491d877-89f3-42b5-9b75-38b10980b5c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/98e6a804-7639-4307-850d-3778a14be837')
  .query(true)
  .reply(200, {"jobId":"98e6a804-7639-4307-850d-3778a14be837","lastUpdateDateTime":"2021-08-03T22:41:06Z","createdDateTime":"2021-08-03T22:41:04Z","expirationDateTime":"2021-08-04T22:41:04Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f6948a69-d17d-4a22-89fb-c453757d3185',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/98e6a804-7639-4307-850d-3778a14be837')
  .query(true)
  .reply(200, {"jobId":"98e6a804-7639-4307-850d-3778a14be837","lastUpdateDateTime":"2021-08-03T22:41:06Z","createdDateTime":"2021-08-03T22:41:04Z","expirationDateTime":"2021-08-04T22:41:04Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e3e85d92-9b58-4790-b2ad-b6e6baaba12c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/98e6a804-7639-4307-850d-3778a14be837')
  .query(true)
  .reply(200, {"jobId":"98e6a804-7639-4307-850d-3778a14be837","lastUpdateDateTime":"2021-08-03T22:41:12Z","createdDateTime":"2021-08-03T22:41:04Z","expirationDateTime":"2021-08-04T22:41:04Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:12.4798Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:12.5197916Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:12.508553Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'b79e650d-4a4e-45da-b250-c32f229767c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/98e6a804-7639-4307-850d-3778a14be837')
  .query(true)
  .reply(200, {"jobId":"98e6a804-7639-4307-850d-3778a14be837","lastUpdateDateTime":"2021-08-03T22:41:12Z","createdDateTime":"2021-08-03T22:41:04Z","expirationDateTime":"2021-08-04T22:41:04Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:12.4798Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Español","category":"Skill","offset":31,"length":7,"confidenceScore":0.92}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:12.5197916Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:12.508553Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Español","document"],"warnings":[]},{"id":"3","keyPhrases":["せ"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  '894fd66d-808d-4568-b648-c8b79565fe88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:14 GMT'
]);

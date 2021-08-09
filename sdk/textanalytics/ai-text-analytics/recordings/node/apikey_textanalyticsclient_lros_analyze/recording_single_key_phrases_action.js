let nock = require('nock');

module.exports.hash = "7b28bcd7ab77c3b6e29073f88708ce4b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  '0d6e9cd4-9fe6-4632-9947-f5272a24e96a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:19Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e14b1179-23ff-4771-9f57-4852d8391a75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:19Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e27f3ac6-1438-4f39-8ffd-d4c2a706b35f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '79f76099-5085-4c1b-bdee-be6e03ddbdcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c906e8b1-f994-4b65-95a6-78bbf25471db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'cfdd855b-cbcf-449b-bb43-af7e582dfae5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '4159935d-b7a3-4e32-8253-3b243cd30417',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '3c4ba919-a3a5-4f9e-a710-06d7c372ebca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9d9ada74-9dfa-4072-a67e-9d9fa40e61e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '94572af9-e746-47fb-9866-b00c3d969baa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '15548310-ff70-4a2d-9290-6c3544cb1947',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ce314f6c-0762-41b8-a74f-5f5a2f9abdfe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd581e5b4-59d4-4502-bf69-9f850005b511',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:21Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f8dc0746-8c64-4f4f-8016-4fa3850c9024',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:43Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:37:43.5408259Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '4ecfb956-4f42-4a16-8592-2833677e0a2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f80eb42b-7035-40ec-8c30-a442c71359ff')
  .query(true)
  .reply(200, {"jobId":"f80eb42b-7035-40ec-8c30-a442c71359ff","lastUpdateDateTime":"2021-08-03T22:37:43Z","createdDateTime":"2021-08-03T22:37:19Z","expirationDateTime":"2021-08-04T22:37:19Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T22:37:43.5408259Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '91c6bbe1-12d4-4eed-9cb6-a54d6da8de35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:44 GMT'
]);

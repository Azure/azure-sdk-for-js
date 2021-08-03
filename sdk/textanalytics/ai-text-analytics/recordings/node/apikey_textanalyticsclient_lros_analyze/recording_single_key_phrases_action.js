let nock = require('nock');

module.exports.hash = "7b28bcd7ab77c3b6e29073f88708ce4b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '3f857223-8444-4bf7-946c-eba933290941',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:13Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '870f6035-f9bf-4214-ac79-d3d6c0f323c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:13Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c93bd0cc-3a96-4b93-9c48-7605d2d973eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:13 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:13Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '02390916-f740-42a0-ad17-711240e0194d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:15 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:16Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '33177e43-a042-4c79-9cdb-d0727f27259a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:17 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:16Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '103f61c2-1281-4269-b29d-37a31aa30c2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:19 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:16Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '110ebef3-54d9-470e-a23b-d456bdbb556c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:21 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:16Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '0bc0c8f7-a162-4170-b18c-b56202c6fd11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:23 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:16Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '9668f3d6-728a-4ef3-a69d-8a064ed351a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:25 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:16Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '4904d539-7b42-4ed6-a1a5-2f2a76e2c7db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:27 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:16Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '49f4b501-a3a0-45df-bc01-53960fcc2b74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:29 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:16Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '2755a8fc-093e-4721-8d42-57c16c536449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:31 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:32Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:10:32.5148952Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '334b9a23-ec24-4c3e-9c49-a86d1b975adc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:33 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2a84ad2c-dc10-42f2-8829-619bc3decd76')
  .query(true)
  .reply(200, {"jobId":"2a84ad2c-dc10-42f2-8829-619bc3decd76","lastUpdateDateTime":"2021-08-03T03:10:32Z","createdDateTime":"2021-08-03T03:10:13Z","expirationDateTime":"2021-08-04T03:10:13Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-08-03T03:10:32.5148952Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'dee6630f-26ba-4ceb-8c41-a29b5380ddd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:10:33 GMT'
]);

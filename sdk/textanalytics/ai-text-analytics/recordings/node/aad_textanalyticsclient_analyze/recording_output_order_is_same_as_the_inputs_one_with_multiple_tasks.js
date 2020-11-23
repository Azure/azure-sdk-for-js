let nock = require('nock');

module.exports.hash = "e9cc7ce28c9aaac15555d844ead7e9bc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  'f9fbabc0-11de-4827-8448-0ab8b39d4600',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmMGK-zpU-tOjbaTU3ORf8s; expires=Sun, 20-Dec-2020 00:20:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:20:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000',
  'x-envoy-upstream-service-time',
  '450',
  'apim-request-id',
  '0d564663-5475-46b0-87fe-1eb951ba6801',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:47Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:47Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '9c3ae10e-b284-489e-89de-5e80c5435130',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:47Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:47Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'd2a2779e-f10e-4099-a2ee-4c4a8393c94b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '5111dd2f-18f4-496f-83eb-2adf73e535ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  '2d2832cb-641e-4005-83e2-a8faf4132647',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '38b54738-e3a4-4a50-abdf-1339e9f92bec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '0f91ad64-6ed3-4be5-bde8-a4ea400632f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '0148d443-402b-4a10-abc5-6d2c7cb699dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '9666dc21-f618-4f95-a5df-a9bd51685bf6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '0ce5252b-6e87-4faf-bb5e-fa25651d6ba4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '84047c5a-93b5-4c42-9234-72fd4be3dafb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '66a66894-f7c6-4638-a5a7-85fae326ffad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '5af93eec-b5c3-455d-ae64-c972ce7344b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '119cfcd8-d39f-4436-b7f7-9058ffbf66dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '7b0d8afa-a2a2-40a7-bdd2-fa4586b391df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '4e56b378-6ae4-477b-a450-861d7ef955b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:16 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '56d5f0e1-aea2-411b-81f3-8c439fb74500',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmMGK-zpU-tOjbaTU3ORf8s; expires=Sun, 20-Dec-2020 00:21:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:21:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '50198b68-e465-43c9-881d-d3ee4c5bb6fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  '66d5ef0e-4a0d-4224-8907-345665cea6e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  '97feb0ac-ffdb-4afa-8395-89c1a8362017',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '4a5e7459-5d64-4f8c-828f-3c8b8a388cd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '38b91868-cb2d-4011-bb6a-2a229e8eee17',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '60e2164a-4e28-4125-a7c0-b7d4cd4fbfc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '3692d9a1-b3c9-487e-9697-f2f1ef5b59e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  'a08e8899-b3e4-45ec-8a37-d704771e9626',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '65ca38b9-ffc0-4a39-8026-f75cd0a10e55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  'd63ed845-f4f8-4c25-be8e-1edbd044c16c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  'eda47141-675a-46f9-8854-a1f6e3ad0464',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '8c04b7b5-932b-47ab-94ab-086e98ecc12c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '9d9d6a20-2202-46bb-9769-6de4f4502270',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  '815f61c5-3fb0-49c0-847b-85a8aa64728f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:47 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '56d5f0e1-aea2-411b-81f3-8c4374bd4500',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmMGK-zpU-tOjbaTU3ORf8s; expires=Sun, 20-Dec-2020 00:21:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:21:49 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1163',
  'apim-request-id',
  '1032560a-3f6d-423c-8b9f-41b018cc55f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '24083686-87f9-4831-b148-5ca6cd46ea6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '2b82fa86-504c-4db4-8f54-de18dfb7aca9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '312',
  'apim-request-id',
  '6a866312-f605-4d13-a6b7-d298138bc084',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"b443a0cb-e7c5-4ce0-9814-90f32c8f50de_637414272000000000","lastUpdateDateTime":"2020-11-20T00:20:49Z","createdDateTime":"2020-11-20T00:20:47Z","expirationDateTime":"2020-11-21T00:20:47Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:20:49Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:20:49.2812681Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  '9983d00c-31ca-47c5-8703-2f75a8a8d918',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:21:57 GMT'
]);

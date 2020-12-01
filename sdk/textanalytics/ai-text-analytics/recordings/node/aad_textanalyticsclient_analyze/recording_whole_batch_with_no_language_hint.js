let nock = require('nock');

module.exports.hash = "8c813703f6fdabebcd06c01057521e6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '2b7c88eb-17bc-4502-9867-71f2265d4400',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiSmHHiYdVVBvgHrFl1ZTKFz_bg1AQAAAPADSdcOAAAA; expires=Sun, 20-Dec-2020 00:25:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:25:20 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '89c5c3a3-acab-4a8f-8ab9-979b7e2340e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:21Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:21Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '2cc91eae-b6d1-4113-8a69-31ecce05dda9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:21Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:21Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '75f85430-a956-4160-a5a5-c38f78969a37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '356dd67c-3377-4c8a-92fe-85f72b0ab943',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  '3e1aa1da-120d-4e77-bae1-302257872730',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'f90395a8-45bc-41a1-aa26-7bfe374ffa3e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '475bbe4f-a94e-402b-ba0d-cf42c46cb920',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '182',
  'apim-request-id',
  '665eb2da-9fe4-47e2-879a-f3bd20be6e81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '4bbb202d-72ab-405a-bedb-85ecea0807d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  'e08bd800-015e-4f5a-ad1e-e14a32203d70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '0920fad6-35bd-4bba-bb42-87bc9088be11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '3cabcfa1-05bc-48e3-a27b-ba146d92789b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'caea04ec-70d8-4d3d-badc-a501a89ba4dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'ffd0db8a-0cdd-43ff-a6c7-db6200ffd0b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '50207a16-deca-4a67-a0b3-8f41b4da1612',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:48 GMT'
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
  '2328d770-39b2-432d-92c9-2bc91c6e4400',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiSmHHiYdVVBvgHrFl1ZTKFz_bg1AgAAAPADSdcOAAAA; expires=Sun, 20-Dec-2020 00:25:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:25:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '6245c942-315c-4d22-aaf7-f8231bb876bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  'd5d714fc-d3db-414b-8e8b-2873d7edfe39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  'f3b6654e-83d9-4f1a-9637-a898a5c28b98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'd0498b9a-86e3-4f99-8056-7d44fdf1aa34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  '3e943999-d3c4-4c60-bcc4-540d0f82a8c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '7f963dbc-1338-4a46-ac2d-a4651315ce72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '73bbbaa5-b131-4932-9d5c-2903d8505fa2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  '168f7874-bc2c-414b-a1b7-28ffaac3eff5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'bcd36a6f-271f-4469-bd3d-8a834f2b8af8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  'c755855a-8cc9-4b5d-86c7-4029f9123a36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '12f07883-a775-44ae-b409-9a59cd2d0f1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '434de1d3-dd7f-4330-8c78-0731d382d40b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  'a00a7b80-4600-4992-8b39-9be1606cd066',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  '4f418055-c8c4-46b0-be40-c1b367f23a6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:19 GMT'
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
  '2328d770-39b2-432d-92c9-2bc98d734400',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiSmHHiYdVVBvgHrFl1ZTKFz_bg1AgAAAPADSdcOAAAA; expires=Sun, 20-Dec-2020 00:26:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:26:21 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '580b9f42-fbf9-4c2a-ba18-e58d6742b182',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '2a0ff273-0a31-493b-bf40-d3e57484e33e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  'e3590731-0820-49c2-9df6-60ce4f80dcaa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '64e178a6-9880-4122-9b3d-dd4cc3b61a7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'dd9645f5-6a88-4838-a191-6c5f7629fbcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  'd6780c75-8db8-45fe-be48-6bd1b23c7f07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '5e2412a3-c6aa-46e2-bb7c-355a0720fa6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  'f5575279-fabe-41bd-b5f5-fa319ee7acb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  '7270d601-97af-41b0-87fb-0297bf1ecf6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  '315c2051-8af6-43c9-b4d5-9e4ec1ec6be5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '4ddc0bf2-d60d-41c8-b389-1318da5f94e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  '7d2029b2-1665-4441-9b14-3223d4938238',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  'f8813162-b923-42c1-8bab-e6c855523009',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'cb929331-8efa-4d77-bd80-0290fbf0ea5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:51 GMT'
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
  'd0e81189-217f-4aae-9218-f03416e14500',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiSmHHiYdVVBvgHrFl1ZTKFz_bg1AwAAAPADSdcOAAAA; expires=Sun, 20-Dec-2020 00:26:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:26:52 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  'e18c8090-e10c-4459-9421-a0f712924fc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '7480fcf6-420c-409b-a465-06958376f1ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  'b61cd77d-f74f-4eb6-b224-405612a1cc60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '252bbd8d-5f3e-42fc-98ff-6d1dc41340eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:26:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  'b88ea512-08bf-4203-853e-9a87e14d48eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '6194554f-722c-46e4-b089-6771b9e04ef3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  '5df0ddfd-3620-437e-a0e6-c461c7ff4787',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  'c6f74889-0eab-45aa-961b-7652c2b175b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'cf1a4f76-18d1-4b1d-bc47-019661f88449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'c27d6ceb-b0b4-41ae-875f-f04d9ce47e46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  'c7323631-59ab-404e-b031-9d19f66a4704',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'b5db4200-77d1-43c1-afb7-178929663820',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  '1c8471f7-27b2-4df1-947e-5a00b024b130',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  'f1d7a8bc-daeb-4c8d-9c2c-cb514120f7d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:22 GMT'
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
  '2328d770-39b2-432d-92c9-2bc9747e4400',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiSmHHiYdVVBvgHrFl1ZTKFz_bg1AwAAAPADSdcOAAAA; expires=Sun, 20-Dec-2020 00:27:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:27:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '3f7a73ad-ea1c-4846-b18d-a3557e129795',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  '0b633a98-5d8f-4e98-bb5c-b3e465c9bd34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  'a621d1ab-3571-4bcc-be6e-4ac253f9afa6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"4bb6aa70-15ee-49ef-97b5-a70a72adb34c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:25:22Z","createdDateTime":"2020-11-20T00:25:21Z","expirationDateTime":"2020-11-21T00:25:21Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:25:22Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:25:22.8805682Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  '9584be72-1dd4-421a-baf7-dd41b983eaf2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:27:30 GMT'
]);

let nock = require('nock');

module.exports.hash = "a461c5c11036e5edcfea3adf34fa51da";

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
  '53f9f1f6-3c6e-4f62-83b9-ef36c9004100',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ak0DfyBhLB1Drnlfy4a5wyhz_bg1AQAAAPQESdcOAAAA; expires=Sun, 20-Dec-2020 00:29:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:29:40 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000',
  'x-envoy-upstream-service-time',
  '594',
  'apim-request-id',
  '03f6c75c-62b9-45ec-888d-99da3a2a7a5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:42Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:42Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'bd7fbae7-96ea-485f-bd7b-580c7e05fd7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:42Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:42Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '5b5d0d5b-a9b8-4b11-aa4b-00c7ebe3afe0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '443b78e0-945d-4ad7-86db-052052983295',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'e078ac91-10d0-4199-a52c-bf9081a1945a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '237',
  'apim-request-id',
  '67eac1b6-a2ac-4fff-80d6-c492210f794f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '3f465416-0366-43e0-9f9f-59609fc762af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  '6f6b072b-c7f1-4bc0-b7c9-fa38d1380934',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '9b4a3255-6c32-4678-9375-4ebf212a0437',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '9a19c4aa-1b4d-481b-b766-1b9d12a6c6aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:29:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  '77d0e32c-1ed9-464c-bf33-eb2ea937117b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '01430eb0-3dfe-4e70-bc74-596bfc9d1414',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'e80fe158-4c58-4f52-877d-6f65951a3763',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '1bd480e8-feed-433b-a069-5879ad28fc59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '223',
  'apim-request-id',
  '2a6acbfd-c3d8-47fd-9709-34080c92abd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'b2b62e18-5bb5-402e-8cf0-524626ced5c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:11 GMT'
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
  'b234c21b-8594-442e-a47a-822f7aaf4400',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ak0DfyBhLB1Drnlfy4a5wyhz_bg1AgAAAPQESdcOAAAA; expires=Sun, 20-Dec-2020 00:30:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:30:11 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'f56b3af7-a1a0-47e3-a0fd-63c101d70153',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  'c14bbfc7-f70c-4fd9-85b2-e8bf84bb4c4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '4a7ee423-fc0d-4392-978c-31a6d399ce32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'ca41ae25-64ee-4144-a239-badf2043a3b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '3c6c72f2-4c57-46fd-b0c6-2db0c8852da7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '111c9369-9d5b-4012-b57a-4b8e2c500eef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '8141ab9f-48ce-4b72-9dbf-625395d4454a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'e2c47812-4e26-4644-b618-ef635017d6c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '193',
  'apim-request-id',
  '23a1325c-58a2-494d-8426-97ff5da99704',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '5a54ddbb-2c3b-4390-8369-3a08f856b8f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  'fa56c1a6-0b9b-4b43-ad81-2cbd2b3fcdd1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  'a75d2c85-4ea2-4eff-902c-7c14ac89e89a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  'e5db2f00-ad5e-4ecf-b6c7-996dcddeac98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:40 GMT'
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
  '53f9f1f6-3c6e-4f62-83b9-ef362d0c4100',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ak0DfyBhLB1Drnlfy4a5wyhz_bg1AgAAAPQESdcOAAAA; expires=Sun, 20-Dec-2020 00:30:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:30:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '629ef236-c22d-4e08-9558-f0c1446a9ced',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '22ae0c80-0602-4532-81b6-e3b981cb2074',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '2b6eeb65-48e8-4678-b26c-006ee683bffb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  'd140eafd-4eb3-4a10-9237-dd90d6943ef2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  'ff2c3586-f26b-4810-a035-b7a762e3e947',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  'c7c7a064-2b8d-4055-8a5e-38a2de338f59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"escrito en Español","category":"Location","offset":20,"length":18,"confidenceScore":0.26}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  '59421a26-7ab8-4473-896a-2ec4861e746e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e653900e-9945-4a7a-8810-6fbc9fddc7e1_637414272000000000","lastUpdateDateTime":"2020-11-20T00:29:43Z","createdDateTime":"2020-11-20T00:29:42Z","expirationDateTime":"2020-11-21T00:29:42Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:29:43Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"escrito en Español","category":"Location","offset":20,"length":18,"confidenceScore":0.26}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:29:43.940326Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  '80173156-ca8c-44e0-8422-0b80b65cba15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:56 GMT'
]);

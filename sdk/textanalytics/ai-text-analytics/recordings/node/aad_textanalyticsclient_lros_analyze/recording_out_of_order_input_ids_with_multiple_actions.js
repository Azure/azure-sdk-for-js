let nock = require('nock');

module.exports.hash = "a13238158dd5f2354069a2fef5ba882f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '96848ce2-0dec-4858-8748-e7f34bce0d00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:49:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:49:20 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":"w"},{"id":"19","text":":P"},{"id":"1","text":":D"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6',
  'x-envoy-upstream-service-time',
  '254',
  'apim-request-id',
  '587ac26b-498e-40a6-9d11-0c80f71e2ed6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:20Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:20Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '7ef89392-8e7d-4f7b-8360-095e3037fedf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:20Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:20Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '6bfcda20-10ab-455d-b82a-d99ed6b1453a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:20Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:20Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'd24d7ee1-6c53-4a9d-a07d-217182aa285c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  'c29179c5-aa20-4784-b2e9-5435d7c32a60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  'fce9676e-4e69-4b58-aeee-61aec2b24152',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  'c2dbcb6b-5dd4-4143-89f8-550a482e06a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '30c2c268-e755-4563-b826-2ddb9d210433',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '66abaabe-5b03-4c4a-a0ef-09a076aac25e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '774e98c2-ffc6-44ff-ac73-346c8b2d8435',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '07ce08b7-8aef-4aea-aec5-0eb75815fb36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  'd6f3d79e-405c-4514-a5cb-ce96a984ce34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '215',
  'apim-request-id',
  '77bb5b7a-da9d-42fd-93ad-7b2210f80a54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '233',
  'apim-request-id',
  'aaf54c1a-16b5-4e6d-addb-71da0772aac1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '1d12e427-e534-4a53-85e6-3457d149bc2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '223',
  'apim-request-id',
  '47b218cd-d85d-4f7e-aa86-6da86229b97e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:49 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'd8ac8166-fdb3-45f0-98f5-44d92be70d00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:49:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:49:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  '7e28b1d6-0028-49ea-acb4-c86724bc38c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '478',
  'apim-request-id',
  '7542bdf9-054d-4fcd-acb0-d499ee1233f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  '13a7d68c-bcd3-45ca-99e8-ce8e41a0a13a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '5bb53893-a31f-4d62-8b9d-186da9d9d991',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '8aa40708-a78a-4442-bf4a-6af45f80f2ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '194',
  'apim-request-id',
  '296c4eb3-792c-4f90-a576-c44903d2ff70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '194',
  'apim-request-id',
  '9b609563-3fff-4e66-940a-38031c4f731f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '257',
  'apim-request-id',
  'f6161db6-cf66-404c-a594-0f7ee00b21de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '321',
  'apim-request-id',
  '79f36bc3-b7f2-4186-87a9-6d8949a00069',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '94f710cd-6128-465c-8fed-678cf1a8955b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  'c06b82b4-c1be-4307-a037-e2128553b05f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '860af97c-0ad6-4989-8278-cf58073f0441',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '88e886ee-d9e7-409a-b5f5-f384115b77c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '238',
  'apim-request-id',
  'fac21d24-4ff9-4cd5-a516-fe4abe2e696f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:21 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'bd3757ec-89e9-4647-b7ae-377c43bb0c00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EwAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:50:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:50:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  'f2d45639-be92-41be-b96a-989f1ff5ac2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'be9a7fea-f0ad-4659-9347-94d7865c0c7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '4c7257b4-7340-4258-ba1e-187d22b54a55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  'f20611a3-f7ee-471d-a8b2-d4c67c269147',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  '154d8c7f-974a-40ae-8139-ad15184ce908',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '390',
  'apim-request-id',
  'f9a4b199-eb86-4412-88b2-83c08dfd936e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '257',
  'apim-request-id',
  '78455649-f52c-44dd-9340-173cb38da837',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  '4e7c9763-ef94-4432-ac50-38c07cef9d20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  '3124a80a-9ddb-4730-9ea8-e2b8ffb101ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '280',
  'apim-request-id',
  '82795c42-a1d5-4dca-9b10-37d367371182',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'f1e4b1d2-3398-4cb9-9c8d-a4e28fb3925a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  '148e7e68-ea01-4c29-bd0a-4fffa4e0fbdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '0b303d14-eea6-4bc6-855d-be3fa78f0bc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '25244d59-fdfa-484e-839e-28dcb7af48ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:53 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '6479b411-5d5d-4437-81b4-eabeaa5b0c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:50:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:50:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '310',
  'apim-request-id',
  '5e336209-5993-42cf-ae81-a7082e1a9903',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '69df333a-fe71-4ceb-a566-36ba66df60bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:50:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '252',
  'apim-request-id',
  '63c6d879-8773-4730-991a-b3929f375347',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '293',
  'apim-request-id',
  'a984e1b2-ec9f-425c-b887-490987f4bab7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '40a906b7-1adb-4296-9f01-9b08130a6855',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '336',
  'apim-request-id',
  '9a3feb9a-7d54-4182-8d33-d90795463b49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '49ec6a11-779d-4cd8-b1a4-15ac8ac29b85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  '26c8bf33-017b-4787-9ed3-ebe474a0ff3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '358',
  'apim-request-id',
  '6c7d07ec-b144-4e7c-bd08-6a8376745687',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  '4060a24e-136c-48bd-ba20-7cde0e045223',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  '05e73be3-fa56-4dcd-b48e-a983e707001d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '588',
  'apim-request-id',
  'dd1153e2-1f3d-400d-8f2a-1f85c586197b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  '4bb207e9-b9f5-457b-b7fe-3591b6928d87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:24 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '5898d9d9-0e26-483b-ba17-4c71146c0b00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:51:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:51:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '228',
  'apim-request-id',
  'f2475267-1952-4c7e-93f7-91f3d75c8d76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  '890b48b6-d365-4f20-b2d2-e6cfb10ee5ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '339',
  'apim-request-id',
  '173dc779-012d-4c69-abae-b4dfcec52002',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '382',
  'apim-request-id',
  'f1497bdc-5cbb-463b-a6ec-d96ee66a25b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0f7bf9c3-c455-4480-a098-d201fe761db6')
  .query(true)
  .reply(200, {"jobId":"0f7bf9c3-c455-4480-a098-d201fe761db6","lastUpdateDateTime":"2021-02-23T02:49:24Z","createdDateTime":"2021-02-23T02:49:20Z","expirationDateTime":"2021-02-24T02:49:20Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:49:24Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:49:24.9541746Z","state":"succeeded","results":{"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '303',
  'apim-request-id',
  '0bde2d55-9cb9-4b65-a426-e945ddb52315',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:33 GMT'
]);

let nock = require('nock');

module.exports.hash = "009d930cef3b351fdaa317345c5bd081";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '30cddf92-bbfc-4042-a50d-a60698070d00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EQAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:53:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:53:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  'c7dbdb9b-538f-4507-a137-61187d9444f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:43Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:43Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'bcb534f3-a7d1-4bc4-bcf0-ef1909f939ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:43Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:43Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'd7a05840-cffb-42b6-a855-36a5a9fed19b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:43Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:43Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'b44db1ab-9408-489e-b127-83ef95beb6ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'b755d683-77d9-4e76-98d6-5b1973ea96d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '1f936d48-9d70-407c-8e8d-a1eee1b97412',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  'e98d4b99-8924-4f7d-baa1-a27eae14cbd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  'c0ed4ade-6151-4303-8b08-7ad765233c63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '29a41df9-cea6-464f-8df6-4385e9fdccb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '386',
  'apim-request-id',
  '635aaa84-94c8-4eeb-a1e6-56cdfd886df9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '193',
  'apim-request-id',
  '11549a92-8873-478b-9a3e-1f1861e8d658',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '670fc13a-a525-48bd-a262-a4e0ce678fbf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  '87065d11-a280-45ba-9626-457b018a4d0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  'd523ab08-a86f-4809-91c3-2773f999b1de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  'e379e754-db43-4b38-b087-b29941a2b063',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '7038f0aa-9a77-4536-a3f0-5c35c76e2d0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:12 GMT'
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
  '7a9b05a2-bfb3-4d63-92e5-a13eb7657800',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:54:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:54:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  'cf7a31bc-075f-49f8-b423-50b40f71e708',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '9c196e4c-e5c1-47b6-a674-8e04d6fbfff9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'f0bef87f-d1d9-4828-8081-385ed3b53533',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '548845fc-b80a-4cea-ba4c-7108e94bce8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  'b25420e7-e694-42ea-82f0-520486aaedf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '212',
  'apim-request-id',
  'f3bb46f5-4e7e-4b86-ae7d-3c8673b5c6af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  'b6ba1c5f-926d-4d9c-8177-08e522af010c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '620732bb-e3ed-459f-94fc-a733059531be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'f03c642f-514a-41a0-9246-0ed47a5f63d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '3023b31b-9a2d-4310-bad9-6e6f2352c3a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '8e9348e8-a2ed-4c0d-91cf-0bc06aeac3c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '4505b410-36fb-4e9d-8ff5-8c417e74dbc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '89bf4bdc-6c88-45c1-a2b0-35060c75fa61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  '71832548-6f51-4076-be9e-4e0ef307ab9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:43 GMT'
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
  '6479b411-5d5d-4437-81b4-eabe0e760c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:54:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:54:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  'fa25b720-9bfb-42c5-8c01-403808c30416',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'e919484b-2e73-4a4f-b3aa-cfcc806eacaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'be359d9c-61b3-48a2-9f6a-8480af680ac0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  '3f1eac60-5238-4c57-bd32-f3a28bdc9410',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  '3b088d22-6f83-445a-91bd-6730e24a900e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  'c7469f97-63cb-4b30-87ed-5a72cc11870e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '992a15e9-0063-4e06-8f26-89fa2540acb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:54:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '5daa4239-7589-49e5-a705-0d457b618cfc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  '0e0c4e25-a499-4a2f-90a5-78193460824e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  'be7c5b69-58d2-4f84-a643-978dbcec961c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '289',
  'apim-request-id',
  '77b86395-72ea-4188-9c3b-7bc52869a15b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '305',
  'apim-request-id',
  'b20ee7ab-8dce-458d-a067-332435891900',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '754cec98-0b9f-40ca-986d-40022dabfce7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  'c5cdc10e-762b-417f-ae0d-018442fa6827',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:15 GMT'
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
  '30cddf92-bbfc-4042-a50d-a606a8110d00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:55:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:55:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  'a1732546-0ce5-4cf4-8dab-cdfa20f7e2b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '0ade3349-c752-4064-8b15-58a8c1a3cd6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '287',
  'apim-request-id',
  '32cabad3-e461-41f1-bd48-3318d7913b3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  '4db33434-a2ba-48b8-9783-3c4e145a3fbf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '7d87615b-68ce-496e-b0bd-d26aa9030312',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '8fa61ce9-8397-4243-8cbf-bf56b1e129a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '406',
  'apim-request-id',
  '10db087f-4c4c-47cd-879e-1ea7e8b0c073',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  'cadcef40-bb60-4481-ac7d-acacac630aea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '577',
  'apim-request-id',
  'ff4bd11e-94ed-412e-b640-6a841aa8f09a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '212',
  'apim-request-id',
  '6520e571-ec44-4fd1-9fe7-a8acd9791f25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  'db7b7853-3de1-4f9c-bf97-69aff89f36fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  '45c678c8-43ec-4ef1-a38b-83f5f315b042',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  '117f9d8a-13ce-4699-8303-914cf133a940',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:45 GMT'
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
  '8540ade9-f402-43da-bbc4-fe8ea65c7c00',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EwAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:55:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:55:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '267',
  'apim-request-id',
  '6bc67e92-def5-4b76-97d0-dd752c2de0f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '345',
  'apim-request-id',
  '1b596eec-6491-479f-97a2-9ec612bc3118',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2cf9fedc-f3cb-448d-aa28-2815382e2385')
  .query(true)
  .reply(200, {"jobId":"2cf9fedc-f3cb-448d-aa28-2815382e2385","lastUpdateDateTime":"2021-02-23T02:53:46Z","createdDateTime":"2021-02-23T02:53:43Z","expirationDateTime":"2021-02-24T02:53:43Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:53:46Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:53:46.4710054Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '345',
  'apim-request-id',
  '5bdd1d12-80cc-4ffb-b883-daab72bd320c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:50 GMT'
]);

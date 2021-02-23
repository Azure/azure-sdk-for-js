let nock = require('nock');

module.exports.hash = "b038000d27b9ceaf09b071e6f66e5f65";

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
  '91e59b14-cdba-4a8f-8307-f7d146c10e00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:57:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:57:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106',
  'x-envoy-upstream-service-time',
  '385',
  'apim-request-id',
  '41f54c3a-ba46-4c3f-a738-5402fb2e048f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:57:59Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:57:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '43061267-8eca-4d04-8067-12962cdc216e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:57:59Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:57:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'ff1416a2-e1f8-4f20-8972-2d02565ac15f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:57:59Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:57:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'bfe0731d-2da7-4b5c-9f90-a1125054af3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '911fd6f0-429d-4a6b-b971-39766e9db88d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '149f7842-fc69-4e0c-985e-4d716efacfde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '6ca31b8b-b268-42ad-b0db-cc1dea3f7468',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '4ea5c9e6-2407-47a9-9302-baba331b46ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '561b7a11-00f8-4ae7-9ab0-410aeb0e5c55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  '516b6357-cc17-4534-8440-e3cd99e048e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  'd64aea40-f71e-4788-95cc-3ceef6564d0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  'b186ee38-8b92-4836-ba65-c6ca3a6ca1cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  'c8c15ce0-6eb1-4b83-b447-bc5f3f6291bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '802c3655-673d-4631-84e8-8420c2dc0ee0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '252ea72f-923e-4689-8ae9-57e0223706f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  '54ddf1a5-2960-4302-a526-232df3974866',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:27 GMT'
]);

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
  'e09b9479-1d2d-402d-b474-8e1c63d30d00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EAAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 02:58:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:58:30 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '2145fc67-7697-40b8-a727-0af4e0d39152',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  'ff01b678-24b5-429f-b368-8881d9d0c032',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  '28e8dee3-13e5-4fa0-bf45-f26a2bd369cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'f0300b7f-74e6-436f-8c2a-fdf3c2ab2c04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '4db5b7d3-422a-4a39-8cf2-d17f3217ae37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'c8e8578f-be62-4931-b59c-6615c9052d4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '6e1388c3-a881-41da-92f6-5df1b37a09e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'd090fd97-2023-4932-8401-e98c97b7864c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '660ca716-bea8-46ba-aa30-9e48cf0160af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  'd667bf63-8c74-469e-92e0-abde832dc5e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  'beacb3e6-3adc-437a-bce3-18e8e09e2b9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '620',
  'apim-request-id',
  '2720ec82-9b28-4a6a-b112-6cf7c641af08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '7c11b405-5d30-4b5f-bff7-3d28db6fe709',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '7874dcf5-9cb0-4ddd-b7a5-6f1f2165be36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:58:59 GMT'
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
  '3fd7a29f-e62a-4ed5-9d36-54dff95a0b00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EQAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 02:59:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:59:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '2fa5e1ff-c328-49d1-8b75-211d7efeb1cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  'dca76533-9086-4910-be58-439487172b43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '182',
  'apim-request-id',
  'f8e5aa68-89d4-49f1-90e9-1155e3378416',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  '7ecf3c32-1928-4b6e-8afa-48df4e2f2f58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '311',
  'apim-request-id',
  '62feb07f-9073-4f7f-bd51-8b0e4d438c7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '339',
  'apim-request-id',
  'add00aae-bd37-4232-8248-f7139e7b17e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  '2fbea586-703d-4e40-b664-b3b9890384c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  '3c5eb57b-c4d5-4aa2-a205-887416dc8de7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  'a3bb946e-b01c-4eaf-91fa-ec02e304a7af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '642802b7-d60a-4a3f-97cd-b128fbe45937',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '11321ee5-8d3b-4486-bffd-7a456d30c7f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '240',
  'apim-request-id',
  '947bcf36-da75-4b51-beec-0d9bd6b468d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  'f295c29d-30d5-42f9-b6be-a34d24020f22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '2656052f-593e-45f3-a16b-b08151d58f07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:31 GMT'
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
  '9bd38455-b072-419f-967e-55cf0b6c0d00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 02:59:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:59:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '267',
  'apim-request-id',
  'ff6ae9a4-019d-46e2-b453-0c809f6ea4cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  'bbd1bb76-206f-4ea2-80e9-2a27a1a43b11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '55631ac1-0303-4d9a-a9cd-f365f9417339',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '979145f9-f695-442c-a908-f47d2dfc24be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '570',
  'apim-request-id',
  '0b85952a-c2ff-4d8c-a4dc-9e3feccbc7ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  'cc6cc7be-aa4c-45de-8141-39b67190219b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  'f69fed5a-4046-4c01-96af-64a9b5c0b4f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  '022542a3-7fcf-4d30-96ab-9ae2273dbeef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '0ffacfbe-84f4-4eef-9267-6a93df75edb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '212',
  'apim-request-id',
  '3f9a55cf-8811-4eff-8eec-1fa9f42bdd37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  '8254464f-45f7-4ed2-82b5-cc5e73fab9d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  'a2f089d7-5263-49d4-b81b-1f297cae54c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:59:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  '1c845fcf-8d0b-43db-8404-4792d4d51ac8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '2c5e016f-e8f7-48d2-a888-55fd6c67b85e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:03 GMT'
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
  '6479b411-5d5d-4437-81b4-eabe469c0c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:00:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:00:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  '516e925a-e1d0-40c0-b630-9b47714e612b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/09119772-3bcb-4e7e-a6fb-5ea0561d9106')
  .query(true)
  .reply(200, {"jobId":"09119772-3bcb-4e7e-a6fb-5ea0561d9106","lastUpdateDateTime":"2021-02-23T02:58:02Z","createdDateTime":"2021-02-23T02:57:59Z","expirationDateTime":"2021-02-24T02:57:59Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:58:02Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:58:02.105389Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  '26978f4b-06ff-45de-a1e2-bf9c57a98be3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:06 GMT'
]);

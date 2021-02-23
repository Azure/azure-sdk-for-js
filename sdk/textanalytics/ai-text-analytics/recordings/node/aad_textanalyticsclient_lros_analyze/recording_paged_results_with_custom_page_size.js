let nock = require('nock');

module.exports.hash = "b044f234dfea9f141ee127bdcc435099";

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
  '86d91a14-62c2-4048-a796-b9fde2610f00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:01:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:01:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40',
  'x-envoy-upstream-service-time',
  '292',
  'apim-request-id',
  '6c27e841-8493-47a3-950b-c5495b30e2db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:17Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:17Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'da782332-40f8-4fe1-8998-d03962cb468b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:17Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:17Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '607288f2-696c-4324-b451-8eb0e1dad806',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '39a848aa-fa54-49c3-aa1a-567546fc7268',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  'd17f1e86-899d-4817-8360-95b67702773d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  '075be1ca-5b52-4dbb-95a1-cf33682f79d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '77459c9f-8dcf-4acf-b8c3-79bf169e46d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '659',
  'apim-request-id',
  '64321876-7648-4a9d-b631-96694f472f80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  '5659452d-9768-4a95-b28c-cd3104afb3a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '288',
  'apim-request-id',
  'bc1b4d52-8488-4656-a43a-cf1a67b08aca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  '51460e7b-c15a-4fdd-ba13-8896257ade31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '316',
  'apim-request-id',
  'be3c74f0-1c11-4eee-a15f-59a8f66ed837',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '279',
  'apim-request-id',
  '5c48f436-a2b5-4c1e-9e9b-26b72cdc7312',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '332',
  'apim-request-id',
  '2f1ad0c7-3cf2-4ca2-935b-87a8e343f5a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '273',
  'apim-request-id',
  '0f723eb4-86e2-4cfe-bf59-f33039b38466',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:45 GMT'
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
  '810b8bde-9799-40f6-84db-e575cfbb7700',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:01:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:01:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '261',
  'apim-request-id',
  '0d659b55-921d-48b6-9969-8b54dfeab64b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '316',
  'apim-request-id',
  'a14e45f5-d057-4080-b86b-f925f73ed322',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '291',
  'apim-request-id',
  'c2151f64-23b8-46b2-8630-6a89858423ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '569',
  'apim-request-id',
  'a52b9b97-95f2-464d-89d7-4a7e75fde025',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '294',
  'apim-request-id',
  '002e414d-2183-4d93-b77a-5c70b9d8995f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '260',
  'apim-request-id',
  'f01ac57b-832c-49ee-bf38-b6e56fc44d87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  'ad353e49-bb97-46e3-97bf-e35e31de28d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '440',
  'apim-request-id',
  '4fb4b408-8ebd-472d-99f6-32831cca28c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  'c061d874-fb6a-4d44-9d43-80e2643b7d1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '253',
  'apim-request-id',
  'e8ee1b13-25d5-448d-9951-b1c93200e74a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  '45df187b-1ada-40b8-8f29-68af1e67e6db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '302',
  'apim-request-id',
  '7d77b5b5-830e-4655-90e3-ee2d4e6960e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '238',
  'apim-request-id',
  'cd23e74a-1604-4acf-b13a-d7b1c82c0747',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:16 GMT'
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
  '6479b411-5d5d-4437-81b4-eabec9ac0c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:02:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:02:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '247',
  'apim-request-id',
  '057b1029-4570-41d9-99f5-1a9514bd9cf7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '245',
  'apim-request-id',
  'b8752d82-0b8e-4e11-8ea0-d28aec669c1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '286',
  'apim-request-id',
  '19f81b16-9d79-4fd9-b35b-7fc300bfc859',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '451',
  'apim-request-id',
  '7436feba-2b99-45a1-98dc-fa841d8f14ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=10&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '305',
  'apim-request-id',
  'a5898990-4c1b-45fc-9471-028ac70721ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40?$skip=20&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '272',
  'apim-request-id',
  '0213a9fb-7aaa-41f7-a4e9-7a4336bfa346',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7a180f02-33a9-4b8b-bff7-23947a6f8f40')
  .query(true)
  .reply(200, {"jobId":"7a180f02-33a9-4b8b-bff7-23947a6f8f40","lastUpdateDateTime":"2021-02-23T03:01:18Z","createdDateTime":"2021-02-23T03:01:17Z","expirationDateTime":"2021-02-24T03:01:17Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:01:18Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:01:18.9961134Z","state":"succeeded","results":{"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  'bad6e184-57cc-4965-8c04-9ff1653d5a82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:26 GMT'
]);

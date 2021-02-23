let nock = require('nock');

module.exports.hash = "795adbd7e99a4536774f4a312dba0414";

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
  'a959daf4-cdbb-4db8-923a-560876e60e00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:55:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:55:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  'fbf4aa06-ce33-4a3b-9000-34b0fe04da2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:51Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:51Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'e8308b50-80b1-422c-85be-5dc1f6232d84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:51Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:51Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '9ed93362-e26c-4cc7-855a-e73a8f5d30ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:51Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:51Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '3843be32-58ed-4358-8de2-f3bd01c01dd1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'e5678a3b-fe04-48fb-bf79-4a364a8a6abc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  'b1089045-5a29-4b64-ae1e-5a87fa352a99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '501dad77-11d1-46a2-b1e4-fe4435d3bc44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:55:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '609',
  'apim-request-id',
  'a738b683-83eb-462e-a14e-a8b39a0581dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'fd7352ca-875d-45c3-9287-1f34fa32a208',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'a63e8d54-2199-43d9-9c28-c71d07391342',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  '6a426536-4858-4358-ad6d-f66c6fe10681',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'f4b2b16e-3871-4feb-9203-87c54634a5c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '957b11b4-c44b-428f-9442-f63657469d53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '671322ca-643b-4b7e-ba7a-70258310b01c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '2e0f3f42-546c-4f1c-bb5a-bb2218e54aa9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '8d657fc2-1e90-43bf-b3af-c25a85c9c6c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:19 GMT'
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
  '93ad16f1-1be9-4340-af5d-4a066ad60c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:56:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:56:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '4236c9a1-573f-4367-8dec-c5e23621a48d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  '620cca9b-3c81-4bdd-9475-b607ea91aa1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  '1d20e289-fcc0-40ed-a446-8f20c394cf89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  '30b27b7b-3289-4977-90bd-64e75f7f3033',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'aef23e73-052a-464b-8e04-cfd05d7403ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  'c98b51f3-c694-4d68-91e2-c4eeea67a46b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '3ef8daa3-cf2b-4941-a31f-a9bbc13d6e02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  'd26d6cfe-e4d3-4be8-bae9-f2171a9b554f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '9a6c4169-684a-42db-90c3-fe9fbc685b83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '216263c4-dbc8-4324-b845-569c80bcc0db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '105cc7f8-1ac8-4852-a438-56ce6ab34d86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  '6dde3078-41aa-4eb6-ab86-6abd72ac11db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  '7ab6ba18-adf1-4f7f-8f2d-e0ade8355c98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'bdb16f0d-7788-44a5-b919-2f6794320ec7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:50 GMT'
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
  '4e152510-dcd2-4f06-b569-aa5ee68b7b00',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:56:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:56:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '07870e10-4e64-40d2-ba0e-727a902927e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '99edea90-0a8e-4de7-90ad-1829deac21df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '593',
  'apim-request-id',
  'eae60137-d47f-4008-8c37-77e792717b0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:56:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '261',
  'apim-request-id',
  'a8095d06-c343-40a2-8619-40f101adcfe7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'ea7b1600-67fd-49f9-94b9-385fa6bf5fc1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '4550498c-b9a3-48ab-8393-6869c39d3f0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '75e41ef3-09be-47b5-9e44-00398ee7ec05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '39ade45b-d6bf-439d-a542-7efc3a2d900e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '0e218515-07c0-4c93-9482-916b975af7ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '254',
  'apim-request-id',
  '25466c5e-7998-456d-806b-045e7fc4e595',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '737cd787-50f3-4b0e-b4b0-fce77c7ee693',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '35443d9b-9c67-49cb-b6b0-f41260af9c47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '03243663-0d04-47d2-87d3-07a8b59849ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '287',
  'apim-request-id',
  '486a1b8d-4aa3-4c57-8880-554cda292817',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:22 GMT'
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
  '31cf2026-c22c-47e9-9910-c9acb7d70d00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:57:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:57:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'bd20fe70-e835-4369-83f9-d8e3ae863286',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '3e6c33de-c5e3-4c78-827c-6e9867d0ae39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  '381f93dc-b0dd-4837-a5fe-03e41b204796',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  '47ac5b49-88dd-4fa0-8d43-74a463308d12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '722',
  'apim-request-id',
  'd09d1106-cfea-4af7-baae-10a3bb5ca17c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '224',
  'apim-request-id',
  'feca836b-dd29-4981-9061-7489ab83ffb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '91b83c21-aa3e-40db-ab10-191da13f6df0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  '0118ee06-ba16-444b-9b83-b602c0050de9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  'e219822b-66ed-4f2c-89be-59e77a37d6ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  'e86225cb-e1e7-439c-9959-41e19d30f17e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  '8e17f57f-e075-41c0-b54c-867575058a87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '9124208e-13d0-405c-9666-834de08be2f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '2b9ad2b8-1e2d-4926-944f-b808987be266',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  '05b28d5a-c95e-4b0e-a7d6-da15d5f47a04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:54 GMT'
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
  '90bc803a-8753-44e2-9d0b-ef2e151d0f00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:57:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:57:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  'f1886381-39b2-44a2-ac27-7d2ad7a81119',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '241',
  'apim-request-id',
  '7ede5e7b-d343-44f7-9ef2-af70c7591a06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4')
  .query(true)
  .reply(200, {"jobId":"7be8fcdd-3cbe-4dc8-b7c3-1672bdcce9c4","lastUpdateDateTime":"2021-02-23T02:55:54Z","createdDateTime":"2021-02-23T02:55:51Z","expirationDateTime":"2021-02-24T02:55:51Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:55:54Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.95}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:55:54.4723601Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  'd0da1bbc-ddbe-40f0-b8ef-9a763efbe589',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:57:58 GMT'
]);

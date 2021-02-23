let nock = require('nock');

module.exports.hash = "246f7e924d97a004feb2a98a140d4343";

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
  '810b8bde-9799-40f6-84db-e5759d707700',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:51:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:51:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5',
  'x-envoy-upstream-service-time',
  '390',
  'apim-request-id',
  '4da45741-0cf3-428e-9981-8919e074ec9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:34Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:34Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'fadc8aa2-7a4c-49c7-ab9e-ce8d65d4bed3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:34Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:34Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'e36c99b9-56e2-4bae-b86b-c3042cf9575a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '5c749b4a-0ffb-4c1f-99a6-ca29ef5c8903',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '4ecf36ed-8598-4775-b9ba-15200a5945e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'ceb08f9f-ca1b-4693-80ae-0f89b83bd4bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '224',
  'apim-request-id',
  '8b55381f-7baa-4869-afb1-3990db81db1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '33a9fd85-d43c-4713-ae46-99e99ca58338',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '301c3c27-11cf-48c8-b286-781f2ae515b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '70128512-8202-4bef-8a9d-b3283db8b6be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '60e55e01-e0ae-48c5-b544-785ad5350842',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  'a085764b-116d-4957-97cd-99c749781182',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '52170236-d21c-45a2-afe6-1fa31eaf4ed7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '258',
  'apim-request-id',
  '65af0ac2-a9e8-43a4-81c6-6567ab599a6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:51:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '22052206-13c7-4c97-b200-4bf175c7960d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  '57ec2ab8-ffb4-459d-9e55-2da73ba8bf19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:02 GMT'
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
  '8ce52481-932d-47e2-a5c1-c4a8137d5700',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:52:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:52:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  '97a930fa-8515-4185-8c49-816800485a9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '26c29fc2-045e-4d01-8ea4-83d0892b8bd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'f252c45c-d83d-4749-b386-68e81902b0e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  '536c85e3-c7b1-4ba6-91ee-d2735f6f0561',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '755de9eb-dfe6-4cd1-a3ba-59bdfbf70cec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '247',
  'apim-request-id',
  '364dfeaa-b248-46fe-a567-b12c08158d48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '132',
  'apim-request-id',
  'd23e0cf5-918b-41ee-95e1-050f8381355b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  'f9606049-cdaf-44f9-b22d-4eebbe123785',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  'aeb4a301-77c7-43f8-950c-5cb9b278a233',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '3ce14779-b09d-4f79-a81b-436be4680f51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  '06845d30-fc10-4b73-8394-1d09e88618d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  'da07ba95-5e98-4612-b977-072cde9d8ca0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '70dcbbb3-b43e-4302-9eea-74dc4be3bf59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  'aa0cc697-8b89-4483-aa15-f25f773e8557',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:33 GMT'
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
  '3770454b-103f-45d4-b009-21bc2bae0e00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:52:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:52:36 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '389',
  'apim-request-id',
  '1efa016f-541c-4709-a7f1-ae3a4cb6f18e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'be768be8-581b-4538-a217-a5111ea8aeef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  '332e07b8-e8ef-44a3-b47a-7fc0907ae3a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '41902e5b-c160-4401-8dc3-0d90ebcfc37c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'fd9a8830-2a69-4f81-b502-efeefcc1d65b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  '234cd41a-f53a-4d24-b1f6-255202ba0187',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '4ebb4108-8f84-4e9e-84be-4f40015d8495',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  'ecd6f849-b078-49c7-8a1f-cc130e67b559',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '087c0e84-712c-459b-a31f-6980c9ab9b82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'a1694548-d8e7-4f3f-89e3-685051a04094',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '605',
  'apim-request-id',
  '40248790-df9b-49bf-8194-0477ed859f36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:52:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '132',
  'apim-request-id',
  'abb22a61-258b-4fd5-aa1e-4fa483eaf4f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'd25b74cb-b605-47a5-94b5-9e0516cad972',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  'df798da8-6376-4f9b-8c3f-8366c5407810',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:05 GMT'
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
  '74ce6e1e-24d2-4f31-9b7d-ae86eb0c0c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:53:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:53:08 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '262',
  'apim-request-id',
  '47a01d94-05b5-4f0c-bb12-4ebcf40ff1df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'a24848a2-ceaa-457e-ac32-2b92abe4f082',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '0afaaf26-15e6-4a96-a208-c587cbfa95a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '9ed704f8-e17a-4b9d-bf05-3375ba345ce5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  'f4ebb185-4e86-44d2-83f8-477d8d6fd356',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  '95d863d7-5426-4128-b34d-b0c47261aa3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '840',
  'apim-request-id',
  'dcb23589-f65a-4ddd-8bb5-77515fc64234',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '78b5b090-3980-4775-90d8-219b779ca36b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  'bd080808-f152-4f46-bcf8-556bd71e217f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  'a310aab7-6af1-4da3-a307-37cc1f38b1fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  'dbf0bdad-1a6a-4d49-a9c1-7e153f3e505a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  'b22e884f-f979-4252-944a-c75ede55f4e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '968f6262-74b1-421f-9866-e133805f5664',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  'd43aa37f-703a-4229-bea4-d1e0b4e74a90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:37 GMT'
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
  '31cf2026-c22c-47e9-9910-c9ac4dbc0d00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EAAAAB1lxtcOAAAA; expires=Thu, 25-Mar-2021 02:53:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:53:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  '122b002d-1ced-4ae7-985b-b6e361a2d6ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '430',
  'apim-request-id',
  '3d032ac4-fb5a-4f16-9c85-f05bfd035ba6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/026038be-9af6-486e-8726-1964913354f5')
  .query(true)
  .reply(200, {"jobId":"026038be-9af6-486e-8726-1964913354f5","lastUpdateDateTime":"2021-02-23T02:51:35Z","createdDateTime":"2021-02-23T02:51:34Z","expirationDateTime":"2021-02-24T02:51:34Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:51:35Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.87}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:51:35.5884677Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  '98c18205-967a-41ee-bf5a-e7c18e1b9bf9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:53:43 GMT'
]);

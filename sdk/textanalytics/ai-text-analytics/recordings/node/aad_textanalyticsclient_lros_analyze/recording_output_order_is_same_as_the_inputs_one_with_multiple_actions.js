let nock = require('nock');

module.exports.hash = "6ac38380ae81c8759df3ed13ac796ec0";

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
  'cab38105-0756-4b6b-9d81-96d722107e00',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:48:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:48:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a',
  'x-envoy-upstream-service-time',
  '765',
  'apim-request-id',
  'fb15fcc2-1efb-4ea9-b3c2-f09d9d0653fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:08Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:08Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '3ec447ab-20f1-4ea0-9f55-016d396865ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:08Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:08Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '37fac86f-53da-4380-81bd-fe4b8824d47b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:08Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:08Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '2def63f9-181c-4c85-ab41-53ef3649462e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '8b46cd08-54a3-4312-9a8d-dbbd62e36ba9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  'd8b798e8-076b-466a-b73b-94d058418405',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '801',
  'apim-request-id',
  '06fff2fa-0588-45f4-844d-609a2a99c609',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  '10af8628-9ef5-449f-bbe0-b31497959f2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  'ad0ba6cd-0860-43c0-adc5-7555102581be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'c96798b5-9369-42d5-bee9-15d9c914cfa5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'c8b7aeb2-a98d-4ac5-b619-13f72a2632d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '4beab9ab-1188-43e3-8f49-e7894e1ad67d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '4dae1547-dad4-42c6-a950-57a84e260d6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '9af5de7b-29d3-402f-b387-1efded828929',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  '4826adf7-0172-4eb5-b9f3-5d19d32ed23e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:35 GMT'
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
  '3fef8985-f02b-4625-8984-52d401c80d00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EAAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:48:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:48:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '872',
  'apim-request-id',
  '4875f9ad-018e-4e7d-959b-9fad430789fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  'bafa8eeb-c737-4c9d-9680-4032aed777ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  '562096dd-1c9d-4373-bc7b-f2d95e190a53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  'f1faa7f3-833a-434d-8500-ae03917d2be9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '83547e18-5424-4b9c-9881-8cca9ee6b85e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '4e138161-fc65-41a2-a8f4-9016634cb3bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  'f050e207-3213-4cb5-aa47-93da08814d18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  '06b8ad06-79c2-4ce8-97e2-e91bc5b59435',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  '22fe875e-855e-44f1-877d-3577ad05cc29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '6d604b97-d1ec-423d-b44c-cd6bea6308d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'e07856a2-badb-48aa-a94f-c35aa3b0155b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '226',
  'apim-request-id',
  '7913a020-3243-45f8-93e9-758f90413df5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  'afdcf785-5fab-46a7-b171-519225a5877c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:05 GMT'
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
  '4510fc24-9e7b-467a-a1bf-db04334e0c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EQAAAPFjxtcOAAAA; expires=Thu, 25-Mar-2021 02:49:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:49:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  '4e6f6912-5a15-43dc-94b8-e608896dc365',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '555fa165-7dd3-4683-8fc2-3612fd8f38fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '0e9a45f3-85dc-4e02-8cd6-4c43395025e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '73182414-3d6b-41e0-be8e-39133d9de1af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '597',
  'apim-request-id',
  'cf285f37-627b-41b2-8634-8bb529a893b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '312',
  'apim-request-id',
  'c14022f3-314c-4b3a-b654-fc587736a083',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/0a439033-f51f-4a36-85db-3c413244276a')
  .query(true)
  .reply(200, {"jobId":"0a439033-f51f-4a36-85db-3c413244276a","lastUpdateDateTime":"2021-02-23T02:48:11Z","createdDateTime":"2021-02-23T02:48:08Z","expirationDateTime":"2021-02-24T02:48:08Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:48:11Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T02:48:11.4917565Z","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '384',
  'apim-request-id',
  '557be1f8-dec5-4b51-a5c7-1b66c9f81dbd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:49:20 GMT'
]);

let nock = require('nock');

module.exports.hash = "9bb4c765f0ddb627192fbb3106197a49";

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
  '99841da5-37d2-458b-928f-61d2c54a7200',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AtV5H9_oFoFNpCupa5SSwj5z_bg1AQAAAGWzftcOAAAA; expires=Fri, 29-Jan-2021 17:44:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:44:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000',
  'x-envoy-upstream-service-time',
  '660',
  'apim-request-id',
  '8ad4f412-ea22-4037-88d2-74fc66a10691',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:11Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:11Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '20',
  'apim-request-id',
  '39502922-d12d-492e-84f8-cac2eb9b5f2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:11Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:11Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'db0a54fc-2240-4de8-9d3d-f7899f8c1e0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  'c4c3e0b4-069c-4064-b0bf-2343b0df8f54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'f39283db-4afd-4327-87bf-ff82831f0f7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '4299e8df-3be9-43c8-9092-2e437f105de3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'a200d8e3-e9b1-4a3a-bf76-be5f9bdb5ab0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '4f3d9497-5055-4bf3-9373-f52114088995',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  '67dcc78b-cb6e-4bee-baf5-2c14323eb783',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '6f4cd01e-81c8-48ea-b536-ca559e501a60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '286ca60e-3958-4ddd-ad3d-aa89366fbc68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:29 GMT'
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
  '99841da5-37d2-458b-928f-61d2b4527200',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AtV5H9_oFoFNpCupa5SSwj5z_bg1AQAAAGWzftcOAAAA; expires=Fri, 29-Jan-2021 17:44:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:44:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '182',
  'apim-request-id',
  '71ec9253-45cf-4c11-bb2f-249fb89e0434',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'b62a23fa-b7c6-4355-b1f9-6c1f33cfc91e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  '1e3f6398-da4c-4453-9c40-d2f5fea23ed1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  'afa4f38a-04ad-4507-bcce-8a92b85e13d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  '5fb0921e-d297-4a02-b9ca-faaced3dfe88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'd4ee3bac-2acf-4b0d-96d4-d77636a8c869',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'e703786c-618d-482c-9431-569bd8113eb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '615b7828-b5d4-4f46-86c2-65496cb1dc91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'dc9748ce-2935-4d6d-80a0-4ce3a904c4ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  '8667889f-f39b-44dd-ba64-02de86e6c30f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  'a91d7603-641b-4c81-b8d5-c9530b4e28a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '721b844a-c19f-4e40-8217-3f13872abd15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'e07ee5b5-6292-4a74-aa04-ee69b6fec4dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '3a6c0630-c228-4860-b96f-30e89174c8b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:01 GMT'
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
  '619cd4c3-466d-4380-80f6-a40613157000',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtV5H9_oFoFNpCupa5SSwj5z_bg1AgAAAGWzftcOAAAA; expires=Fri, 29-Jan-2021 17:45:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:45:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  'b5825754-6eb9-4799-8960-24e51ce54621',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '7251e265-5621-4fa7-85af-300f3f42df6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '69311d2c-746f-46e2-88b5-9d4308265380',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '37e4b08a-495f-4f20-942d-db1e5cb5a262',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '2b931550-d0f1-410d-937a-f7303cd0eb55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  'ca2484b4-b602-46f3-aaea-623bd484d060',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '238',
  'apim-request-id',
  '6443a323-adb6-42ba-b044-d941fe83f030',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '50bf124f-5595-4f93-b42d-5c0f8a89ff5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '193',
  'apim-request-id',
  'b3ef4d25-1542-436e-b489-143f7508ae9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  '174c0d0f-2094-4a50-8d28-a462f5714869',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '245',
  'apim-request-id',
  '2bae5e65-a880-4fe1-9e39-7ade918fb5d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"escrito en Español","category":"Location","offset":20,"length":18,"confidenceScore":0.26}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '267',
  'apim-request-id',
  'a83d7f62-3cc9-4b2c-b1ef-07738d79beb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"be58bb1d-39b6-4b2d-8640-b1fe085ce631_637448832000000000","lastUpdateDateTime":"2020-12-30T17:44:13Z","createdDateTime":"2020-12-30T17:44:11Z","expirationDateTime":"2020-12-31T17:44:11Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:44:13Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"escrito en Español","category":"Location","offset":20,"length":18,"confidenceScore":0.26}],"warnings":[]},{"id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:44:13.6217812Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["Este es","document escrito en Español"],"warnings":[]},{"id":"3","keyPhrases":["猫は幸せ"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '237',
  'apim-request-id',
  '47a9f09d-c9e1-4368-8209-40cdbc701c79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:45:27 GMT'
]);

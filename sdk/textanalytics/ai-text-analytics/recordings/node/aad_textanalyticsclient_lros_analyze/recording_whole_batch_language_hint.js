let nock = require('nock');

module.exports.hash = "4448ddd42bb838ea8b904c48a5034681";

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
  '1680bab7-43c2-4e64-8ebb-95cb1d896700',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmTji1FCGj5NqQlLv-ZDUhM; expires=Fri, 29-Jan-2021 17:37:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:37:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000',
  'x-envoy-upstream-service-time',
  '649',
  'apim-request-id',
  '14d60947-5be1-41a5-a941-b1715c23c2f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:28Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:28Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'b0a8aad3-fb58-46a9-91ce-13ba5a965eed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:28Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:28Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'edf35a79-707a-4452-9a7a-9650b68a8d29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  '49178e55-8fa5-4fde-a1b6-912cee178ebf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '360b93fd-bc92-46f5-a967-7e10d60bc23a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '538f4032-167f-4480-8c58-6c8c54cca0c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  'ba4859f5-999e-4170-a1b4-026ad20eba18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '11bca410-8584-4ef8-b3a1-40048811d40b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '6dee7878-0e8d-494c-9ce6-9b833a0a0019',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '51a45914-da23-46b3-843e-19c92cc41572',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '5a8ae9b5-b721-4bd8-860d-6f7e97bd8e47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  'f201823f-8c05-404e-97b5-ecb3a15ebcf1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  'a7538377-677d-4fed-abd4-6ee1dd22d414',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'ccf45cb3-94e1-435a-b0a9-881d821767ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '8c774323-e54b-48a3-afcc-9421bd8686f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '89891f7d-802d-4925-a8e6-f1e2f6227503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:56 GMT'
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
  'ce809510-e293-4527-9d67-412c6a3e7000',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmTji1FCGj5NqQlLv-ZDUhNz_bg1AQAAAPexftcOAAAA; expires=Fri, 29-Jan-2021 17:37:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:37:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '7417dd4e-22c1-46df-a620-65abc02e9b38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:37:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  '3a20f0e3-1dee-4c3a-8bd4-fec92a7c915e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'e46137c5-2bc8-4d35-b4fd-e9cc3965b7f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '132',
  'apim-request-id',
  '1f601b24-1dc3-4684-ac07-b358e01ec15d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '72443bfd-40fc-430e-88e8-2abea85df617',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  'ef38ce55-7ddb-44eb-98a2-f29b95b7f6cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '6a91b95b-b9e5-4aba-af1c-cce22c0c038c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '59ea7d24-0502-4464-b566-8b6f9099387e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '4afd8851-f54b-4992-a5f6-1cdcd556f456',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  'f2544913-ac87-40e7-b9c7-4cdb51bc4075',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '21bc46de-f67f-4e56-9aba-38d2a9bd6324',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '212',
  'apim-request-id',
  'ec20d1c7-dc89-46a8-9c8d-dc158a2d5995',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  '01795a0e-b3f3-411e-b7a8-49b6d2de4183',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  'a5610d53-62fa-4941-95df-730ccc4cb21b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:28 GMT'
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
  '1a0f2b39-769a-487c-8d79-614f8bef6b00',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AmTji1FCGj5NqQlLv-ZDUhNz_bg1AQAAAPexftcOAAAA; expires=Fri, 29-Jan-2021 17:38:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:38:30 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'a85f8626-935e-4fd1-aa7f-6b5189db2356',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'c6512a1b-310b-4b0e-b262-f7f3a687fdb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  'bf78ca9a-fb07-47cf-9c4a-852db52520f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '262',
  'apim-request-id',
  'dcd01a3f-ad44-4806-b03a-6d26ba3271cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  '52cf32e6-1e3a-4257-95a8-0c00933a2406',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  '6ece822d-43c9-45d6-aba2-0982f66937ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '7ebfbdd7-54ad-45dd-beb8-d0260ccc8230',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  '2bc150e4-9f6d-4cef-bd21-8c426c7057a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  '122f8b35-8d67-4442-bb20-1cb4bc44e32c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'e392d968-7b8f-4941-89bd-862d14a950cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  '2bb16e96-a06a-4b2d-acfb-b0723c73cba4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '5aec8979-1982-404f-ba6f-f1ef18bbd067',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  'b780e2fe-3edb-4078-ac93-7a2c7d4d7006',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  '2333d0ef-b8c9-4fe6-a1d4-d4880113b38c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:38:59 GMT'
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
  'f1069849-c588-4ff2-abc1-517900667100',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmTji1FCGj5NqQlLv-ZDUhNz_bg1AgAAAPexftcOAAAA; expires=Fri, 29-Jan-2021 17:39:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:39:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '455',
  'apim-request-id',
  'c67b6267-5935-437f-976c-b597a544f4fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  'af53e451-ccb3-4e3c-b213-92d2fafbfb87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'd784f104-3862-4fd3-a27b-1bc5ac99afb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  'a1ddbdec-c504-4af5-adbb-ab3691ca6066',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  '7a1002fa-5f06-4890-ae25-edeeb0e265d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '011eb62e-7c39-496a-b05c-02ced1758db5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '211',
  'apim-request-id',
  'fa52a629-d231-4b32-ad83-3bf5ec9a6014',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  'fc08c276-421f-43db-864b-ce45bf69555f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  '9317d366-67a1-46b3-b416-f071603ddb94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'a7c6411b-f805-410c-9dd9-a22cd0e6a97e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '1e94fd60-7a78-400c-b7e2-a1e9e3633c58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  'dd722e2d-36fa-462d-a4e9-d3e2ee686ea7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  'e99433b7-2d02-4f6b-89c0-4df8c02ed43d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  '44e7cd53-99a1-4447-8993-18330ba1e658',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:30 GMT'
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
  '66e90762-4dcf-4110-a204-af4ee6247700',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmTji1FCGj5NqQlLv-ZDUhNz_bg1AwAAAPexftcOAAAA; expires=Fri, 29-Jan-2021 17:39:34 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:39:33 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '259',
  'apim-request-id',
  '1288242c-61ce-456f-a90b-9a2cd6417adf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '194',
  'apim-request-id',
  'c8ca7489-2456-410b-82cf-d63f72c23ed6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  'bf31a674-b886-48c1-a019-1ce84a53c2ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '237',
  'apim-request-id',
  '0fe7e732-90d4-4e90-a489-cfd9c94b68d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"98d19f4c-4d62-4c6b-be08-d8a79c4e0038_637448832000000000","lastUpdateDateTime":"2020-12-30T17:37:29Z","createdDateTime":"2020-12-30T17:37:28Z","expirationDateTime":"2020-12-31T17:37:28Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:37:29Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:37:29.878683Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  '90721393-d92e-46aa-b907-8cabc2e404db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:39:41 GMT'
]);

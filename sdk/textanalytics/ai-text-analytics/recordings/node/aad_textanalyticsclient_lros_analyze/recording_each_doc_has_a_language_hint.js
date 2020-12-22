let nock = require('nock');

module.exports.hash = "3cffc4faadb68567896683f9b5bd74ed";

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
  '4ec55ce6-22c9-4742-8552-877e0a0add00',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AqIujJWowP9Gidl8d8edOi9z_bg1AQAAAFJMdNcOAAAA; expires=Thu, 21-Jan-2021 20:21:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:21:38 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000',
  'x-envoy-upstream-service-time',
  '418',
  'apim-request-id',
  'ecb263c4-69db-4a20-9f8e-f2f371b30e09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:39Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:39Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'c952c980-a523-48e9-8259-846f01403756',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:39Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:39Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '5ad7332a-f14e-4cdf-bfb6-ca00230777be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '47676c38-dbeb-4707-8d2b-e35416d3505d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '3204ae54-039d-4f99-8e36-07b8f29c01ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  'f8352887-183f-4ef9-8734-1bc0ce20913b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '254',
  'apim-request-id',
  'a7e1a399-f757-4719-8ef1-346e4b22a3c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '5ba4c97f-105f-489a-9d73-b08882a01f05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '8ad0a193-c2dc-4ec2-8f28-670d9e143d78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  'f827202f-cab6-40b3-825e-a6144d0dc0f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '084a4183-8519-4fcf-ac7d-790f6d83eccb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  '998e3700-ba68-42fa-8808-1a8ce7cda6f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:21:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  'e65fbae5-deca-4cb2-8fb6-999924aee50b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'fd33e5a7-1990-4326-a207-b0d50ee187d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '6e67a10f-78f9-4dda-8f60-9881713f833a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  'a95dff84-a078-4c5f-ab85-93d46d0bd8c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:08 GMT'
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
  '9341e2b0-e702-405c-9357-3e19e9dd8f00',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AqIujJWowP9Gidl8d8edOi9z_bg1AgAAAFJMdNcOAAAA; expires=Thu, 21-Jan-2021 20:22:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:22:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '7238d0e6-fb2d-4f41-9d16-e50b1c914b7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  'a9370641-1398-4042-b140-07968a753383',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '230',
  'apim-request-id',
  'c0e4898b-5714-41eb-94b3-82729b256a82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '611e8422-4332-466a-a734-327a2619955a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  '982617e7-5928-4456-8bac-8fe6924c8562',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  'bc31e964-d4dc-4cde-889e-e2caf1b1e516',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '8fcf8c8c-e1b6-49c8-9155-775dbada7b5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  'ec605c1f-38b0-4f3e-be74-a6c992f55230',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '966c3f5c-2ace-493d-96f8-f777efeaa834',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '5933e48b-8750-4a0a-82ca-b2d6d6b520ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'dff103c1-df3f-40b0-82a4-679e16f795bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '16e80d08-6bfd-4602-9c45-17e6a6bca1d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  'a11cf97d-18e3-41e3-8d76-5c65ce113a79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  'aa739955-68b8-42b6-aac1-ca4be7e87e35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:40 GMT'
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
  '4ec55ce6-22c9-4742-8552-877e4516dd00',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AqIujJWowP9Gidl8d8edOi9z_bg1AgAAAFJMdNcOAAAA; expires=Thu, 21-Jan-2021 20:22:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:22:41 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  'c3c5861e-fc34-4492-9f82-8956ea9f05a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '27953695-6313-4a9c-b0fc-8ca369a7ea00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  '6f9cee8e-ff8d-4868-9db0-70913491ea6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f9fafb90-7b83-4c85-a5c0-8d1ab09b6ffa_637441920000000000","lastUpdateDateTime":"2020-12-22T20:21:41Z","createdDateTime":"2020-12-22T20:21:39Z","expirationDateTime":"2020-12-23T20:21:39Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:21:41Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:21:41.0196481Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '71b8191f-bbf2-4c5c-b1cd-991c89f7eeb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:22:46 GMT'
]);

let nock = require('nock');

module.exports.hash = "641d271f045bdc4bd763e7aa2b25767b";

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
  'e02990bd-6465-440e-b7ab-57a5d573e400',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoVWjJleJKNFmPA_F9BBRzdz_bg1AQAAAANLdNcOAAAA; expires=Thu, 21-Jan-2021 20:16:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:16:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":"w"},{"id":"19","text":":P"},{"id":"1","text":":D"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000',
  'x-envoy-upstream-service-time',
  '504',
  'apim-request-id',
  'ea874beb-f50d-4cf9-8b52-cd32578b7400',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:03Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:03Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'f7097378-1df5-43f3-acce-718bd79ca218',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:03Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:03Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'a71e598d-87ff-4f7d-90f4-56b74d266f20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  'fb3897af-d757-4bf4-b170-9aaa22877a05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  'a2d8eee1-9357-4811-8fa3-8940e15f6af0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  '12ee46da-2cd3-4a26-85b7-f29c5b3b5a3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '233',
  'apim-request-id',
  '8dbf3f6c-44ba-44d2-94be-3f9f9013a969',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '88031989-c2cd-4a15-bcd1-00ab8117055b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '458a4af7-fb95-4187-958f-5e9970c9b699',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '6498a842-e71c-4e6f-96ab-816460a48cd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '80d3e4ca-bfe8-4d2c-8961-87d8788abca9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '74f978e0-fc7a-49cb-afa5-b30dd62fa77d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  '086faeeb-31d6-47dc-8423-4ade49f03d21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  '8ca6db21-ae72-42fc-9f23-3791a2c7084a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  '4b95d77b-8f23-406d-90d8-4653a4b4841b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:30 GMT'
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
  'd5fc3a8b-54c1-4f15-9aac-33c2b31ce600',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoVWjJleJKNFmPA_F9BBRzdz_bg1AgAAAANLdNcOAAAA; expires=Thu, 21-Jan-2021 20:16:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:16:33 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '272',
  'apim-request-id',
  'd563efc7-b9c0-4b0b-93fd-0b5ab31a99a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '13f27dc0-d170-4c6a-9322-e247aa98f187',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '7d9ce1b0-cbd0-4adf-8d1e-b3320c494ecb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  'e292232c-cb86-4c9f-8422-5f162a5dded5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  '4ddc5376-ab25-42cf-a4db-2b511dc1b34b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  'f4562800-ca10-4cde-ac31-4a3cd702164d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '310',
  'apim-request-id',
  '34891d5d-2f5e-4ba9-a54c-bec33b090eab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  'f9d03276-a1e1-4cc4-b3f8-8c9f014b06b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '006ac268-603a-49f1-8266-0006235c6e05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '79d1deaa-4ff2-41b0-980f-81eb96fdaf0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '3accaa21-539b-4ee5-b2c7-8754d785989b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  'ac4aad58-9b3c-40cc-ae4c-5972cba49b12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '3391cfb7-6774-4cc0-a6a1-a0247c664cc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:16:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  '16639792-2bc7-4b2f-b2fa-d61a198bb8dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:01 GMT'
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
  '04fefef7-02e4-4585-bad0-ad0e1bc77b00',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoVWjJleJKNFmPA_F9BBRzdz_bg1AgAAAANLdNcOAAAA; expires=Thu, 21-Jan-2021 20:17:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:17:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'f53ae851-0f41-4f0a-b878-1c6435db3076',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '279',
  'apim-request-id',
  'd59dc590-6e90-4b7d-8cf6-63a200d706a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  '98c4e69e-aeeb-4641-bf77-c37a152a090c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  '605c4708-e9a3-4b9d-95cd-fd391822a9ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  'de7e61e8-ac56-456f-b250-3733075b3ed2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  '9e8cfae3-990c-4220-a24f-96a4e395d545',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '281',
  'apim-request-id',
  'f503a5ea-d203-471e-b06e-98e8527914c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  '9e10e9b2-ea20-4f57-9620-2aa608b8c9d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  '00f48a72-0125-41dd-8ed6-4e6ede5a60de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  'd5999590-552e-458d-b5c8-2d79530820e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '238',
  'apim-request-id',
  '3e6c2315-3228-4688-8a5d-de76df72ae57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  '677a17d7-5e11-4a79-bd46-0f7ff9ffbc8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '257',
  'apim-request-id',
  'b1f4de80-3976-48a6-a82b-95e9efeb1a9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '294',
  'apim-request-id',
  'ef13e9ae-59db-41c3-a0db-6f7b0762897d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:33 GMT'
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
  '27f2771d-174d-433f-bbb7-1a9f0f5ddd00',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoVWjJleJKNFmPA_F9BBRzdz_bg1AwAAAANLdNcOAAAA; expires=Thu, 21-Jan-2021 20:17:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:17:36 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '280',
  'apim-request-id',
  '105d6104-c654-41ac-9c79-aa0d048ddd7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'e66d7a5d-ac5a-43f6-9fe6-54c29c9209ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  'f04b64b5-f71d-4c3a-be27-baafa0fdea68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '256',
  'apim-request-id',
  'a42f57aa-f99d-4a93-aeac-06750beda175',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '246',
  'apim-request-id',
  '8358584e-e74a-47a9-88af-15647077c4bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '306',
  'apim-request-id',
  '3ccde01b-a91e-4a2d-bba5-38128b84aa07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '286',
  'apim-request-id',
  'f8e9d547-2e16-4efb-83b5-ad7adbcefb3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  'c2bc7994-eaff-4b7d-9412-6f636dd1b36d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '390',
  'apim-request-id',
  '52f4a562-77d5-43f8-a961-71ced832a21c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  '6ef824d7-50af-44de-9f69-7810e5536c09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  'e4d2bed6-36b5-4085-a657-6502b3b84c54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:17:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '267',
  'apim-request-id',
  'ed3ac2cc-5042-4aed-ab58-86da36cd5e57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:18:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  'db698529-d56c-4b61-a783-6014abfbe78d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:18:03 GMT'
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
  '9f74e5fa-0757-4862-a2c2-f0c42919d600',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoVWjJleJKNFmPA_F9BBRzdz_bg1BAAAAANLdNcOAAAA; expires=Thu, 21-Jan-2021 20:18:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:18:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '277',
  'apim-request-id',
  '57cbbe10-5ce2-4d34-8375-9d35b7c59b66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:18:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '281',
  'apim-request-id',
  '2725b6de-4da8-4bc7-8ef2-718e1f6241a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:18:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '223',
  'apim-request-id',
  '20c9270e-4de2-4dc9-a22b-dbc3065fa213',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:18:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  'cbedc673-dd7c-47ac-a4b5-9f8923c6dc2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:18:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '396',
  'apim-request-id',
  '1a800362-01c2-4190-8920-442fe7c7ad57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:18:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"d12e15ac-48e5-4076-81b1-ba913a200019_637441920000000000","lastUpdateDateTime":"2020-12-22T20:16:05Z","createdDateTime":"2020-12-22T20:16:03Z","expirationDateTime":"2020-12-23T20:16:03Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:16:05Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","entities":[],"warnings":[]},{"id":"0","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"redactedText":":)","id":"56","entities":[],"warnings":[]},{"redactedText":":(","id":"0","entities":[],"warnings":[]},{"redactedText":"w","id":"22","entities":[],"warnings":[]},{"redactedText":":P","id":"19","entities":[],"warnings":[]},{"redactedText":":D","id":"1","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:16:05.7827112Z","results":{"inTerminalState":true,"documents":[{"id":"56","keyPhrases":[],"warnings":[]},{"id":"0","keyPhrases":[],"warnings":[]},{"id":"22","keyPhrases":[],"warnings":[]},{"id":"19","keyPhrases":[],"warnings":[]},{"id":"1","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '273',
  'apim-request-id',
  'fbd5f466-d982-4433-a7ff-283fc9eea064',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:18:16 GMT'
]);

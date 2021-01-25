let nock = require('nock');

module.exports.hash = "4d5a32c8ba377db69e74381db765151f";

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
  'dfcb7259-a9b5-4163-8973-954434b94600',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ahqv1Rc4XHxIt7qw2bfIIKA; expires=Sun, 20-Dec-2020 00:30:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:30:56 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000',
  'x-envoy-upstream-service-time',
  '478',
  'apim-request-id',
  '90c936ad-d4d1-43ff-96c8-ac59b7e57905',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:57Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:57Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'bf6ffcbd-6a62-4120-b99c-3b87a5469b95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:57Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:57Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '86381a27-f231-40e6-8d51-56f7677f82e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:30:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'c26a65b7-1bd8-4cce-beff-dd5a6c185f76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '84e222df-67b0-4b49-96ad-7893798163b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'b74214c1-f345-4616-b316-eb750de9d36c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  'b590ef50-31f8-40be-a890-d356108caf52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '1936cb31-5245-46e3-8d75-c6c98323d29f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'eaf2c7ab-a6af-4eca-8e44-4d3362c4aeec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  'b64a88c5-f60f-485d-9703-2e56956028d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '5f577b22-e7fc-4ca0-8737-ab6c5bcca8c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '71f50486-79b8-46ef-b020-480700091772',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'f78b3611-4716-4290-9e97-46aff01e333b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  '0160e437-77cb-4a05-80f9-229f90f115e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '78bb184e-92cb-4f5e-a3f1-91c086ac7aa2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:23 GMT'
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
  'd88dcdc6-cca6-4b02-88f2-e4f628f44400',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ahqv1Rc4XHxIt7qw2bfIIKBz_bg1AQAAAF4FSdcOAAAA; expires=Sun, 20-Dec-2020 00:31:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:31:26 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '483',
  'apim-request-id',
  '14f3cc98-3846-4bd5-8074-6c3c736fb1d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '5696fc8e-d141-40d4-a501-cbf174b95330',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '34bb8fbe-1631-4dce-9b76-e5d334d64361',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '4d7239aa-77e8-41d9-860a-ce536f960da5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  'b13b6905-04b6-40ab-83f4-f76fe9d0d1a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '75bcd96b-478e-48e3-8905-ade20a9e5262',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  '14d22c55-562e-4ab3-8d7b-cec76848ed39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '9025d805-16da-480f-b991-f447964c1918',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'a1e5b8e1-f83c-403b-8420-3845451fa2d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  'b122cad7-7bfb-4031-b584-c5d0dac35c09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '89d701cd-b987-4ca1-8760-d4628454280a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'e7ecde2b-2bd6-4be8-a844-2ca480f7bce8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  'df4e2c39-3b78-46fe-97c5-829fab95fb34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '424a8195-e954-4a15-adc6-73aefebe2d5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:55 GMT'
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
  '0ab02ce0-5f9f-45d7-88a5-caaafec44400',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ahqv1Rc4XHxIt7qw2bfIIKBz_bg1AgAAAF4FSdcOAAAA; expires=Sun, 20-Dec-2020 00:31:58 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:31:57 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  'f17670f2-e014-4f67-be7b-9a50156fa29a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:31:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '358',
  'apim-request-id',
  'cdde4e93-d1fa-4181-bdec-8fe49e63a192',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '61278572-b16a-40d1-947f-486a0a62daf7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  'b441b649-2e4c-4df3-9069-ae6181afdfc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  '84f03eff-6402-4a53-910a-2c9e1d9121f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  '6db56f60-0a56-492b-8fa2-1476a4facc46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  'cc01f274-60b3-4d52-b565-1849d21fb552',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '359a0d96-56b3-43fe-8f27-5fe0947433b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'dbb6f3b6-fb31-4b84-bc3b-3face45e05f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '797ff7b0-5f0e-42a6-9b81-0bd53b4bb0b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '17d2d310-61d8-4951-9eb8-e49d6d59790d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '3cb289fe-65f9-4a9c-bd5f-cc3122ad6411',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '8b1407af-da90-4fc9-a406-a5bbc28d8afe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '182',
  'apim-request-id',
  'a01e9180-6fb4-48e2-b7d0-d470fbbcc154',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:27 GMT'
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
  '175f730e-92cd-4863-85a3-baef41316500',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ahqv1Rc4XHxIt7qw2bfIIKBz_bg1AwAAAF4FSdcOAAAA; expires=Sun, 20-Dec-2020 00:32:29 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:32:29 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '215',
  'apim-request-id',
  '2f51da92-b5fe-4647-8309-732e8e649369',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '6dc1f962-327e-4168-b72b-d90eb7626d49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  'a0e23042-fb37-43cf-85f5-005ff52480ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  'ffe36f7c-62bd-45ef-b434-7bdcc4e0a645',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '4e4544d0-4815-420b-9a9b-cc3d09c3a689',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '952a0595-35ab-419a-a1ef-507fcb058ab9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  'b55f4ee6-74b4-4b54-9622-7f4fa29c07fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'cad1108d-efa7-4523-bb19-184cca246f7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  'b7a2b6b7-0389-4285-a250-de8758e1fd7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '7081ffe2-31a6-4191-903c-79b953b599e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  '60aae42c-4ee2-4505-a536-be1be196e6c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  '8ebf61c4-3cc1-46b6-af67-376182118ee6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'd3f8c8c2-2029-4298-8fd8-9cec576c3354',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  'f27cfa15-566b-4890-9812-2dbd42e45709',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:32:58 GMT'
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
  '978cb36c-5b96-4542-94c4-a945b3554400',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ahqv1Rc4XHxIt7qw2bfIIKBz_bg1AwAAAF4FSdcOAAAA; expires=Sun, 20-Dec-2020 00:33:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:33:00 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  '96a3e8a6-2eec-4f8e-91ae-87850b26dbab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '77a7cc05-0782-4ae8-b33e-f73c6158a884',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr"}}],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '0e90c51f-c63b-4c09-abdb-f6caeb34686e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"191f6e26-7a2e-48c8-bc4b-f195e4c69af9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:30:58Z","createdDateTime":"2020-11-20T00:30:57Z","expirationDateTime":"2020-11-21T00:30:57Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:30:58Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr"}}],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: en"}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:30:58.9992698Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '5324d83d-cafc-4052-8722-afe31bf06f48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:05 GMT'
]);

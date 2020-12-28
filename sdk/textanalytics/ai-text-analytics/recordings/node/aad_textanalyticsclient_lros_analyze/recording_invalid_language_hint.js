let nock = require('nock');

module.exports.hash = "39b138ed3b3b79a39a501c982290d40e";

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
  '6a9f55a2-bb68-43b1-9e74-7083efadd500',
  'x-ms-ests-server',
  '2.1.11328.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai6tl0MKbKdPtr0YpnQX0npz_bg1AQAAABdNdNcOAAAA; expires=Thu, 21-Jan-2021 20:24:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:24:55 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000',
  'x-envoy-upstream-service-time',
  '564',
  'apim-request-id',
  '92231534-4381-4f33-8ddd-acde740706fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:24:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:55Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:55Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '94119020-a72e-4095-aaa8-adbc43bff67e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:24:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:55Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:55Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '716ef497-a6cd-4f56-b270-d3f4a0131234',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:24:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '291',
  'apim-request-id',
  'e27287e1-87bd-4684-9b85-eb8c562b308c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:24:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  'a03d8bab-819c-4af5-aefb-a0452f88a4ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  '58351a12-4d3d-4890-a771-2e0523b21c6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '223',
  'apim-request-id',
  '0a0bfaf6-84ee-4c8a-94b6-834830ac176a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '843a0ace-4b95-46c4-aa0b-682759748e83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'e0eab15f-11c8-4e6e-8e37-b23979fdccf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '9c8ce548-3685-4128-943d-28ab46ce78e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '14348eee-7f9f-4e8d-8197-23bbf981d341',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  '35a28cbb-26c1-4e1c-a29f-1ef7d4df5b84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  '246d5aae-8fb6-4677-80fc-1097444f4658',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  'c4957dbe-a368-479b-b4a5-1b9dfaa264de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  'e714bce5-12fe-48cb-9c47-c0bf8ca0f59e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:23 GMT'
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
  '6be1c869-7f1a-4087-a770-5a645778da00',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ai6tl0MKbKdPtr0YpnQX0npz_bg1AgAAABdNdNcOAAAA; expires=Thu, 21-Jan-2021 20:25:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:25:25 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'b41c9210-e020-4fa3-a3dc-8c0418089473',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '831d4b3e-82db-4ce6-8e33-ee8a96fa4cc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  'f84acf37-2b34-4e60-84b5-b0f32f5bd334',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '3fab7052-6665-44a6-aec0-deaf31ebe976',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '4262ddc3-4656-4827-8061-a5fd32f41c78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '585a3845-7b78-4b0f-af2f-523437f03845',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'f1f37ac7-50ce-46dc-b79e-e83abd0ad65f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  'a6a6c8af-7a73-4c6c-83c3-76559fd33b02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'de290b0c-d67a-4eb5-808c-e657aa1ebb92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '5b612a7d-8ed2-4146-8c8f-767f1204acd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '99d40d54-0677-422b-9025-69b610f2bf50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  'f9f903e2-e315-4a8a-83ef-408f055aee8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '4f79b11c-7f9e-4906-aa1d-25b675fc88ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  '8e6db337-1d63-40ea-9df5-f9180a670808',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:54 GMT'
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
  '355d2142-339d-4d8e-ac28-bbe3d79e8e00',
  'x-ms-ests-server',
  '2.1.11328.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai6tl0MKbKdPtr0YpnQX0npz_bg1AwAAABdNdNcOAAAA; expires=Thu, 21-Jan-2021 20:25:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:25:56 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '6865d26e-6450-4828-9872-9e25a030d78f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '7e2c1af6-17c8-450e-bc85-30003a53655d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:25:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '0262c5ce-87e0-4067-9ec9-4789409b54b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'ecca4dd2-c54d-47c0-b5f7-55d44cfa66c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  '2d709891-95d0-4464-b9b0-900e8f8f3e44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '5df31839-fdd8-49ee-a9b8-9526807a9852',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '0db175e7-2bd2-4c47-8e77-f7df9a99f2d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  'ae644281-5c6e-444c-b2c3-8b3d96da8ab6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '294',
  'apim-request-id',
  '3c21011c-4c52-45c3-8bad-9333ea1e88bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'cb675dd1-f04e-429a-bd51-32dfbbef5f12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'fe1d0804-72d9-43a0-aeb3-45f81c249ca4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '492072ab-541d-45c5-b8e0-d634010d18fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '6ba02bf9-26a9-40f3-aa25-4fe0562fc39f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '6e20d6d1-f7e9-4971-bc44-4ef6b4479750',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:25 GMT'
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
  '73c6137c-ffc3-4738-9a0b-d2e5a6acbd00',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ai6tl0MKbKdPtr0YpnQX0npz_bg1BAAAABdNdNcOAAAA; expires=Thu, 21-Jan-2021 20:26:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:26:26 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '29156591-3a18-42f4-901b-1b39b46ef766',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  'a80d8a5e-abcd-44b4-8dde-02773b0d1c9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  'bad0638a-face-4d72-bb97-185ebdbe49c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  'f9565628-e74c-4b6e-90f9-ca151a6cc9d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  '91274be1-1ff0-4854-b530-2a904c37e538',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  'e9060006-4019-48fb-8bd5-7c93c9e61db4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'c6ba7289-cb13-4232-8ac9-a176502e1532',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '1275383a-32ef-4c74-a39b-2544f921c58e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  '8b75f5d3-2f6d-46de-9b46-097a1e6a32ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  '48d747f8-02b5-4992-bc53-776a30c1be0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  'd6d188dd-ffc8-4162-984e-449053fbd4b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  '50ce1c81-bfcb-4e27-aed7-ecbeecc45b01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  '85258ab5-d370-4c55-8841-15119cc12c3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  'c6ad5615-8406-485b-b435-c87177b8a419',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:57 GMT'
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
  '8061f9c3-81b2-4c05-8ed4-d0438883c500',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai6tl0MKbKdPtr0YpnQX0npz_bg1BQAAABdNdNcOAAAA; expires=Thu, 21-Jan-2021 20:26:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:26:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '265',
  'apim-request-id',
  'e5e5426c-ae47-47b4-b1d8-a3b24502b821',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:26:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr"}}}],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '32162827-743b-4c4d-bc68-99677363999b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"a6381d5c-824c-43ac-ab3a-0df066914833_637441920000000000","lastUpdateDateTime":"2020-12-22T20:24:57Z","createdDateTime":"2020-12-22T20:24:55Z","expirationDateTime":"2020-12-23T20:24:55Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:24:57Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr"}}}],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:24:57.3003759Z","results":{"inTerminalState":true,"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  'ddac45c6-119d-4d50-93e9-2e1171bea6f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:01 GMT'
]);

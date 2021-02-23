let nock = require('nock');

module.exports.hash = "387cb21fad98ffac7889cbc112d6734b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '3cfe63b3-3c0f-4f27-b160-a306b8ef0c00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EwAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:00:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:00:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971',
  'x-envoy-upstream-service-time',
  '299',
  'apim-request-id',
  'c081415c-1791-4a84-a57f-a68e50b33544',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:06Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:06Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'dec66b44-32e5-49d5-903e-1e462653dc0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:06Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:06Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '75935c48-1c71-473d-8881-1abb00b01e22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  'b744863a-e91c-48d1-bf15-a479b47138d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '3a87f6e5-53a7-4a93-b7b4-dbe137b7a5f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '58dba0fb-2345-4d0d-a483-94e837415a48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '607',
  'apim-request-id',
  '82211c0c-d84e-49d9-815c-f5c66c1b093f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  'dc00b70d-b69f-49ad-a3b0-deed6d7ed429',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '75b33c85-3d63-4861-b565-89b7e50ab73a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '2314c19a-cb6d-4e4a-9744-32f0325a0f89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '215',
  'apim-request-id',
  '33332c42-b519-466e-8c8e-6952b40570ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '19a101bd-1827-4ef5-8265-8fc8d521bc6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  'a550632b-12ce-4b7f-a693-bec2790c2044',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '78ecb943-9d43-4cfd-ba65-35b9edb041ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'c830bcb7-6265-42f6-ad60-1a9c19f0092d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'e4fb8e1e-550a-47d0-8113-a2480c30ad77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:35 GMT'
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
  '4e152510-dcd2-4f06-b569-aa5eb6a77b00',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EwAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:00:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:00:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'bcf00860-e0f1-4aa0-b9f5-450aec73e7a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '0e3a2608-9e95-4d5c-8bec-34c8c33b1a15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '780',
  'apim-request-id',
  '547ade8f-585c-4dd2-bd6e-0182f476422c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '7378ad35-6e91-4c03-8a91-92ea7c719879',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '5d415d00-ae99-498c-8cd4-cf52f1143b2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '6a2fb7ce-1d8f-4a60-be9e-c5f177c937cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'ebf67608-9dba-4db0-9fec-9244e8038e45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '19955ab6-c5a2-4b53-8b11-6777460e8482',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '37f423ea-9215-4eb3-92c2-d7f3258dc3a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  'ed45fc06-9b1b-4c8d-9690-c3a7ba95e2b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:00:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '98ad02d6-9b84-4e84-ba1d-be96f0d18089',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  '48d1bcbe-02cc-4e22-b2ba-f1ec36b42b01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  'e302288a-7db0-40fe-aa79-1cad926b722d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '3ad2467a-cdf7-4979-bb2c-993761c03c7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:07 GMT'
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
  '8ce52481-932d-47e2-a5c1-c4a8b7bb5700',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EwAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:01:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:01:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  'c5b05b0b-6120-4ce2-baef-be22b2b0d8a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '182',
  'apim-request-id',
  '31831dc8-f396-4ddd-93da-de0e046402ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '2010dc47-9199-4677-91c4-171ed28b3abb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr"}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  '33e9e63b-525e-4532-80d9-530c1178816b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/b8f81bae-8433-4b63-b485-829d4c309971')
  .query(true)
  .reply(200, {"jobId":"b8f81bae-8433-4b63-b485-829d4c309971","lastUpdateDateTime":"2021-02-23T03:00:07Z","createdDateTime":"2021-02-23T03:00:06Z","expirationDateTime":"2021-02-24T03:00:06Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:00:07Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr"}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T03:00:07.4738721Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '607',
  'apim-request-id',
  '0efb81f8-56f7-4d4b-ba31-68b4edf2274c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:01:16 GMT'
]);

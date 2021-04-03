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
  'c6a6dcd3-c71f-433e-a487-3cd6096a1300',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EAAAAG9Sx9cOAAAA; expires=Thu, 25-Mar-2021 19:50:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:50:50 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  '33e764df-2cbc-48cc-95a0-9159e4756f98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:51Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:51Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'ba522a9e-a323-4dea-9898-189a1a6d7b94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:51Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:51Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'bd6849f2-edd1-409e-b999-c62815fc5609',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:51Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:51Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '4eb7a437-0336-42df-a6f6-c881b6d6a561',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  'f66e0085-3d90-499d-b402-1335e8c91fe1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '2c84f23a-d4ed-42af-bd91-5167741a30e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '0ceb088d-9fae-4dbf-80a7-9071577e4497',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:50:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  'a99e421e-47ff-47ca-932a-61cab2d2a367',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '41da8aab-b923-442c-b2ba-1f35733b108b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '116333cd-3fa6-49f2-9f17-f52b6e6efc62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '9b31c02f-e45c-485d-9f28-7afe3785333f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '05bde67c-bee8-4c11-9b35-d3b1071c75b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '70293d28-2257-4a3a-8811-869f2ff23990',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'fd0fb291-e552-4266-8e30-991d03e4d368',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'b7f1cd43-36b7-411f-a2a0-0575716cb514',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '432368a1-e000-4d07-9def-a15b6c4e0e2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:19 GMT'
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
  'cfa7c857-928f-4a0d-a44b-e4f9f55d1700',
  'x-ms-ests-server',
  '2.1.11513.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DAAAAJtTx9cOAAAA; expires=Thu, 25-Mar-2021 19:51:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:51:21 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'fc6c638c-63b1-4fd8-b14c-4468a5d53e78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '9b92583f-12e3-4192-8f14-8b523e3da02d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '2656380d-31b4-4a10-a54a-233307e57051',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'a0b4b095-84d2-40aa-862b-5ced074f41b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '27676b17-a475-4566-a457-87373c885c66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '4e2d5d36-63e7-4db6-b8b7-c4835aef94f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '04541573-1c5f-44e1-8a26-4571f03f283c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  'ad4b5331-2f94-4974-bb53-5d95486c28f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  'f73051ac-b11f-45ba-8dd7-9e7b0d28f6f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '42e18dcb-36da-47b6-9533-0178d3272ee4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  'f50cab89-f066-4e52-a909-d688a8b48347',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '2d4b5575-ce2d-4708-a448-d37343e627b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'e13cfb32-ba8e-4319-b947-3de3aa0199d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  'b0e1bb9d-6921-45a6-b8f8-ea72aff6c865',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:49 GMT'
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
  '85d060cf-ada7-485b-b965-386170151400',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DQAAAJtTx9cOAAAA; expires=Thu, 25-Mar-2021 19:51:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:51:52 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '37baf61e-d376-4b31-8159-066f13c70e6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '3ac3d133-758c-49e8-a4a6-2c3aabb8feb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '6a1f558f-f775-4764-9318-c2c7f7adbc3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '7f0425af-b1d1-4090-bacb-c5ae65ce1789',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:51:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr"}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '252',
  'apim-request-id',
  'e996143c-bae7-42f7-a833-95360e4bd8fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:52:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/4c8792a6-706d-4007-83e6-96491ec1eca6')
  .query(true)
  .reply(200, {"jobId":"4c8792a6-706d-4007-83e6-96491ec1eca6","lastUpdateDateTime":"2021-02-23T19:50:53Z","createdDateTime":"2021-02-23T19:50:51Z","expirationDateTime":"2021-02-24T19:50:51Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:50:53Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en,es,de,fr,zh-Hans,ar,cs,da,fi,hu,it,ja,ko,no,nl,pl,pt-BR,pt-PT,ru,sv,tr"}}}],"modelVersion":"2021-01-15"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: ja,ko,zh-Hans,de,en,es,fr,it,pt-BR,pt-PT"}}}],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-02-23T19:50:53.6046948Z","state":"succeeded","results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: da,de,en,es,fi,fr,it,ja,ko,nl,no,pl,pt-BR,pt-PT,ru,sv"}}}],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '179',
  'apim-request-id',
  '9cfbf737-14bc-498c-a2cf-3f75ff85eb15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:52:00 GMT'
]);

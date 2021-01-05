let nock = require('nock');

module.exports.hash = "634b72bc73378f430ce577047415d239";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'afa9a348-94e8-477c-b674-01514e10e800',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al1jGqiM9-RCkn1mfOfRRTdz_bg1AQAAAJVNdNcOAAAA; expires=Thu, 21-Jan-2021 20:27:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:27:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000',
  'x-envoy-upstream-service-time',
  '483',
  'apim-request-id',
  'da44c540-aeac-4b8c-9db8-c5558cd6cde4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:07Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:07Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  'cc2e6d69-bfa1-46ca-b0cf-03f55466799f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:07Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:07Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'ef8228f9-e032-4865-aa29-6c3fa230fc22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:07Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:07Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '12949520-0d8f-406e-abff-23ced0c10622',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:07Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:07Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '9466e046-daf3-47c8-90c4-89b5d7e86023',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:07Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:07Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'a532c585-9cc9-49dc-ada4-04d0080fa234',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:07Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:07Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'c55ac000-dd41-44d1-990b-8e5ad4b87846',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'da1a9387-e41a-4459-b7db-b255fa37ea7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'b7a55e59-20e1-46b8-b960-8f5178dafcc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '258',
  'apim-request-id',
  '96e6f8a9-f1fa-40ca-a81d-3dc8b49f61f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '262',
  'apim-request-id',
  '0f5d641b-9472-4cc0-a866-5edce5f60578',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '300',
  'apim-request-id',
  '52161b98-8c37-44de-bc59-02ce135d0abb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '7d814447-77c6-4230-b608-0b4674c14338',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:29 GMT'
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
  'd113e8f6-881a-491d-92dd-c03b23cdf500',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al1jGqiM9-RCkn1mfOfRRTdz_bg1AgAAAJVNdNcOAAAA; expires=Thu, 21-Jan-2021 20:27:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:27:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '342',
  'apim-request-id',
  'a967a3c4-8a99-4fcb-8324-99a9f3364761',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  '8efed36f-1d50-4960-b4a2-e1108dc807a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '240',
  'apim-request-id',
  '96ef1f89-a2c2-4455-927a-01a8a7336933',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '321',
  'apim-request-id',
  'b6a8193e-3b76-4aa2-b40b-34b816f4175d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '241',
  'apim-request-id',
  '598e4bec-9c7d-4602-a9bc-05ae216f7261',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  'fcf5bcc8-0e76-4677-b409-b6b04af5938c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  'c2ace5c0-6ef8-45d0-92ab-5878edf0767a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '288',
  'apim-request-id',
  'aac8a9a0-c639-40e2-bade-8a75190cfebe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '352',
  'apim-request-id',
  'af774735-6793-4d5d-8b31-351107925d03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '296',
  'apim-request-id',
  '0f90391c-4e7e-4004-b387-73239916810c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  '51c6ee30-ac8c-4605-aad7-269edc06779b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '309',
  'apim-request-id',
  '60a288b0-3427-4651-8ec3-0d847cf23051',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:27:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '327',
  'apim-request-id',
  '9c72b285-dd0d-401b-9a80-779626333416',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:00 GMT'
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
  '4196b33e-bb1e-4ffa-826f-88984a633100',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Al1jGqiM9-RCkn1mfOfRRTdz_bg1AwAAAJVNdNcOAAAA; expires=Thu, 21-Jan-2021 20:28:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:28:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '261',
  'apim-request-id',
  'f29030b1-8d41-45d8-9710-beed1439f0a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '547',
  'apim-request-id',
  'df80294e-ebdb-4848-9c73-e7e3a91b014a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '295',
  'apim-request-id',
  'b1890679-10a7-4bc9-94b8-c009404e32d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '294',
  'apim-request-id',
  '242f6d13-eed8-41e9-b945-56ec89af5e6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '283',
  'apim-request-id',
  'd853e2dd-b8a1-46b9-93c8-5eac3bf18f58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '273',
  'apim-request-id',
  '686bb13f-cdb9-42b1-8c88-2c834cb056c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  '5d1253e7-a80e-4c52-aad6-68e927eade4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '301',
  'apim-request-id',
  '094bcfe5-9e45-441f-ad5b-6c02b62ddbbf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  'bfd6b19e-3d1f-4fac-87ca-dff705f20574',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '245',
  'apim-request-id',
  '20ecd31c-48bb-4a4d-9161-66fb42d73dd1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '260',
  'apim-request-id',
  '3bb0a323-87f1-4fa8-953d-dac95b4c7ba5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '298',
  'apim-request-id',
  '0e03ea90-e972-44ad-b954-5e05ca0183e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '293',
  'apim-request-id',
  '9c599bc0-9790-4553-a24c-6875a93fdde5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:30 GMT'
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
  'f5e9db1e-f4d9-43af-8762-59af8c84e200',
  'x-ms-ests-server',
  '2.1.11328.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Al1jGqiM9-RCkn1mfOfRRTdz_bg1BAAAAJVNdNcOAAAA; expires=Thu, 21-Jan-2021 20:28:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:28:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '363',
  'apim-request-id',
  '15cf92e4-21d9-4b97-9af1-26a29ae32396',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  '035d770b-bd54-4fa4-9c8b-54e1105f7d06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '295',
  'apim-request-id',
  'c6280ac6-8a10-4c06-99db-44e283ff99be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '346',
  'apim-request-id',
  'c43847b0-3771-4650-924e-101e56f02487',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '283',
  'apim-request-id',
  '028a6e49-d539-4454-baf1-095b6f47b06c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '368',
  'apim-request-id',
  'ff76d34b-24a3-452b-90d9-204d5dc002c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '268',
  'apim-request-id',
  '148e579e-f7ea-4984-a096-fc848fbbcf53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '280',
  'apim-request-id',
  '1e044db9-b104-4bbd-ac3a-a95b0f29c69f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '261',
  'apim-request-id',
  '38e96072-0cce-446d-be1d-8b072d25b13b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  'ad8ee9f7-10b9-4b58-ac67-01e093bf9024',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '241',
  'apim-request-id',
  'bdc43277-b421-4c56-9828-32daa29db70b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '309',
  'apim-request-id',
  '1b663998-640d-47df-9283-1b1def67d396',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:28:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '288',
  'apim-request-id',
  'f14b1399-c6da-46f3-8066-fa8e2347c27c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:00 GMT'
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
  'e99fc769-14ed-4510-b912-8039c2b7dd00',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al1jGqiM9-RCkn1mfOfRRTdz_bg1BQAAAJVNdNcOAAAA; expires=Thu, 21-Jan-2021 20:29:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:29:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '249',
  'apim-request-id',
  '937c58df-2e24-47cd-9576-528decaa8b36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '276',
  'apim-request-id',
  '53842743-5fda-4b62-a298-a7018336cb0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  '88584fa4-a598-4589-9049-f44998ff1077',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  'b465192e-9730-4c3b-9d33-6cb5016cefb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  '58e111af-c347-4d11-bca0-c20d6814a7d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '339',
  'apim-request-id',
  'a4fd2672-8cb3-4893-adb6-bb1a75962033',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '338',
  'apim-request-id',
  '32fe0c42-a84c-4fe4-a5cc-ed870901fce9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '355',
  'apim-request-id',
  '693d0c9f-112b-42dd-bca0-aa6cddcc9131',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f0aa003c-f165-4d0a-b7c3-9a3270cd34c8?$skip=20&$top=5"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '505',
  'apim-request-id',
  'ceb5acd0-e0eb-4d5b-82c5-294cd3ed0dfb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f0aa003c-f165-4d0a-b7c3-9a3270cd34c8?$skip=10&$top=10"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=10&$top=10"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=10&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '258',
  'apim-request-id',
  '93069033-1dcd-4887-b9da-89ecd3154bc5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f0aa003c-f165-4d0a-b7c3-9a3270cd34c8?$skip=20&$top=5"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/b72d148a-dda2-434b-82ec-4e50e5c79624?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000?$skip=20&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '316',
  'apim-request-id',
  'fa4542b0-c1f6-4f87-995a-31e1a547918c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"1db38ad9-2403-4337-9b78-e7d741701555_637441920000000000","lastUpdateDateTime":"2020-12-22T20:27:18Z","createdDateTime":"2020-12-22T20:27:07Z","expirationDateTime":"2020-12-23T20:27:07Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:27:18Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:27:18.0613501Z","results":{"inTerminalState":true,"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  '93df2c60-69fe-4300-bc2c-50d8849f6bb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:23 GMT'
]);

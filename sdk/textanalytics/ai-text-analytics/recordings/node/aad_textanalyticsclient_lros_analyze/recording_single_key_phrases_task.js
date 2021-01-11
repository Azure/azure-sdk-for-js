let nock = require('nock');

module.exports.hash = "9ef6a829a9b03661983459bf40a0ebd8";

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
  'f62288ab-ab3f-47b4-998c-98a2f72d6f00',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjaErir_6ExCrWZxwqCxCPI; expires=Fri, 29-Jan-2021 17:31:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:31:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '7952b9a0-139d-46fd-a2ef-4375aff9cad4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:11Z","createdDateTime":"2020-12-30T17:31:11Z","expirationDateTime":"2020-12-31T17:31:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:11Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '86480ed8-8242-4c6d-8069-f1d295369dd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:11Z","createdDateTime":"2020-12-30T17:31:11Z","expirationDateTime":"2020-12-31T17:31:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:11Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '56790851-72c5-4db2-be87-7116fc3bc1f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:12Z","createdDateTime":"2020-12-30T17:31:11Z","expirationDateTime":"2020-12-31T17:31:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '4ae588dc-40b8-4cb0-8ea4-6d28cb61793c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:12Z","createdDateTime":"2020-12-30T17:31:11Z","expirationDateTime":"2020-12-31T17:31:11Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '0805ef4a-f4cc-404a-b9e2-cfd8120c16bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:12Z","createdDateTime":"2020-12-30T17:31:11Z","expirationDateTime":"2020-12-31T17:31:11Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:12Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '9a08d6a8-d09f-4a96-a5e5-f0c2bb534ec0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:12Z","createdDateTime":"2020-12-30T17:31:11Z","expirationDateTime":"2020-12-31T17:31:11Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:12Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:31:12.2877551Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  '0d4a107b-8cd6-4a6d-bc93-9dc033acb9e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"125a4cc7-ffe0-4542-8f07-f895a476b2e4_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:12Z","createdDateTime":"2020-12-30T17:31:11Z","expirationDateTime":"2020-12-31T17:31:11Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:12Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:31:12.2877551Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '6a049786-a7b5-42a5-af7a-1d004c0eefee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:20 GMT'
]);

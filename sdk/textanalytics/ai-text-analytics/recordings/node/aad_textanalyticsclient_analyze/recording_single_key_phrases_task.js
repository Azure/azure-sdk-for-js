let nock = require('nock');

module.exports.hash = "22d3d179469b8cb1bb1f01a6aae2576e";

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
  'c8ea6bd7-3603-4063-b199-81bc8c754400',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Atm_-Bui3YZPvgKAWEJO549z_bg1AQAAANYBSdcOAAAA; expires=Sun, 20-Dec-2020 00:16:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:16:23 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000',
  'x-envoy-upstream-service-time',
  '623',
  'apim-request-id',
  '29c455bd-eac3-4cf7-882b-4f9688a71814',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:24Z","createdDateTime":"2020-11-20T00:16:24Z","expirationDateTime":"2020-11-21T00:16:24Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:24Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '3f9bb111-e1e2-41fc-ac78-becabab0d4e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:24Z","createdDateTime":"2020-11-20T00:16:24Z","expirationDateTime":"2020-11-21T00:16:24Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:24Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'c5898dcb-1b3e-4544-9403-d4809e7f2bd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:26Z","createdDateTime":"2020-11-20T00:16:24Z","expirationDateTime":"2020-11-21T00:16:24Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:26Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'bc89827e-884c-4d6f-850f-2e571274607e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:26Z","createdDateTime":"2020-11-20T00:16:24Z","expirationDateTime":"2020-11-21T00:16:24Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:26Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:16:26.1494969Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '9ca3e8bb-ec46-4437-8ccb-91b0ea70dc70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"af7930da-73ab-4860-985f-d2e1d59e10ec_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:26Z","createdDateTime":"2020-11-20T00:16:24Z","expirationDateTime":"2020-11-21T00:16:24Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:26Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:16:26.1494969Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '4020d39b-a329-4c2e-951e-1813f411588f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:29 GMT'
]);

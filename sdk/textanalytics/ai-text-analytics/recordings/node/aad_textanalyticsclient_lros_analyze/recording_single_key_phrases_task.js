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
  '02b29bf6-c515-4283-b426-50335c0cf300',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=As3iLJtXTE1LjXqUzKpKFwRz_bg1AQAAAKtJdNcOAAAA; expires=Thu, 21-Jan-2021 20:10:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:10:20 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000',
  'x-envoy-upstream-service-time',
  '463',
  'apim-request-id',
  'b89e00ac-097b-42e6-972e-70cdb6e6a1e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:26Z","createdDateTime":"2020-12-22T20:10:26Z","expirationDateTime":"2020-12-23T20:10:26Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:26Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'dbbc7fcd-13fc-4119-8373-ec221da41207',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:26Z","createdDateTime":"2020-12-22T20:10:26Z","expirationDateTime":"2020-12-23T20:10:26Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:26Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'dbc61a45-8bce-4be3-9e30-4c98f71faeb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:27Z","createdDateTime":"2020-12-22T20:10:26Z","expirationDateTime":"2020-12-23T20:10:26Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'eebc7d45-1e50-4927-8781-343069fd14ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:27Z","createdDateTime":"2020-12-22T20:10:26Z","expirationDateTime":"2020-12-23T20:10:26Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:27Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:10:27.560524Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  'deef2819-67b1-4368-a56f-256552a4a6d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"35ef526d-c630-4295-a20e-696a4c190eca_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:27Z","createdDateTime":"2020-12-22T20:10:26Z","expirationDateTime":"2020-12-23T20:10:26Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:27Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-22T20:10:27.560524Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  'bf72b175-77e9-4b02-95a8-8fffcd62dd2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:31 GMT'
]);

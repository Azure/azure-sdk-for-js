let nock = require('nock');

module.exports.hash = "52dd7938498b2bc2c9f2f79a07d03432";

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
  'f7b6a809-3ff0-4147-9595-1e607bf34300',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap_BUCbejfRCudjUJqADxxBz_bg1AQAAAKgDSdcOAAAA; expires=Sun, 20-Dec-2020 00:24:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:24:09 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000',
  'x-envoy-upstream-service-time',
  '577',
  'apim-request-id',
  '1aed4c66-7d25-40e5-8f15-8e62bb6647c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:10Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:10Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '3cc81844-2f7c-4062-9570-0ba7806d0518',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:10Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:10Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '561f9c3f-e6c0-4e51-8008-cf32f8ac6562',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  'd377b9cb-63f6-47c3-9a71-568cc0709c9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '9f78782b-00a6-4d82-8214-2d00437a6e74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '2b7be573-09d2-47a6-919b-5a304feca1d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '60c3fdf6-e9fd-429f-b565-26ae703aefa4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  'c84f81c6-93dd-4d93-b01b-72f5e652a3bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  'c9fe1c06-f86b-451a-a77a-4bd814452128',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '2ef5f510-6db9-4c26-bee1-99a06f6ad3c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  '1be9ed47-5979-4d9d-8e66-bf4d38a0b60f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  'bb8988c1-40d2-4ed5-acb6-5ab7a772e460',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  '73099424-3b75-4707-9bb0-f5d78251403f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '3ee26649-a46a-4486-8a1e-d55215138fb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  '63437b59-4e03-4dcb-add4-b3e7c15786bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:37 GMT'
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
  'bfbda0b0-c1d6-4129-9155-0d3d487c4200',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap_BUCbejfRCudjUJqADxxBz_bg1AgAAAKgDSdcOAAAA; expires=Sun, 20-Dec-2020 00:24:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:24:39 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  'b7eca74f-a734-4dba-a903-c0a60714a20d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '9ddf6f6d-c9e0-4ea9-8d7f-42400281b484',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  'c349dd7a-f408-4e6c-82fb-eaceb69ca50d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  '1ad33407-7d8d-455f-819d-a3e7153173ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'a3849151-2b14-4ae7-bb7f-e28cfab06613',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'dd119898-f1e3-47dd-9e22-fb1b4a87fa0b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '182023f1-aee8-4db3-99cc-70ae060e6ef5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  'a0ae15f9-72f7-4fb7-a237-8827c0929636',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'e1fefcb8-5918-4b5a-bdb6-0808779c9261',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  '52c39112-07f1-46c4-9039-596cdeb14c22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:24:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  'bf50af39-d7ff-4026-b63e-c5fed9806ec2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '7ebed2c6-7371-4316-aa8b-1089e5e6447a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'd09e9e02-1405-42d3-98e5-cbe1ac8f08ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '0c63366b-ee69-4d86-8e3f-b591fc594f01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:08 GMT'
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
  'bc94dce9-a7da-47d9-bf35-feb558126200',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ap_BUCbejfRCudjUJqADxxBz_bg1AwAAAKgDSdcOAAAA; expires=Sun, 20-Dec-2020 00:25:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:25:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '0e5a1d3f-141c-4fe5-bab3-0f87d340549e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '47d96bb6-7b2d-41eb-a98d-d112393b8c2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  '6a2b7c32-9f59-486c-9beb-b8879f8c606c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  '9e3201b3-f303-46d9-add3-92952dc333b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  '52869cf3-0293-4990-a1d6-e69e9eeba89c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"f753d3db-c0cd-4828-a662-57fd273de419_637414272000000000","lastUpdateDateTime":"2020-11-20T00:24:11Z","createdDateTime":"2020-11-20T00:24:10Z","expirationDateTime":"2020-11-21T00:24:10Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:24:11Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.71}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:24:11.551993Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '8b65ce85-361b-4512-92c6-422d72328862',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:25:19 GMT'
]);

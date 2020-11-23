let nock = require('nock');

module.exports.hash = "cc84d43691e6278eeabff8bb9162ce18";

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
  'a66fbdfb-acd4-4c85-8c20-e911d5416100',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjBat1yveLRPkPBYwjRefvdz_bg1AQAAAMEFSdcOAAAA; expires=Sun, 20-Dec-2020 00:33:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:33:05 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000',
  'x-envoy-upstream-service-time',
  '575',
  'apim-request-id',
  '9e836eef-9f6b-405e-9548-df076ce277d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:06Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:06Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '8167f82c-3435-4909-86b9-8bee7c7601bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:06Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:06Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '190c7b60-a0f3-4049-a555-56c44e8e4d00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '759bfc88-17c5-4a42-aed1-d2d770624316',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'dd9cddf4-8fc7-4093-acce-ffbed7367095',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '278',
  'apim-request-id',
  '2945daec-707e-47ca-b0ce-18addd66c945',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '212',
  'apim-request-id',
  '4fe6af78-6deb-4c10-a7d1-174b2d33798e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '259',
  'apim-request-id',
  '95f600a0-4200-4aa7-b1a0-86d6d25f9894',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '300',
  'apim-request-id',
  '6b645bf3-e0d4-42f4-ba16-6bddb786bc43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '284',
  'apim-request-id',
  'f0d606a4-1de6-4b17-83ba-0ab723707414',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '245',
  'apim-request-id',
  '8d8a2cb3-c665-4bc5-a7fa-6aeec0c41db7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '258',
  'apim-request-id',
  '2287cd58-733c-4dcf-ad73-f3d130e7b1c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'f32e01f4-8c31-4fc5-b1ca-989f6b3a2269',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '249',
  'apim-request-id',
  '87487be3-f140-404c-b338-2dcaae00fad2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '292',
  'apim-request-id',
  '15478f59-3abc-41a8-898d-d4d31a04409c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:34 GMT'
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
  '4ca811e6-22e9-446c-bd50-5b9667ad3f00',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjBat1yveLRPkPBYwjRefvdz_bg1AgAAAMEFSdcOAAAA; expires=Sun, 20-Dec-2020 00:33:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:33:36 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '293',
  'apim-request-id',
  '2f3a8bc6-e202-4c70-b6c0-99b22711632a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  'd5a2db98-504b-4f5c-b4b1-f1ee7e264651',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  '83b739f4-8ebe-42bb-9cac-b898cc7a9d6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  '3a4004e5-a3bd-4639-b371-e05403668c61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '226',
  'apim-request-id',
  '0ba67c58-183e-4136-9025-7db742e575b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  '76512af1-0df0-4cb6-98dc-6ea0924dae2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '253',
  'apim-request-id',
  '5d9c709a-5e16-49e3-980d-db683e505bd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  'ca77af90-d8c6-4aa3-b5f8-2bb15a878bac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '9706d990-41f5-4643-854d-dd7a3c2815f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '270',
  'apim-request-id',
  '6d5b0ed5-4d73-40ec-8bb1-8f4983adcb6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '240',
  'apim-request-id',
  '7df94beb-a75d-45cc-beca-27e4c9f118f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:33:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '6ec2771e-3fe6-462e-ba10-4d49d2c62e95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  '1c777c75-c26b-4e8d-912b-f465020fdcac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:04 GMT'
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
  'efd94e8a-ae6a-4dae-8c4c-819bd9f74100',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjBat1yveLRPkPBYwjRefvdz_bg1AwAAAMEFSdcOAAAA; expires=Sun, 20-Dec-2020 00:34:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:34:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '255',
  'apim-request-id',
  '743c32a7-2402-4f84-98be-fcfde7e474e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  'cb88db7a-c43e-4da6-bcad-1442a1b3fdb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  'b74004c1-441c-4f4e-ad97-c9c57bbfeeb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '267',
  'apim-request-id',
  'd6f602ce-bc1a-4ef9-9884-29a61f9a44af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  'b064918b-5d15-4ef9-9efa-6e155c074867',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  '48a9bc47-5d43-4705-9cad-b326f09194ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/944a62ff-e77b-460a-bb44-f088a4eb98fc?$skip=20&$top=5"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '399',
  'apim-request-id',
  '3450ad5b-fab0-4ab5-8df0-719b0bbef56d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/944a62ff-e77b-460a-bb44-f088a4eb98fc?$skip=10&$top=10"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=10&$top=10"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=10&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '247',
  'apim-request-id',
  '78c001ab-94d2-4569-ac97-cf4973e60772',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/944a62ff-e77b-460a-bb44-f088a4eb98fc?$skip=20&$top=5"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/091f1f03-24b7-48f0-b528-35a00f48d7d9?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000?$skip=20&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '299',
  'apim-request-id',
  '59cdff2a-ac35-44de-97a4-73e7818731d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e4c5ee1c-9920-4fce-8a80-f96ec3b4ce9b_637414272000000000","lastUpdateDateTime":"2020-11-20T00:33:08Z","createdDateTime":"2020-11-20T00:33:06Z","expirationDateTime":"2020-11-21T00:33:06Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:33:08Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-11-20T00:33:08.3485643Z","results":{"inTerminalState":true,"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'a72beb9b-3526-45ad-adb7-272364e75e00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:22 GMT'
]);

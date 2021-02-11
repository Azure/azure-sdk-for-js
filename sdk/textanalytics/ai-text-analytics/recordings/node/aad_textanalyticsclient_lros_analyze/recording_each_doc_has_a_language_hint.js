let nock = require('nock');

module.exports.hash = "3cffc4faadb68567896683f9b5bd74ed";

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
  '2a4b8e3d-049e-488b-a08f-701e73327400',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmIORk7j8K5FlUImDib8FRBz_bg1AQAAAN6yftcOAAAA; expires=Fri, 29-Jan-2021 17:41:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:41:50 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000',
  'x-envoy-upstream-service-time',
  '427',
  'apim-request-id',
  '8b8eb304-ea9e-4781-8d43-a092c0af4430',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:41:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:51Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:51Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'b8cdb3f8-e026-47c8-b8d5-8cf26c1abb93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:41:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:51Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:51Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'e381c220-1d3f-4468-a8a1-8d68731d4121',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:41:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  'cc0964ee-2a74-475e-be34-116b3c78ad54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:41:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '6a28a23d-2ad8-44a9-a0ac-930c899e3f57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:41:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  'b8773df2-80f2-4c2f-b1a5-cebd8f94628b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:41:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '41e7ab07-2934-46df-97a9-68ef2b0a0039',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '215',
  'apim-request-id',
  '6461776f-ee0a-4a08-b734-8578ae4db33b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  '1170ddb5-6647-4686-b675-7af6cc640c10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'f5b39e5e-c963-4e87-bdf6-eb6a9a8c9e2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '50eeba20-ea74-4d8b-b09d-45a8cd46177a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '4737d557-d50c-4bca-a7ad-dc87eeeaa7e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '05ca3197-686a-4ec8-b1b6-1080142f24d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  '72dfcdfc-a075-49be-badb-4e632423c056',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  '6cf58664-592f-4f43-b50e-848dc5a8acd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '06707931-a1de-4404-b65b-f999edd748d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:20 GMT'
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
  '2ec6d0d5-c849-4821-af38-afc476f76c00',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmIORk7j8K5FlUImDib8FRBz_bg1AgAAAN6yftcOAAAA; expires=Fri, 29-Jan-2021 17:42:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:42:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '57a90d91-b704-4ebe-ab52-7a069d4e4e3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '87a22042-6183-41ae-acac-4e871a1ee357',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'b51f4a02-1c1e-46f2-a14c-6655717811f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '194',
  'apim-request-id',
  'c8f48a13-b81d-4387-9616-57e1d4ec5e7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  '3c2e242d-7145-4df4-a030-ee235567f486',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '4614de4c-ee65-4018-bb5e-dcdb9f6e72f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '345642f1-01b2-41ce-a05f-6ae5775b91fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  'd3681ea5-f187-4e66-845a-c85ef298e3d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'd7edde96-16b4-48b9-9e21-049d46ce22ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '0ab8d378-8f8e-4136-bf4f-a9a756ab1bd7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  '8cd7479b-361d-462b-be1f-66e5fa65c3ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  'f143bfed-1d82-46ee-8c1f-dec43d6be096',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '4795fdef-db29-4500-91c3-ba322579e171',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'd90ac8ec-80d6-4c33-86f8-14aacda06785',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:51 GMT'
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
  '8a7e5d18-250a-40f7-956c-9057b81e7200',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmIORk7j8K5FlUImDib8FRBz_bg1AwAAAN6yftcOAAAA; expires=Fri, 29-Jan-2021 17:42:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:42:53 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  'e61bf773-7ba9-40ce-b90f-fb1c72179b8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'd9b59fc4-5400-4c03-a42c-e11f6648c3df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '6f29b2cd-188a-46bb-845e-d6405c643963',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '8bd8ee5b-069e-4c44-bc92-305312f9094f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:42:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '512324a9-bcae-4af2-a530-50ce6db73167',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":1,"failed":0,"inProgress":2,"total":3,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '186',
  'apim-request-id',
  '8202c675-df9d-49f6-8ba3-cb1bf85bdb3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '250',
  'apim-request-id',
  '025c69a0-dfcd-48b0-8a1e-27e1ef7477cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  'f15c9188-0d5f-495a-83e4-d118621d25a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  'b79d1cf7-5b34-4992-a05f-ab58fb4a1cc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  'ff46fec1-2ee5-4d7a-8261-7225c2ae262f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '919e2ada-4530-46bf-9302-0293ff0da232',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '6029b086-6d71-48fb-b302-3fb6166c41c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '240',
  'apim-request-id',
  'f5ab9279-00f6-4b21-b4e5-dcf21a46d05c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  'bc4b4a12-7ba1-4378-be02-bbb51ff04f08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:22 GMT'
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
  '3cdf5c5c-e5f3-41ba-bb57-97be06857100',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AmIORk7j8K5FlUImDib8FRBz_bg1BAAAAN6yftcOAAAA; expires=Fri, 29-Jan-2021 17:43:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:43:24 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  '92fdc158-f890-4594-8981-17a129330d35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  '07662c21-9cd7-49f7-b77b-d38722d166b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  '77b5cd24-4714-48c2-8d84-3d921b57b7ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '289',
  'apim-request-id',
  '197e2d5c-098a-48ad-a067-1c7be231e2db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '5c164f33-7632-46f0-89b7-15d37d318638',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'f6bc7201-ae36-4639-a586-65c42ce3cde7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  '3173dacf-c151-484f-9b92-361441c3b588',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  'bff712f3-d067-42ae-aa52-7f1d76cd645f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  '0163112d-c3ca-4654-8c61-d7547ff66c9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  '8fc1e322-4fbe-492b-8551-a4f928cfc4a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '193',
  'apim-request-id',
  'a41a71ea-1871-4176-a971-8f359fceaf4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  '77308ef3-7c67-4b8c-85f9-6eb1550ec7f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  '7cf23ce9-4a87-4e2d-91b6-89ed21f94f9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '2ea757ff-2fa1-42fb-86be-e96ae958e109',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:53 GMT'
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
  '2a4b8e3d-049e-488b-a08f-701e2a567400',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmIORk7j8K5FlUImDib8FRBz_bg1BAAAAN6yftcOAAAA; expires=Fri, 29-Jan-2021 17:43:56 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:43:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '255',
  'apim-request-id',
  '9d0d4832-6d69-4f90-8cd5-75e6db18820a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '27ecdf46-d60a-4d5d-899c-c4e8c62b2969',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:43:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '250',
  'apim-request-id',
  '5febde6e-1a9b-47ec-b743-d2b285d5ea48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0c31c497-5138-4a69-bd7d-f9a7adb1c33e_637448832000000000","lastUpdateDateTime":"2020-12-30T17:41:52Z","createdDateTime":"2020-12-30T17:41:51Z","expirationDateTime":"2020-12-31T17:41:51Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:41:52Z"},"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"park","category":"Location","offset":17,"length":4,"confidenceScore":0.83}],"warnings":[]},{"id":"2","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.76}],"warnings":[]},{"id":"3","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.7}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at.","id":"2","entities":[],"warnings":[]},{"redactedText":"The restaurant had really good food.","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:41:52.7570867Z","results":{"inTerminalState":true,"documents":[{"id":"1","keyPhrases":["park"],"warnings":[]},{"id":"2","keyPhrases":["hotel"],"warnings":[]},{"id":"3","keyPhrases":["restaurant","good food"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'a9d688d0-ec36-44be-bb34-279bf7e38e54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:44:00 GMT'
]);

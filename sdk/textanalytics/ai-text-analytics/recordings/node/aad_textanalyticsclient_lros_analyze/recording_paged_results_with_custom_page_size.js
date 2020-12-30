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
  '23b0b5fb-1682-4595-a256-17acfdae6900',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ai0d_AtpRWxPnS3kcSSMlxFz_bg1AQAAADW0ftcOAAAA; expires=Fri, 29-Jan-2021 17:47:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:47:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]},"analysisInput":{"documents":[{"id":"0","text":"random text","language":"en"},{"id":"1","text":"random text","language":"en"},{"id":"2","text":"random text","language":"en"},{"id":"3","text":"random text","language":"en"},{"id":"4","text":"random text","language":"en"},{"id":"5","text":"random text","language":"en"},{"id":"6","text":"random text","language":"en"},{"id":"7","text":"random text","language":"en"},{"id":"8","text":"random text","language":"en"},{"id":"9","text":"random text","language":"en"},{"id":"10","text":"random text","language":"en"},{"id":"11","text":"random text","language":"en"},{"id":"12","text":"random text","language":"en"},{"id":"13","text":"random text","language":"en"},{"id":"14","text":"random text","language":"en"},{"id":"15","text":"random text","language":"en"},{"id":"16","text":"random text","language":"en"},{"id":"17","text":"random text","language":"en"},{"id":"18","text":"random text","language":"en"},{"id":"19","text":"random text","language":"en"},{"id":"20","text":"random text","language":"en"},{"id":"21","text":"random text","language":"en"},{"id":"22","text":"random text","language":"en"},{"id":"23","text":"random text","language":"en"},{"id":"24","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000',
  'x-envoy-upstream-service-time',
  '352',
  'apim-request-id',
  '82f2af8f-fcc6-419c-a552-c108c5bd4d81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:34Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:34Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'aed92f09-8938-4d17-aaba-28bf6619b1ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:34Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:34Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '00ffa4f7-c253-427e-b305-a435241b3a13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  '692a9f36-e7e7-4f57-911c-159be953dd70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  'f46fa323-5730-4ea0-95b4-f8ddfa9bf7eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '862ff21d-b201-4a5e-a8a4-2e0930c36f82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":0,"failed":0,"inProgress":2,"total":2}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '6c2afc76-d969-48b1-bcd3-c80dbbef066b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  '131fba15-f8cf-4b6c-a587-c39c6e1440c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '280',
  'apim-request-id',
  '689c3839-8e5c-4455-9149-bf5d541e2e5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  '85f207fd-8a28-4aed-8076-f70f2b592e6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  'ae1bb9a5-ad9b-4b9c-871e-28d5412e9282',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1288',
  'apim-request-id',
  'f6d8e689-82a0-4886-ac91-7bfa206aa035',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '228',
  'apim-request-id',
  '679ef8fc-da4f-49b3-9275-7d8b683d3f82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  '0a971066-ed37-48e4-a04a-5326033a001e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:47:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  '5e5cb370-e437-4960-852f-17cbc9804f51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:01 GMT'
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
  '407564e2-05e2-4ebf-8980-a60d19006b00',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai0d_AtpRWxPnS3kcSSMlxFz_bg1AgAAADW0ftcOAAAA; expires=Fri, 29-Jan-2021 17:48:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:48:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  '2d75e66d-0224-42cb-a7c8-af780cf7cde1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '256',
  'apim-request-id',
  '53946297-f7e9-45ad-91f3-ee92c4be5a5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '241',
  'apim-request-id',
  'ccf2401b-5ec9-4aba-8e62-6e9a4e1a2cb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  '33e8af2f-9fe4-4e5c-9a72-98747aa417e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  '7572204e-e2ef-4f03-a9a2-beb83ea7bc71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  '36cdfdec-f7fd-416e-834f-3485d1aed7df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  '19ec2985-1e09-45cd-8c18-4fba1ff556a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '276',
  'apim-request-id',
  '7cb3318f-d66f-425a-93f1-3cb4c23516c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '306',
  'apim-request-id',
  '66d9ea7d-2914-4d91-909c-b3e7c7d53620',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  '9dcc8dec-d96d-41a6-80a6-a289ed4e43e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '241',
  'apim-request-id',
  '8797d41d-eb13-42c0-b198-d5b1fa52ed86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  'd44b4991-0d25-4381-aaa2-2f548cd30c72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  'de42bd7f-56a4-466e-bcbe-12a48e3c2168',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '241',
  'apim-request-id',
  'b33b60f9-01ee-412f-b047-26ca3cac82cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:34 GMT'
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
  '99456749-f90a-467e-b8d3-10e64c986b00',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ai0d_AtpRWxPnS3kcSSMlxFz_bg1AwAAADW0ftcOAAAA; expires=Fri, 29-Jan-2021 17:48:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:48:36 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  '57dc4c3c-92fb-4493-88f5-4016b3c63a72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  '739ccd21-ef69-4dea-8220-21374a6f30c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '253',
  'apim-request-id',
  'e730532d-df08-45ee-bacb-c633409e0a68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '301',
  'apim-request-id',
  'd3701bdd-6c1f-4ea4-b3eb-220561505183',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '255',
  'apim-request-id',
  '69d8b8a7-c26d-4ec6-888b-ea46613342b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":1,"failed":0,"inProgress":1,"total":2,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  'c6ed9220-e872-465a-a6be-d0faf9618bde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]},{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/eb0e3469-79ef-492f-9163-0f612afbcf7b?$skip=20&$top=5"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]},{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=20"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '398',
  'apim-request-id',
  '89df40fc-04c1-4fab-9506-e620b9b8aedd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[],"warnings":[]},{"id":"2","entities":[],"warnings":[]},{"id":"3","entities":[],"warnings":[]},{"id":"4","entities":[],"warnings":[]},{"id":"5","entities":[],"warnings":[]},{"id":"6","entities":[],"warnings":[]},{"id":"7","entities":[],"warnings":[]},{"id":"8","entities":[],"warnings":[]},{"id":"9","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/eb0e3469-79ef-492f-9163-0f612afbcf7b?$skip=10&$top=10"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"0","keyPhrases":["random text"],"warnings":[]},{"id":"1","keyPhrases":["random text"],"warnings":[]},{"id":"2","keyPhrases":["random text"],"warnings":[]},{"id":"3","keyPhrases":["random text"],"warnings":[]},{"id":"4","keyPhrases":["random text"],"warnings":[]},{"id":"5","keyPhrases":["random text"],"warnings":[]},{"id":"6","keyPhrases":["random text"],"warnings":[]},{"id":"7","keyPhrases":["random text"],"warnings":[]},{"id":"8","keyPhrases":["random text"],"warnings":[]},{"id":"9","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=10&$top=10"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=10&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '331',
  'apim-request-id',
  '054545a7-24d8-479b-ac93-b2c2b7c5fc49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"10","entities":[],"warnings":[]},{"id":"11","entities":[],"warnings":[]},{"id":"12","entities":[],"warnings":[]},{"id":"13","entities":[],"warnings":[]},{"id":"14","entities":[],"warnings":[]},{"id":"15","entities":[],"warnings":[]},{"id":"16","entities":[],"warnings":[]},{"id":"17","entities":[],"warnings":[]},{"id":"18","entities":[],"warnings":[]},{"id":"19","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/eb0e3469-79ef-492f-9163-0f612afbcf7b?$skip=20&$top=5"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"10","keyPhrases":["random text"],"warnings":[]},{"id":"11","keyPhrases":["random text"],"warnings":[]},{"id":"12","keyPhrases":["random text"],"warnings":[]},{"id":"13","keyPhrases":["random text"],"warnings":[]},{"id":"14","keyPhrases":["random text"],"warnings":[]},{"id":"15","keyPhrases":["random text"],"warnings":[]},{"id":"16","keyPhrases":["random text"],"warnings":[]},{"id":"17","keyPhrases":["random text"],"warnings":[]},{"id":"18","keyPhrases":["random text"],"warnings":[]},{"id":"19","keyPhrases":["random text"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01","@nextLink":"http://svc--textanalyticsdispatcher.text-analytics.svc.cluster.local/text/analytics/v3.1-preview.3/jobs/f865ead1-f1f5-4e9e-bd9a-45720be2de9e?$skip=20&$top=5"}}]},"@nextLink":"https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000?$skip=20&$top=10"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  '05156e08-653e-4734-b270-fcf1d3613f3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"cdf15561-2b44-4c8c-aed3-37bec4cf0ab1_637448832000000000","lastUpdateDateTime":"2020-12-30T17:47:36Z","createdDateTime":"2020-12-30T17:47:34Z","expirationDateTime":"2020-12-31T17:47:34Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:47:36Z"},"completed":2,"failed":0,"inProgress":0,"total":2,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"20","entities":[],"warnings":[]},{"id":"21","entities":[],"warnings":[]},{"id":"22","entities":[],"warnings":[]},{"id":"23","entities":[],"warnings":[]},{"id":"24","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2020-12-30T17:47:36.2911701Z","results":{"inTerminalState":true,"documents":[{"id":"20","keyPhrases":["random text"],"warnings":[]},{"id":"21","keyPhrases":["random text"],"warnings":[]},{"id":"22","keyPhrases":["random text"],"warnings":[]},{"id":"23","keyPhrases":["random text"],"warnings":[]},{"id":"24","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  '56f2017f-2999-4987-bb6b-aa92fa58aa4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:51 GMT'
]);

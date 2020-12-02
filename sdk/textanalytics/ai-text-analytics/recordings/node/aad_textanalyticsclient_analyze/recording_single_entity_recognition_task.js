let nock = require('nock');

module.exports.hash = "f056f37037cc94d5bd414e735eb72f35";

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
  'd8ec385a-6a8a-480e-84e5-8a7659256500',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al9GHyheEZFFllv9WhrHzylz_bg1AQAAAFUBSdcOAAAA; expires=Sun, 20-Dec-2020 00:14:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:14:13 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000',
  'x-envoy-upstream-service-time',
  '875',
  'apim-request-id',
  '6a8e767c-a1d8-422f-905e-4273c561c896',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:14Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:14Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '397',
  'apim-request-id',
  'c013ecdb-8963-460a-9e8f-2217e105a56e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  'a7dfc112-ce42-4b20-ab03-f371511e47cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '321',
  'apim-request-id',
  '27ab0ba2-1bc7-42d0-9d50-7adbe7a3348f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  'c9615c01-e938-4fac-aabd-383187d2a52f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '424a5bc5-9dac-4896-bb26-0827b0bd63f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'db661e70-4782-4411-89d1-8d3de00b4550',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '456aab64-52ad-413d-8497-5f2f8384841d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'a03a8734-24a6-4154-abc1-9cb5c5c56135',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '1e7dfeaf-4ec4-4395-9d93-b31a94f96eb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'dca48c37-f126-4b8c-80d4-95b08379e212',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '2e065621-9f54-4350-9e2c-2418368ecef2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '31f4e6de-166e-460d-a993-15e29c10bdb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '2d348839-d63b-42b2-a8f3-e91b2099a4e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'c2a4d5ac-fb34-4477-9e41-9f50aedf2165',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'd512f284-72ea-4d96-abbe-ab66a657b397',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:44 GMT'
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
  '4ebc7952-2962-4d46-9e37-d87aceb04400',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Al9GHyheEZFFllv9WhrHzylz_bg1AgAAAFUBSdcOAAAA; expires=Sun, 20-Dec-2020 00:14:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:14:44 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'e157f2b5-a9c1-4901-9946-a52afb9e8bc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'e1102f1f-7e0e-4620-a202-4f7d6db2d30e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'd0ecaa44-b40d-465e-80a5-a76057a3a863',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'b09bb04d-4475-4456-bff1-a63951e9589b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '2a1a4fde-a776-438a-85c7-aff0070e80c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '5cfb41ce-92a2-4596-9bd6-6fa730781c0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '478bc3b5-4ce2-4453-b378-1a372f2e5988',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:14:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '11e13623-ae97-4033-9ddd-fd70b1724546',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'd99effe3-70b2-4af6-8b46-41097edecdfb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'd5f5e429-5798-45fa-9d41-405ac9becd6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  'e4e0c705-9d1a-479b-a336-997fcf299ecc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '421d6d75-a9ff-4eb6-8e7c-aeac68516d06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'bef683cf-f31e-462e-8177-42e9cde39751',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'f775d926-a88b-4555-9146-391a823d83d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:14 GMT'
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
  '009fc1b3-e02b-49ff-96a4-9eb946984100',
  'x-ms-ests-server',
  '2.1.11251.18 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Al9GHyheEZFFllv9WhrHzylz_bg1AwAAAFUBSdcOAAAA; expires=Sun, 20-Dec-2020 00:15:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:15:16 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '25e358ff-f4ba-452c-a220-e061351bdbb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '765d20e9-0377-44e5-b6b8-9c1e395d33d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'b9543034-bb41-49ee-8780-736598263888',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'b51dd2d9-a5a2-4644-aaa4-035121fd8a0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '6a27328d-9200-47ea-aa0a-7750aca7422e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '6423ecde-8c74-46c2-a335-489caa52dd84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '957674a9-b8ef-41f2-a79f-d131c66c7d8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '68404400-6591-4027-9352-92dea375f55f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '39579bbd-0d28-4298-993d-d1239a837c0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '67329420-8879-4dfd-83cd-f98a30549ff2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '036003d7-04aa-4278-82aa-1f64f1b2ed33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '391c2e04-d777-428d-8aa5-3948cf8488e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '97b9dd73-e0a7-413c-902e-d7cb3ce15d07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'bfd6d7de-65cc-402a-a660-39cb4f50a1c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'ab3014ec-4078-49a7-81cd-4ae6e05f71f0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'fa44fc6f-702c-4cdb-8da0-d391dfce6407',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:48 GMT'
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
  '68aa76d7-9f36-46b4-ac95-286d33076700',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al9GHyheEZFFllv9WhrHzylz_bg1BAAAAFUBSdcOAAAA; expires=Sun, 20-Dec-2020 00:15:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:15:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '247bc0e4-51ab-4f15-ab66-ac40498f284c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '35a1960c-6b83-420c-9f96-fc4650c7ad9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'ee436fd3-7248-4939-9598-6caad58d3f29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '0bd316f3-d3f0-41ad-84af-c925c9b0692c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  'cb7c7cb7-2ddc-428e-a1db-888f1b29ea96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:15:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '9eafafd1-2789-45eb-a15f-9b66cbf48496',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '12d7f1c2-b6bc-401e-b9c9-6091ffb0869e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '4df16828-cb6f-4cfa-899d-692328085ce8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'c116e8e6-adee-4435-b2a0-4a346c9ab614',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '92934e3a-483d-4057-984d-fb6a7c5b6213',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'b266b330-1123-49df-842f-e6f68ccecce3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'f1fc878d-c500-4314-9f2f-3b5757433ae6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'cadeff68-c331-4ccc-a454-9f3e7fd12ab7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '5ccf33bc-d0c9-4d73-bed1-f6a91ed8c0b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:18 GMT'
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
  '4ebc7952-2962-4d46-9e37-d87a29c54400',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Al9GHyheEZFFllv9WhrHzylz_bg1BAAAAFUBSdcOAAAA; expires=Sun, 20-Dec-2020 00:16:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:16:20 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '06293e7e-bba3-4c7e-ac08-10ec12ab9fd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:14:16.3782881Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.86},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.82},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '61b00e84-09dd-4c74-8bf6-105974c0e75a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"a538cc52-c9e2-42bc-9606-2ce03d4d7299_637414272000000000","lastUpdateDateTime":"2020-11-20T00:14:16Z","createdDateTime":"2020-11-20T00:14:14Z","expirationDateTime":"2020-11-21T00:14:14Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:14:16Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:14:16.3782881Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.86},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.82},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '302',
  'apim-request-id',
  '0bea68a8-c72d-4f85-80ca-99e81305fc93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:23 GMT'
]);

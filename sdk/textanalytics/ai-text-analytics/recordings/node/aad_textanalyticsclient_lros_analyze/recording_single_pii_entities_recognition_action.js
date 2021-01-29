let nock = require('nock');

module.exports.hash = "ebdc6fc366816bcb9ac9d4c8c3a3385c";

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
  'eac3c9fd-0f1d-47bc-b3d8-f356a2866c00',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Asq8BzX_scNKhomUHBmrDuxz_bg1AQAAALSwftcOAAAA; expires=Fri, 29-Jan-2021 17:32:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:32:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000',
  'x-envoy-upstream-service-time',
  '470',
  'apim-request-id',
  '638017af-7a1f-4b06-91ab-2145669b3347',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:36Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:36Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '5b00529a-cbac-4090-8da4-d00188c0ac75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:36Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:36Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '5afc8078-5da9-4897-b4f2-faaeeb91b781',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'bf8c66d8-aad1-4988-be59-0f288afc8351',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '1d7997c6-3f6a-4156-beb7-ac4de9b68902',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '8781eb8b-b4dc-46c5-98e0-589f0cce4102',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '0cf02a23-d490-4033-a0c1-6c6fd83d8907',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'eca73d02-76a1-42f8-9b82-8d92750b4e86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'e0795d6c-b055-4935-b7c2-eb2f362460db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '465a2654-2704-4282-bf97-c11160d1aaeb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'ddee3d7c-1403-4184-8c9e-9a4faea28d29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'b96f1d8c-58eb-4b1e-bb32-b717fc2a637d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '18081f29-7ca3-4701-b9b4-2dec19b74e83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '85d732b8-3570-425a-9e4f-d55797a83abd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '40e3ae07-5a26-42d3-9412-162808f32a3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '163b2f27-1015-488c-aa92-6c89025d1546',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '2a27cf34-4f67-4bf3-8559-55fb68c83c72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:06 GMT'
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
  '30c5e439-9ab2-49cf-b879-f6c4dae27800',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Asq8BzX_scNKhomUHBmrDuxz_bg1AgAAALSwftcOAAAA; expires=Fri, 29-Jan-2021 17:33:07 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:33:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'fe20c376-fc47-4705-a305-703479289a72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '49e2e9a6-d40b-4432-8bbd-c32df50803cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '131cf76e-c3b1-43eb-9238-c6de8192f851',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'b4862ba4-dabc-478d-88cc-be9b55a33da6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'f07c511e-25cb-4c83-b85b-5b83e35b1e9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  'd87d3649-4db6-485f-84c8-51b91b44cfcc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'd2ce519c-4bf4-4648-aeef-3b9f186f8cea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '9d70afa9-1fc7-49b3-a9fd-2ccf46dde748',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '3fed4eb3-7617-4601-aa21-8fd92fefda07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '22f5acba-2749-4d8c-91ce-c4ca78b68a58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'b9b2d015-1b66-4eeb-a527-4b6ece25a465',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '3805beac-2f67-4dc6-8aae-54629a387efd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '47d908b5-e37e-4a1e-84f8-a4985f9f86a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  'e39f06ae-1037-437a-a653-6b5ad0113e8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'c27401cc-f26b-4379-a86b-5e1c4294f37b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:38 GMT'
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
  '1d06e70d-c32b-462a-a8b4-d51a2e7d7000',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Asq8BzX_scNKhomUHBmrDuxz_bg1AwAAALSwftcOAAAA; expires=Fri, 29-Jan-2021 17:33:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:33:39 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '0a651fee-8002-4d15-8703-f0b2b2466fb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '80c31e0d-b785-4925-9232-689d4b2e38fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:32:38.5081424Z","results":{"inTerminalState":true,"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"Phone Number","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABA Routing Number","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"New Zealand Social Welfare Number","offset":18,"length":9,"confidenceScore":0.65},{"text":"111000025","category":"Portugal Tax Identification Number","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is ************** your Brazilian CPF number?","id":"3","entities":[{"text":"998.214.865-68","category":"Brazil CPF Number","offset":3,"length":14,"confidenceScore":0.85}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  '65488693-26b1-4f0e-9ec9-967d8585722a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3d4e865c-a061-452f-a8de-d74f0a6d9915_637448832000000000","lastUpdateDateTime":"2020-12-30T17:32:38Z","createdDateTime":"2020-12-30T17:32:36Z","expirationDateTime":"2020-12-31T17:32:36Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:32:38Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:32:38.5081424Z","results":{"inTerminalState":true,"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"Phone Number","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABA Routing Number","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"New Zealand Social Welfare Number","offset":18,"length":9,"confidenceScore":0.65},{"text":"111000025","category":"Portugal Tax Identification Number","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is ************** your Brazilian CPF number?","id":"3","entities":[{"text":"998.214.865-68","category":"Brazil CPF Number","offset":3,"length":14,"confidenceScore":0.85}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '9103dad1-a576-40c0-85c5-57173a7da1ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:33:45 GMT'
]);

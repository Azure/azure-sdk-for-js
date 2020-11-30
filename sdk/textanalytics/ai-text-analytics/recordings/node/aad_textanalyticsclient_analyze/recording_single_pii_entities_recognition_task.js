let nock = require('nock');

module.exports.hash = "5f44332c5d3778376527c4cefb28067b";

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
  'b210e232-377e-4a34-af1b-7abd97f54500',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlyOgcbgxHhAlejk_dw6Ztlz_bg1AQAAAF4CSdcOAAAA; expires=Sun, 20-Dec-2020 00:18:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:18:38 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000',
  'x-envoy-upstream-service-time',
  '402',
  'apim-request-id',
  'a8cd5ca5-8a45-4b72-b58a-393417b53805',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:39Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:39Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '6a4f8a84-a818-45df-ad96-563f548e501a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:39Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:39Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'ff0facfa-876e-4178-a8cb-a4b67e3a0d07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'bdd445f0-26f8-4c72-a45a-ef2c55de7d3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '47ea5619-fa8d-465b-be59-73c2e1ba8000',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'e6e9a861-8c71-4bcc-aa9a-243b72cfdefc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '868dc91c-f313-4918-a242-77892cfb1290',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '2862b93e-acbc-42c4-bee6-7e4bd98a239d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '1425346c-24cb-4782-aee4-9c7a419caa6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '62df6ff7-4ff3-45a9-9b78-5efdcca20b7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '07930244-e946-4783-948e-88ce6a3bf125',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'efee0adb-3af5-4760-ac8a-e1b7eb5f091c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'aeb497ce-d08c-42cc-a240-ec686067d335',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'fb43fd00-2663-40f9-b12d-cda41be5254f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '0f828e90-62e3-488e-a358-83907966456b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'cb4b04ad-50b2-40a1-bb51-9282f966f2e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '00fee2fd-0ff3-4c41-8d34-d5509495da54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:09 GMT'
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
  '19ceb38a-ec45-4989-a24e-8636138f4300',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlyOgcbgxHhAlejk_dw6Ztlz_bg1AgAAAF4CSdcOAAAA; expires=Sun, 20-Dec-2020 00:19:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:19:08 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'b1a82244-f686-4162-b997-4eaee5454edb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '986e90e9-1af3-4ac8-a4be-2e91984544a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '77906dea-c275-4250-b87e-9bd1a370dc9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '0a406826-9b40-43f2-aa30-9676dca86f11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '4c0e762d-72bb-4eb9-8c43-63dd64f5ab1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '8b1bbb62-35af-4cca-8966-b9a4c0ccfb48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'cf58c3ed-da8a-4bb9-9fe8-f5227d651022',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'e41767b7-9445-4303-931d-ae81db20e85d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'f34580e5-2548-4c1c-a0d6-f3243e8b3249',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '9a24dea1-1315-4274-9bd6-f68c4e7af6e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '68f05762-7372-42a9-ba12-27a6d657ed6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '51b04537-e2b8-4d32-b377-3429b038be45',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '1945e313-885a-40a9-b852-446d4ac08f5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '7959959a-27cd-44d0-bca8-4cafea6b9320',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '6c342344-2e39-49e0-b67c-4e999a1181bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:40 GMT'
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
  'bc94dce9-a7da-47d9-bf35-feb547d96100',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AlyOgcbgxHhAlejk_dw6Ztlz_bg1AgAAAF4CSdcOAAAA; expires=Sun, 20-Dec-2020 00:19:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:19:41 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'b69e30e9-f4f3-4a8c-88ae-424c6f036c86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '0b90f471-1fda-4fec-9bb6-1b4b524aad3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '2fe99d78-5128-4abc-ae26-f30a3ad4d815',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'a90853c7-238a-498b-9240-3140049a2213',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '1e1bc4eb-a004-4c1c-99f2-06a225ea955a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'b9c38b9b-bb2e-4e88-b814-29f8c0ad7d8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'cb6a05de-cc1a-4178-a697-56754a6e2aef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '2436822f-ecc6-4dc3-a574-bcbd701ba7c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '8c966e37-74e4-4bcb-8ea5-13ccc721878d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:19:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'ce46ef80-0444-4925-a258-7845dd1a6cb6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '0701c1c2-69a9-4d76-95e8-1952666c03d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'cf219ffd-d787-4a5e-9999-bec8ee81b840',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '8fc820d3-7745-443d-8f36-d13601c92254',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '607b1917-b322-44a3-9b1e-d0176dfb6df7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:10 GMT'
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
  '19ceb38a-ec45-4989-a24e-8636449a4300',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlyOgcbgxHhAlejk_dw6Ztlz_bg1AgAAAF4CSdcOAAAA; expires=Sun, 20-Dec-2020 00:20:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:20:12 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'e6fd736d-a6a1-4169-84ec-5b5f0b7fabec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'defb027e-d088-4e29-86dc-8f8719b95988',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '1b7cb74e-6199-43d4-922a-21a8375c77e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '9d98fdb6-3c3d-4aa7-acf8-02b234e1f9ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'e4217f60-4190-4266-9655-f66cd2b64c2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '230b526d-9546-4501-98a0-f8b7f92f0259',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '4cf94816-afca-42bc-90eb-28d06e0161d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'e43d3c1a-5b64-4033-9833-2b6d60ed111b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'fb7832fa-cd12-40b3-8390-9ea022f95be5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'efb9b459-df1e-4b3d-96fc-d918da0b67d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '2aa2aad0-fe6c-4543-a25b-bf6af25dae6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '2db243b2-2dd8-4e12-a0ca-d05545f3b73e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'e4e7b1a5-702f-49f8-a1b8-28a1206d5140',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'b250c15d-6f76-4cb2-98d6-4397a12b9f2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '31d5ab12-609e-4840-afe4-fb2f32e98713',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:42 GMT'
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
  'bc94dce9-a7da-47d9-bf35-feb57be46100',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AlyOgcbgxHhAlejk_dw6Ztlz_bg1AgAAAF4CSdcOAAAA; expires=Sun, 20-Dec-2020 00:20:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:20:44 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:18:40.1382225Z","results":{"inTerminalState":true,"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"Phone Number","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABA Routing Number","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"New Zealand Social Welfare Number","offset":18,"length":9,"confidenceScore":0.65},{"text":"111000025","category":"Portugal Tax Identification Number","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is ************** your Brazilian CPF number?","id":"3","entities":[{"text":"998.214.865-68","category":"Brazil CPF Number","offset":3,"length":14,"confidenceScore":0.85}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '321',
  'apim-request-id',
  '736a2b36-468e-4895-b90d-086c098ef471',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"2194245b-0ef4-42aa-9bad-6d5a9687601c_637414272000000000","lastUpdateDateTime":"2020-11-20T00:18:40Z","createdDateTime":"2020-11-20T00:18:39Z","expirationDateTime":"2020-11-21T00:18:39Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:18:40Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:18:40.1382225Z","results":{"inTerminalState":true,"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"Phone Number","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABA Routing Number","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"New Zealand Social Welfare Number","offset":18,"length":9,"confidenceScore":0.65},{"text":"111000025","category":"Portugal Tax Identification Number","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is ************** your Brazilian CPF number?","id":"3","entities":[{"text":"998.214.865-68","category":"Brazil CPF Number","offset":3,"length":14,"confidenceScore":0.85}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  'acbf90bf-dbdc-4815-9169-96e1bbf167b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:20:44 GMT'
]);

let nock = require('nock');

module.exports.hash = "8bb19a4413197fec2a66cb77e7d806b0";

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
  'ca88d22c-33dc-4359-bd4b-aaf7a51a0a00',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AultslI-C3lMtl-RlVmE0FVz_bg1AQAAAA4GSdcOAAAA; expires=Sun, 20-Dec-2020 00:34:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:34:23 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '5bcbd716-3f48-4c8e-87a4-a2e242f225c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:23Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:23Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '64393ae4-3dee-4a14-b567-849a1aad5bea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'c4604b67-6851-4257-9084-5867b8245a0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'f73fcee2-8e50-4132-a470-a735b4acbb6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'cff59187-a0e2-40a5-aaad-5d4955b1d4b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'bb0bec83-a93c-4912-8452-c39edd894f97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  'd8e6ac97-4963-4f7d-97e4-edd5c8819eb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '1fdf70be-68c9-4ddd-b0ed-83b6f3f2d0c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'ad64fce7-fa25-4aac-b70a-59a2c50d4a79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '8f07665f-3edd-439c-ae34-8fd445244c1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '0b7ae953-7a00-4101-ae54-c3c87ad85211',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '69936cdc-6fdd-4f54-a860-1a7fe8f98f90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '969f19eb-39b0-4c2c-a8b4-399ca7e57e4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'f2643611-a202-43c1-8949-54e1ac776cad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '74cf551d-8545-48a7-abe6-6a1e9d435c60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '7c2ff8f3-4e04-4048-ab7f-ab5e157d2a1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'c779935e-dea3-4ff6-b4b1-4687b5c155eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:53 GMT'
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
  '50e0d5f3-5392-42e0-b414-5c35cf904900',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AultslI-C3lMtl-RlVmE0FVz_bg1AgAAAA4GSdcOAAAA; expires=Sun, 20-Dec-2020 00:34:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:34:53 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '49d41c04-9594-4b00-9caf-c50a751c27dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '74c280ef-d0ea-444b-9f39-716160b69d5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '372d389d-3a8b-4943-8589-9cc22cc3515c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:34:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '6672f177-be2b-4035-a81e-8a3e9431c8b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '05c316d1-36d7-4085-88a7-672d22f818ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'fa4fff2e-8bf1-42bb-a3c5-ccbbca6f495c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '410452a0-2129-46eb-bd32-b9e0f016921b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '5c216794-d0fe-40a2-8f6b-e5788c665791',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'c7a55ee6-bb85-4541-ad28-e5f0d5965a6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'cb188f22-b1b3-48f9-b852-4f604a84084e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '0978fa20-4408-48f6-8fe1-273e89684573',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '8fef3c0f-b92e-461a-bdc7-a41f7b34abdc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '6581c707-349b-45c0-8623-d1aab5dbef9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '1f9e5553-ead1-4641-9e9b-d1ea78f81b21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:23 GMT'
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
  '13fde3c8-8cf7-47d1-ac35-d9ac83fa4800',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AultslI-C3lMtl-RlVmE0FVz_bg1AwAAAA4GSdcOAAAA; expires=Sun, 20-Dec-2020 00:35:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:35:25 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'e6661858-ddc6-4023-8694-abf0c65515a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '9287b167-ee71-4287-a266-480dd78f036f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'd9bb4e42-305c-4fb6-9ac1-543c6c4c6d35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:34:24.0934569Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'fbc34a21-cc18-41df-b4da-0aa01cb2cebc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"6d8627f6-b80b-46ee-aee8-b519e65b4aa9_637414272000000000","lastUpdateDateTime":"2020-11-20T00:34:24Z","createdDateTime":"2020-11-20T00:34:23Z","expirationDateTime":"2020-11-21T00:34:23Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:34:24Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-11-20T00:34:24.0934569Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'd68ad582-5ab7-4769-beb3-ff131e22c52f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:35:31 GMT'
]);

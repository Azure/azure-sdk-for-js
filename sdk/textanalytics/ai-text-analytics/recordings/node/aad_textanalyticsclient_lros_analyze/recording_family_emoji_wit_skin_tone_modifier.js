let nock = require('nock');

module.exports.hash = "f0529baaeb87157a12d30d3fbc356e62";

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
  '08b8f25f-0efb-4b3a-b5e2-e2079df37900',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Amo3_mCtlYdImF-4tat3zttz_bg1AQAAAPHwftcOAAAA; expires=Fri, 29-Jan-2021 22:06:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 22:06:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"displayName":"testJob","tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]},"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000',
  'x-envoy-upstream-service-time',
  '874',
  'apim-request-id',
  'cd09609b-f00c-4dc0-845e-81d3c280589e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:06:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:47Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"notStarted","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:47Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  '2cd11849-8e1e-45f3-b924-074f0ee6ea7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:06:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:47Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"notStarted","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:47Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '193aeae8-c357-479f-9f0a-07f186e73e4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:06:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '9e1606f6-032c-47ee-9854-2a58bd6c9b38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:06:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '481',
  'apim-request-id',
  'ece5ebf4-98eb-41df-ab09-dbb989942992',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:06:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '402',
  'apim-request-id',
  '0abc4ed3-7de8-40ec-8789-ee079c710d19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:06:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '362',
  'apim-request-id',
  'ccf844d5-be8a-40cf-9903-5345b73d1c5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:06:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '87dd452a-aa42-4ae0-aeee-c7f6362fa08b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '7c5dff18-c285-467a-8753-3e68e873ba9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '21505909-5c7e-43a3-aa25-0b06c4012a09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '7f5e305f-ea31-4ecd-8909-52a4b0d4323d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '9dc4f58e-9e23-4df4-8be8-9ff3450b3fff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '95fc8d16-d9e7-4233-8eee-819f3bbd20eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'd004dfcd-f7f5-4c6a-9bd3-92ecc76e7434',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:13 GMT'
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
  '3840045d-368f-4256-bf4b-798b8c738100',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Amo3_mCtlYdImF-4tat3zttz_bg1AgAAAPHwftcOAAAA; expires=Fri, 29-Jan-2021 22:07:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 22:07:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '305',
  'apim-request-id',
  '4acf1f6d-18af-4d65-9ade-309a8d36f1a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'cc2e5d33-b983-451a-9352-657e1ff5316c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '62dcb340-983c-4541-9ee7-a67909fdb4f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'd9f1b1f6-c7a7-40ce-a1d2-9356483c0616',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '899a4b0d-b328-4588-b04a-428597ecbc73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'b858d7e4-f00f-4e78-a847-9682e9f820d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '6927a21a-4b51-4142-bc0e-e6c2a4c5f407',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'bca61708-9ec9-4354-a62c-1d884bbb0e03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '88034f1d-2dd5-4258-9b86-255807cdf18d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '25cebd15-579f-4b39-98cf-4a10a490b912',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '731de990-3cb5-4753-9773-8140eb8288fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'ea49f2af-8461-4a06-91fd-d304d0adcf41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'f4e58718-6793-4fec-9430-9ee662368743',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '0202b3b9-ab4d-4f6a-b4f9-a40e3e2bec53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '0077398c-09da-4aa2-850b-6df0a4bcfade',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:44 GMT'
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
  '1d06e70d-c32b-462a-a8b4-d51a2cbd8100',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Amo3_mCtlYdImF-4tat3zttz_bg1AwAAAPHwftcOAAAA; expires=Fri, 29-Jan-2021 22:07:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 22:07:44 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'db7c4a28-8f82-4735-8e2b-64e1f204e87e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'ee9b9ebe-81e1-4c88-8014-4294a9a7e638',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '43eeb5f6-0450-4ac1-8f42-5a4f9766b203',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'cc559416-222f-4324-a3f9-9f96d106d9d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '2b7d3cdb-a05d-4109-abef-ecab57119c30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '0c8ac7d3-705e-4d42-b478-5d55af658c24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:07:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '31d9d92c-5aca-4915-b63c-1922245b19db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '72793dd9-67b5-4db1-ae83-9640f8dc7540',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '784268a9-a2d3-481f-bb80-fd444d143363',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '6f6d5948-69b4-48dd-b85f-a65bbd8d3464',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '1cd12812-171d-4707-a654-6af4704c1c42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '5e71c00a-20d3-4d13-96ec-2a410709fbcc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'bfd33060-67ff-4b32-8d00-cdd92a9851a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '7e180bf2-0a16-432d-9b21-dc4b1bfbcba8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'bc0a98e9-8b0b-4d90-967f-164d3132e7b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:16 GMT'
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
  '74e3fb8d-0019-4a73-bda6-4bcd43dc8900',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Amo3_mCtlYdImF-4tat3zttz_bg1BAAAAPHwftcOAAAA; expires=Fri, 29-Jan-2021 22:08:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 22:08:16 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '17afeb74-5911-4089-a9af-1080cee87ec6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '1b54cfed-7678-4f07-8a69-7b9b7acfae3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '7f6b5422-fa08-4a65-ae03-68ff66ff74ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  'a48424f0-6cd4-402d-94b6-2f783bdfe7b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '672dc677-e51c-41e4-bb32-405045b427be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '58390fa2-ebe4-4138-aab1-25c96ee20822',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '8b000f10-6f0a-4e26-af82-855e20c6f346',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'f782e845-4d7e-4b02-b47b-2ac0666eff06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  'a7520e79-0900-499d-9c7c-01b88ef4b29a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '50d618fe-8665-44d4-82db-d177a44db261',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '780825d9-06c6-4fd0-af53-b30642af49c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '928d17d5-5980-43e3-9254-97f7474dfcb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '0e7a7798-0144-4134-809a-784b532fc98a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '0ea543cb-2fcc-4d61-bd4b-fa9883673e90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '5bead42e-7668-4505-9d42-3c840ff8548e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:48 GMT'
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
  '18817caf-7482-4aee-83cb-bd53b9648100',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Amo3_mCtlYdImF-4tat3zttz_bg1BQAAAPHwftcOAAAA; expires=Fri, 29-Jan-2021 22:08:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 22:08:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '7651a7ae-db16-4874-bac8-314cbd187397',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '9941e621-6e13-42a8-be4d-b28e11772264',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '43825f11-6f27-4556-8410-d8bcbe9b2937',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"succeeded","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49.7272319Z","results":{"inTerminalState":true,"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '283',
  'apim-request-id',
  'a34b5ee0-6848-4409-8526-1041c6c97e18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"ae687f50-442e-45e5-97fe-4b4fdd78a4af_637448832000000000","lastUpdateDateTime":"2020-12-30T22:06:49Z","createdDateTime":"2020-12-30T22:06:47Z","expirationDateTime":"2020-12-31T22:06:47Z","status":"succeeded","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"name":"testJob","lastUpdateDateTime":"2020-12-30T22:06:49.7272319Z","results":{"inTerminalState":true,"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'db6564e3-b272-4574-ae7a-21082b26f834',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 22:08:56 GMT'
]);

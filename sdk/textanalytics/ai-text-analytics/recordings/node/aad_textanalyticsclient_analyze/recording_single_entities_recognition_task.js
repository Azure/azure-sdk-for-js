let nock = require('nock');

module.exports.hash = "51539be1e9ebda200cad160a900c070b";

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
  '6528966b-f943-4146-8aa8-302130ce6400',
  'x-ms-ests-server',
  '2.1.11251.18 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvvGSDhelsVLo7hbwSu88NQ; expires=Sun, 20-Dec-2020 00:16:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:16:29 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.","language":"es"},{"id":"3","text":"Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.","language":"de"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  'bc5ea838-f8c3-4f2b-a8a3-5eafe61145ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:30Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:30Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '020f9085-f29a-4685-a551-47abd1de569c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:30Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:30Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '5813bc32-765f-46aa-bd46-2d8749496ccc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'd843af22-e878-4020-b677-7e043ce8467f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'b7b2c346-314c-4ac1-a357-eeef9b14ef2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '1753905c-084e-43c5-b12c-3701cec30808',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '0f22ab51-72e0-44e4-8f59-1de8f22f04f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '5d4f16fa-f39b-4e4c-b51a-e40f071e1b2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '78cb4dd5-d362-4936-ae39-08b149bbfbe5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '2e7b52bc-0dde-48f0-908e-4f8650f40d0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '19dc427d-3207-4ec7-8f00-041372aa4f6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '255ccc18-2461-4686-89f3-bc973cdce6bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'd83ce9b1-e695-41cb-970f-cbed18317bbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '3690b3f2-497a-4344-b1e5-11f1b794cc6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  'e3fa6f94-ac3f-41f2-a1e0-c4d4a627d5ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '87555b06-a91e-4fed-84b2-ac4516c42b30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:57 GMT'
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
  '9756d7e9-119d-46e0-8d4d-54bc4f5f4500',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvvGSDhelsVLo7hbwSu88NRz_bg1AQAAAPwBSdcOAAAA; expires=Sun, 20-Dec-2020 00:17:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:16:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '4fe87764-e7ff-4554-8b40-3f8204b1a84f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:16:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'ec476dc7-9edf-40b8-80eb-044e2fd54340',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '7d455b9d-d137-406d-9b25-95fc239111b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '080048c3-3895-4b6d-bee8-683407c378ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'f0a058a6-7295-40ec-b5a5-7eed3942e51a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '5ab9d961-9671-414c-9173-751f8fc05223',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '9d79e832-cd45-403d-ac95-71aaf2bd517c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'db2ac58a-2f43-4944-b71f-41c872e70d59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'dcf905b9-32a3-4667-b35b-19d54ac31ff4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '0f4ee986-3820-4d15-bdf0-64fcbd25c6e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'fd56fb0a-2dc0-4b37-bdca-2a38750cb2d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '40f3d101-bdbb-406b-b27c-58da9ea69bab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'bc169a6f-0e00-494c-bc73-25f2354b8609',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'a183e62c-1c44-44c1-9dd0-1a66cc841a77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '776e2ea8-d3ad-4a9b-822f-9c01e63e5dd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'b4a19e35-cb77-46ac-b757-de8729996c33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:31 GMT'
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
  '50905381-9c65-4cf0-aced-29d0d0ca4500',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvvGSDhelsVLo7hbwSu88NRz_bg1AgAAAPwBSdcOAAAA; expires=Sun, 20-Dec-2020 00:17:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:17:31 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'c81f1d76-8601-4bfe-ac85-9ac51a1c34cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'ac0f313a-1400-4a68-b994-a5aa04dd4ef0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'f714b31d-2ebb-4bde-845c-0b6c0762ddb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '16b62349-ed13-4ccb-9092-0b2e2b6c7ed8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '5a0cb82d-8fca-437f-9700-dac6563a6832',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'd07c1361-9423-4536-ad9e-6cecad2be21a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '060ab33b-74a6-40dc-87d9-4e09ee96bd5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '85eabce3-b1c9-46b9-80fc-26204caeda49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '6ce2d6d1-7c1b-45a7-97c5-c8c21aa2abe8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'b322d5fa-9202-43ed-a976-f8856be17476',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '1b1df55d-a17d-4a0c-9627-0bcc03193e69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '8c9c5dcd-919f-4792-b5b5-7fa31562248b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '80052a77-3817-4f6b-9dbf-d8803897f183',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:17:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'd3debec3-fdeb-46a1-9581-66c62e56cc70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:01 GMT'
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
  '50905381-9c65-4cf0-aced-29d0c1d04500',
  'x-ms-ests-server',
  '2.1.11251.18 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvvGSDhelsVLo7hbwSu88NRz_bg1AgAAAPwBSdcOAAAA; expires=Sun, 20-Dec-2020 00:18:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:18:02 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '9a142c1d-c6f4-42ac-83a0-09de1cc28c8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '5e2fa8cd-acf3-4c06-9d94-fdf4b3e9e333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '1d4f7f62-ca71-4fb3-84a2-bb877dae9d47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '959e7af9-f62a-4fad-990b-a2e5b41f91eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'bc36fffc-3823-4b80-8fd7-221621a8bf5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '011c60f5-dba3-4887-bed1-beb126dc8dcf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '96342966-46f9-4356-9f5d-2f9c66b22de4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'f2c26e1a-9e70-4ebc-83b3-7ec4ac235c34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'e8081f8e-d80a-4f2f-96ae-61d9250b68d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'c698abf5-e85e-4cd6-b9d8-206573021fe0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '4546c641-bacf-45bd-8ff9-9ad400a4efd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'de3693ef-603d-4083-ac36-ecd86f69b8d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '7b519236-f5ad-48cc-af37-8fa04c0680a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'fd470e6f-87be-4491-ad2a-423b1519a641',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '365c55a6-12a2-42c5-add2-2d19f8903e8c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'e73dc749-9314-4a37-8592-3de25607be21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:34 GMT'
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
  '9944a65e-315d-42cd-ac73-66141ade4300',
  'x-ms-ests-server',
  '2.1.11251.18 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvvGSDhelsVLo7hbwSu88NRz_bg1AwAAAPwBSdcOAAAA; expires=Sun, 20-Dec-2020 00:18:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 20 Nov 2020 00:18:35 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:16:31.2553159Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.83},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.87},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.89},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.8},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":0.86},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.98}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '361',
  'apim-request-id',
  '3b85ab42-08dc-41ab-b17e-22e2b4aed914',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000')
  .query(true)
  .reply(200, {"jobId":"e84916d9-b2e5-4cec-bf45-ccf744d0a499_637414272000000000","lastUpdateDateTime":"2020-11-20T00:16:31Z","createdDateTime":"2020-11-20T00:16:30Z","expirationDateTime":"2020-11-21T00:16:30Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-11-20T00:16:31Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-11-20T00:16:31.2553159Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.83},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.87},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.89},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.8},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":0.86},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.98}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '79d0be5b-442a-4f9e-9c05-6ac6c2021f96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:18:37 GMT'
]);

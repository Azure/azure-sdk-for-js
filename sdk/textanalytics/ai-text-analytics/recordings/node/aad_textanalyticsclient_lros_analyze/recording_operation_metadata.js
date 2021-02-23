let nock = require('nock');

module.exports.hash = "7b6d6a579a71ca7a5c79151e7ea04a90";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '93ad16f1-1be9-4340-af5d-4a065f0a0d00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EAAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:03:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:03:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2',
  'x-envoy-upstream-service-time',
  '287',
  'apim-request-id',
  'ad42d065-4bb7-47c7-b7cb-ad0f7a75fe80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:40Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:40Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd39a9337-50ea-4788-ab3f-cbc8f5bf97c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:40Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:40Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '1e022842-4593-440a-85b6-a7f4bdba3c10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '743',
  'apim-request-id',
  '8e3e3100-af8f-49ef-b858-5b0475e91e75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'fe1a8a17-1b04-4b37-bb7b-969ccd7da39a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '604861be-b4b5-4c6e-a63f-3939ac33a201',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  'd9190882-7ddc-4590-b4ed-de034c24c7ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '522',
  'apim-request-id',
  '6b093f1f-48f7-465a-aa67-79909cb3595d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '10b14fc3-c2d0-4121-a237-6f1e5ccfc8bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'a9b10304-a076-4331-98f1-fb4fa700f5b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'a898384e-7d4b-45f6-81b5-76555f782cfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '373291ac-a2a1-4cdc-a782-1d56e08d4668',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '4a0be361-2a88-4eb0-9840-0b201020bc37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'f3100a3b-adc4-49e2-a115-5bf08078309b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '8207c7e4-8f37-4c6e-957b-19c971ca68ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '67f072cf-0e3c-47ee-94a1-5293a27ca019',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:09 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '71b36830-8600-4d7f-80e0-215de0a80f00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EQAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:04:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:04:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  '7e28640f-2c55-4c1c-8a30-9fbd6d39cbcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '674ecf10-17ec-48fc-b061-d3fbd948b65c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '15cdfddf-5643-4ebc-ae89-b7b1c5c3e3a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'cca324cf-90e6-44f1-918b-412045d75bcf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '1b252422-753c-4a30-aa07-02ea9dca05f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '7527207f-a2e2-4982-8e7a-bcf8ea376eb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  '721904f9-550a-46c2-a6b6-703e1fb6beb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'c506e9a8-2ff0-4f11-b684-99bc76dda46f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '41a9dcd7-1c8d-4928-8178-3e596c5617f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'f6486e5f-75fc-4d85-9076-34205386a0c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '9fd0ba4a-cb11-46a6-96ef-3bf41133d0d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '5a26329d-8c4f-4e17-a9e7-f4a58b92b776',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1429',
  'apim-request-id',
  '646f5f51-de62-4656-ba9c-27b2ae8b3d34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'a14c8307-9f1c-4eab-915e-aaa032710ac6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:40 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '55350ee8-9f6e-4fa0-9040-4e0e1e998700',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:04:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:04:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'b9de0be8-e745-476a-8d1f-80ee5c43f4bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'd63b7bdd-4aa7-4660-ab20-66933ee6c190',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '5a24e847-33b3-49ec-ab11-6b95c6e9c4eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c19cd8c-1c59-4783-8db3-8335789305d2')
  .query(true)
  .reply(200, {"jobId":"8c19cd8c-1c59-4783-8db3-8335789305d2","lastUpdateDateTime":"2021-02-23T03:03:41Z","createdDateTime":"2021-02-23T03:03:40Z","expirationDateTime":"2021-02-24T03:03:40Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:03:41Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:03:41.6289102Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '7b050577-0284-4363-aae1-57d0fb6057c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:49 GMT'
]);

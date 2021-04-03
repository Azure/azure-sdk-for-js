let nock = require('nock');

module.exports.hash = "c6b29871814e2ed17055893a0e240b0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'bd8d1f52-6f88-4596-8d5b-f8e461df1400',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DwAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:36:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:36:12 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c',
  'x-envoy-upstream-service-time',
  '1508',
  'apim-request-id',
  '5c5376cb-7eeb-41d0-b30e-6d6f03a9b1ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:13Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:13Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1029',
  'apim-request-id',
  '88a5c95b-cb62-4baa-8406-085cbc2aeb29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '871',
  'apim-request-id',
  'b0bf4e3b-b699-4b34-9a49-b5671bca7898',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '395',
  'apim-request-id',
  'e0b31746-dbab-4262-bc93-4dcf7409b8e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1151',
  'apim-request-id',
  '6695a94f-1d2e-4db9-9a8a-32b2b3033102',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '855',
  'apim-request-id',
  'cf0b0751-30b9-4497-8888-83624316aa3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '295',
  'apim-request-id',
  '321c2cf6-3ca6-4d8f-9ada-0752106129fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '635',
  'apim-request-id',
  '2e3358c7-7b77-415d-8ad1-9d0821ec9f09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '878af76d-7034-463a-a367-2fa27b5c5fea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '15ad5894-efb3-4b6f-a659-984b96712d04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '834',
  'apim-request-id',
  'cfede42e-c033-439b-897e-122895200b30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '240dfecd-dc87-48f3-b32a-481672fcac6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '6917f3e3-0b3b-4dd8-9414-1531c5277423',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:41 GMT'
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
  'bed86653-d10d-400b-b7c4-538c25971400',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DwAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:36:43 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:36:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'f655c948-a27f-469a-8bdc-ea4d33a0e3f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '0490bf80-b92f-4e49-b750-2551eb0a76fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '3cd38325-34ea-454d-8411-dd800f60431b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '6b704ced-6b18-4129-abb8-9e5e1001619d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '09d8525d-8fbd-4fdf-8711-c1860dfbdf58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'd0f41bfd-63a6-4be9-88ed-673fe15832bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '01aec13e-f696-4aac-97e4-5d3b39177721',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'e44caa57-1c76-4a2b-8c0f-7cf1c95c9946',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:36:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '72ad39ea-7749-4af3-8e37-8f2fc4131b6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'c27e4459-61c6-47f3-a18e-1153ad5af18f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '7201440f-fd01-4f71-90a3-26d900bc193c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '58fef9a8-80a7-4431-8496-2bfcbb6cdfbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '5e0eaa6d-d10b-4245-81cd-03779febfe74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '6ee6387e-2600-457e-83e5-9b88d186756d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '782',
  'apim-request-id',
  'f0b5aa36-d9e7-4f40-858f-0e92eff867ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '9bf8b4bf-fdf2-4389-af2b-30b715a290a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:16 GMT'
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
  '608f6acc-59b2-40b4-98e3-5b785e4b1400',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EAAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:37:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:37:15 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'd6bd82e6-6638-4617-b270-1921b7691fa8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'fb7dcad7-4215-45db-b543-8fa5385a3991',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '627',
  'apim-request-id',
  'b20943d0-218a-4a5b-9df6-b012ea55da9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:36:16.0460142Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'd3e8546e-a64d-4077-b1b3-5cf06897af51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2e0c922f-077b-4b35-addd-889d43db0d8c')
  .query(true)
  .reply(200, {"jobId":"2e0c922f-077b-4b35-addd-889d43db0d8c","lastUpdateDateTime":"2021-02-23T19:36:16Z","createdDateTime":"2021-02-23T19:36:13Z","expirationDateTime":"2021-02-24T19:36:13Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:36:16Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:36:16.0460142Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.95},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '1159132f-fbd3-4898-98d0-8d2397c011d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:24 GMT'
]);

let nock = require('nock');

module.exports.hash = "1d5f0df6a809149631c85dc21b38c1c2";

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
  '30cddf92-bbfc-4042-a50d-a60692400d00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:02:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:02:26 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  '5d5284b6-06dd-4b2d-ab82-d584a7601e96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:27Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:27Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'ec8d74a9-7293-481c-929e-f91040d14bd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:27Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:27Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '562a2313-18ac-4bc9-a984-5a0002521cec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'c093778c-aed8-498a-bb1d-7c1bbce582f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '00a0d9ff-bc41-49f4-a1e9-ab91d44d270c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'aa4dc109-a10b-4c58-b74c-5b0282824ae0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'ff1ec5b3-e803-4ba6-8b8c-3ec1eb780990',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '0a15f585-5245-405c-99c7-0438f6456c18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '53fb03e2-39f2-4505-bf63-6793a79ca247',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'ffe71838-0084-4de9-ae93-6a7796299111',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'aa017a6d-fc44-405d-9086-e0776608937f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '4345fa91-0339-48b6-8f8a-5193d765a9bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '43e2427a-a404-4cfa-9d65-02afca41ead2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  'a6cf526f-f26d-438e-9582-651c6e796f6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '1d7bdf81-fb4a-47e4-b227-9df0e14c4c79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '052d85f1-ff6f-4a92-a192-559072f92772',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'a8c32aac-917d-4d77-a366-8e40cd2c923e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:56 GMT'
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
  '777f6cd8-f83f-4a3c-8f71-d3632e1e0f00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAElmxtcOAAAA; expires=Thu, 25-Mar-2021 03:02:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:02:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '01267038-dbf9-4d65-b009-a68307d074d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:02:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '590',
  'apim-request-id',
  '7b0c148d-2ea9-4c4f-ac97-fb7edb1578be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'fffd1e4c-e619-470b-aa64-c019accaa51b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'c00ee309-fb24-4c18-8256-3caeac65709c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '6750eda7-717a-4347-8b74-fc416f1c6c18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '5513f318-f7ff-4533-b1ad-39997010d1c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '41dbcc8b-c5a4-4ea0-8ced-c79d9a02a339',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '092c313c-f793-4fc2-96d1-a07e5cbc85d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'c4387bd1-7563-4e23-8f55-49acd0eb1eb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '1f94ab5c-dc92-4849-8ce6-a477b82f67fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:02:28.4216629Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'cc957e49-cdaa-45a1-8047-72501a3f0593',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:39 GMT'
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
  'c74946cb-8f27-44e6-9452-63e6c9470f00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
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
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f')
  .query(true)
  .reply(200, {"jobId":"6ba3fd4b-8e96-43f2-acb7-a7b332d4fa1f","lastUpdateDateTime":"2021-02-23T03:02:28Z","createdDateTime":"2021-02-23T03:02:27Z","expirationDateTime":"2021-02-24T03:02:27Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:02:28Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:02:28.4216629Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  'c8bff55d-9e59-490c-9632-74a2859c8549',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:03:39 GMT'
]);

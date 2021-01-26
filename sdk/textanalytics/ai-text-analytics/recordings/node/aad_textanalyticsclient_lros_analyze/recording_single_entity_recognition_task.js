let nock = require('nock');

module.exports.hash = "571daea5abd5e24c8932040b0414d730";

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
  '454ea14d-02b1-4a7b-a4f1-039a72accf00',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ah2ezSGIIXBMjgocNeeNYi9z_bg1AQAAAGBJdNcOAAAA; expires=Thu, 21-Jan-2021 20:09:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:09:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000',
  'x-envoy-upstream-service-time',
  '819',
  'apim-request-id',
  'd4123c07-bd9a-4c60-a2aa-c83b354eb927',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '399',
  'apim-request-id',
  '48668d2d-7e10-495f-a84c-9eb3ad4cb3a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '268',
  'apim-request-id',
  'dfeee4ba-c472-4a7e-9511-e789ea1c40ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '57fd149e-f5d9-416d-aeed-c5d7d7ff7a9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '7d70ba3b-b47f-4381-a282-fe29a95dccfe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  '033a1a5d-67f4-45de-8c45-4175b44f7019',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '22cc8d12-12f1-4dcc-8cfd-3ddb184522c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '74f13145-2bd9-4607-9986-7a05c9792df2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '0cfd85c5-8684-4f1b-9b33-8371f8dd4b08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '3eec3496-3aae-4158-a920-a8bccb2844d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'd809353d-386f-4dc2-9f2b-6b597f821e4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'caef4604-1ade-4515-bca2-4329c08f1f0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '30aa2e6b-03af-4782-90b7-524dc0560d92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'd469da90-9210-45fd-9387-d7fcaf92c743',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '2f3d61c7-11e4-41af-9522-3fa11a3be16e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '3a636cad-9d78-4ad5-a897-4142d1c15b47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:34 GMT'
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
  'fa8e10c3-c729-4266-bdb9-2e95f5e3d800',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ah2ezSGIIXBMjgocNeeNYi9z_bg1AgAAAGBJdNcOAAAA; expires=Thu, 21-Jan-2021 20:09:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:09:34 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '01da23c7-12ca-47a8-afc3-b84142132846',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '2addb47e-1eca-4943-8e82-12733453a8c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '7b603f6c-b3de-4696-8d09-6e810a9ade8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '2b39f23f-b04f-4436-bd0b-c616d0847d0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '25af4825-382b-4596-845b-910e4ce8f443',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'f06ec933-06d6-4bfe-b2e5-535fc8c65833',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'e0233f82-8ea3-4526-9acf-2613042e9b01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  'a5d5e8fb-4dc6-44ba-9e0d-726bd7c1e3ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'ed0d8174-b430-4525-83d6-15f2937b0f9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '1ae4e137-3173-4e78-95fb-0cc7fa7e4922',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '2da9b486-5298-46f6-a129-6a6d2f125541',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:09:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'fc6ece43-dfba-4d19-840f-3018154da10f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'f6abf33e-15e8-494b-b29b-95c98a52e4f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'd8b486fd-167f-40ac-86c0-3af8b595c572',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:04 GMT'
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
  'cfd6c464-0485-4428-a34c-9215ded9c700',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ah2ezSGIIXBMjgocNeeNYi9z_bg1AwAAAGBJdNcOAAAA; expires=Thu, 21-Jan-2021 20:10:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:10:04 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '8e1079d3-9add-49df-b977-097a8195e729',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '3c130ba3-4fe0-41af-932f-7e2f10de8737',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '51d2dab4-eb8b-4724-9aea-96256ea885a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'ca42d014-d28f-41ec-b3ea-eecfccffb447',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '34da6e40-bef5-4e75-9046-d04cd158349b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '23e571fd-1da1-441a-b2ec-0011d44af988',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:09:06.8923998Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.86},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.82},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'b1263b87-c60b-4bdc-9c70-0c44645773ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/b5083982-5436-432f-a957-e03c61f19472_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"b5083982-5436-432f-a957-e03c61f19472_637441920000000000","lastUpdateDateTime":"2020-12-22T20:09:06Z","createdDateTime":"2020-12-22T20:09:05Z","expirationDateTime":"2020-12-23T20:09:05Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:09:06Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:09:06.8923998Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.86},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.82},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '34eb1689-0370-4e15-97e3-84774cf9a950',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:20 GMT'
]);

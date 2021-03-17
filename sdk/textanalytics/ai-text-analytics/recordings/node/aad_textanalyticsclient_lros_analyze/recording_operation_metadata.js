let nock = require('nock');

module.exports.hash = "d8f968b336ad56ff1552042da3290b5e";

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
  '3ef48b4e-3965-4379-99ed-da4299e3d200',
  'x-ms-ests-server',
  '2.1.11530.15 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApWo-E1NkG1GvNXj5NFxXfJz_bg1AQAAAAwy2NcOAAAA; expires=Wed, 07-Apr-2021 14:56:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Mar 2021 14:56:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"displayName":"testJob","tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf',
  'x-envoy-upstream-service-time',
  '5305',
  'apim-request-id',
  'c2f57d98-d66c-40a8-ac0d-574a10d4c6a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:23Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"notStarted","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:23Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1224',
  'apim-request-id',
  'd72ad7d0-e028-48b5-9346-5d32f5caa4ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:23Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"notStarted","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:23Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1561',
  'apim-request-id',
  '9efa739c-5886-45f8-8478-413ec4cddac5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1739',
  'apim-request-id',
  '58977ed4-f818-4d3c-916e-3d89e3cbfb6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '848',
  'apim-request-id',
  'c59ade49-351a-4bf8-b4a4-2db0407925f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '676',
  'apim-request-id',
  'b9117a0d-ed9c-4bc4-b9b5-64628f2455cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1138',
  'apim-request-id',
  'c8c4f300-a90b-4453-8746-2be0680d35c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '687',
  'apim-request-id',
  '5d400891-8ccf-478c-afed-b010b1381c83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '830',
  'apim-request-id',
  '1fc0660e-7006-4186-a88e-74396aec6125',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '15c32e0b-e9e6-40c9-9ecc-35177be2dfb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1090',
  'apim-request-id',
  '5dcc1c0f-b29f-4b3d-858a-0f09cd921178',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '351ccca7-e6c6-45cc-a19e-1adb0acc5095',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '824',
  'apim-request-id',
  '5828c88c-3e48-4940-80cf-73534cb2c1da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '961',
  'apim-request-id',
  '37496328-0e83-44dd-9a8a-2f33387a836a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:56:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '9928a392-b486-4bdd-9e66-06f38876c48e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '827',
  'apim-request-id',
  'ee20822a-acbc-4a65-a18d-9d91cddc9449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'ae4256d4-3426-4507-8f71-c20b15acb607',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'a61e923a-577d-4254-99b7-f1d62bf18b44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '764',
  'apim-request-id',
  '165a0272-231a-4ebb-9862-16a91bc7445f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'c531150c-86ef-44ad-ac73-33600f99613e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'a2941edd-0df0-4cca-a589-8f7ca4a338a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '22f7bb55-7a5b-450b-aba3-8b980aede70c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '2f0f15c8-552d-4d82-a000-d6b9a8058b58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '320',
  'apim-request-id',
  '1107c1ff-ac4d-4fef-928a-17e017e4bbcc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '866',
  'apim-request-id',
  '56aded2b-3de1-44c4-8f2c-f3ac19ce061b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '905bf6b4-d481-4f94-99bd-8862d1daae39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  'e170f2cb-eb32-4331-a929-da748009a34c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'dcd36b2c-14fc-4854-bec4-df6c8fb353e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '129d3f57-2d8b-478a-a258-c6481b7a9ac4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/76f29aa6-8859-4bed-a97a-a7321a443dcf')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"76f29aa6-8859-4bed-a97a-a7321a443dcf","lastUpdateDateTime":"2021-03-08T14:56:27Z","createdDateTime":"2021-03-08T14:56:23Z","expirationDateTime":"2021-03-09T14:56:23Z","status":"succeeded","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2021-03-08T14:56:27Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-03-08T14:56:27.8409173Z","name":"testJob","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '736',
  'apim-request-id',
  '70f7008a-d51f-484f-adcb-7080c35d8dc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Mar 2021 14:57:35 GMT'
]);

let nock = require('nock');

module.exports.hash = "c686773b099b6fa962ac83db7f0aaaa2";

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
  'e38fa13f-4017-4074-8354-244649890c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:44:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:44:51 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.","language":"es"},{"id":"3","text":"Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.","language":"de"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  '43675c00-3569-4bc4-8eef-6c226ce5688f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:52Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:52Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '9b3f1c12-7665-4fb5-a16d-cc653bd46ee8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:52Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:52Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '66198be0-d388-4d23-b97e-eec87b123ced',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '2fa2772f-7699-4a2d-b455-6339bc20ce77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'a6b1a8d5-b9cc-41d1-9d60-7ebac45c0a4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '6ecb3f38-ba82-4de9-99da-b64c360bacaa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:44:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '89c69d9a-7502-4135-8d55-66d13f6790e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '27c6bb17-9d7a-4865-a380-507e8cdf31f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '8d12429d-6e55-4933-9b19-134d9ee93262',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '0a7dcb13-2b2d-49b0-abdf-d4013ec1c07a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '8d28e631-2add-4397-bcee-e52b870f5b0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '857f7f38-0ef0-42d1-a9ec-fe8313e58a95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '230',
  'apim-request-id',
  'f7b5aa25-9e10-41bb-808c-4fd1b49c470c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '52f0ff24-9df6-4228-801f-b41adcfa6683',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '19a08c59-e769-4345-a5dc-bf08c3683bcc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '23a13a53-916c-4f29-8404-f28bf78aefc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:19 GMT'
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
  'd8ac8166-fdb3-45f0-98f5-44d9b3c80d00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EgAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:45:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:45:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '1d9a1a32-7114-4221-b11e-e130eca9caa7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '542',
  'apim-request-id',
  '562a1979-3bfa-4b12-b691-6f0024b3dd23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '4d169542-0a61-4f2b-b8c6-4ae6627117b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '1050',
  'apim-request-id',
  'a35db550-6b14-4ba2-9872-4e72f5a2bfa6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '551',
  'apim-request-id',
  'b177f6d7-52da-4114-ae70-31b4b436ae42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'f396040d-4ec9-41fb-ad32-503084c6204d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '689',
  'apim-request-id',
  'da5faa2a-08ad-46f8-a650-4c73f8642858',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '1900152b-d15c-43e0-88b2-7a4976a42d44',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '4635841e-7586-436b-a289-158a11c98bbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '43e60e97-49d6-43e4-90f2-602d58423317',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'eb3ffdec-4d60-4ffe-a556-4a11c0f7cef6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '09915cdd-58cd-4545-bfe9-6a256a57b18b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '011ed9e2-32c8-479e-aada-e85828c9d246',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '16962d0f-64d4-4ff1-ae44-1e999522601d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:51 GMT'
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
  '67d77fef-37e3-4834-9e6e-0a2f336d0d00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EwAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:45:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:45:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '528',
  'apim-request-id',
  'a441977a-fcc7-49fd-ac3c-10656e654a9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '3b38365f-4410-464d-b56b-e4d83314a73a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '46727277-4616-4a46-8391-958b23ce4b72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:45:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '3500217b-a799-4e50-8324-e81d57f1b420',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  'b45a7183-ea25-47f7-953e-5cc7d6e2a216',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '613',
  'apim-request-id',
  '202a2104-c7e5-4d37-bf93-5f521479df71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '572b9a59-279c-4bc4-b387-ff207d8a72af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'bcb827e1-fe39-4d0f-813b-462085149cda',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '36f87bd4-5e01-4d69-9c7b-793dd59ae5da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '715',
  'apim-request-id',
  '697ee81c-8fc5-4771-b041-531258bdb407',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'be77ef7a-5ee3-4cb4-8ab4-64a7081327e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'dd004ae7-9d46-425c-a5c3-39a89f86890f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'f1ead783-d28b-47f6-b284-791a86211afc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:20 GMT'
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
  'd166ff7b-8820-4317-be8a-4cbc5af50e00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:46:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:46:22 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '2ad54b23-abe0-4776-9184-512cd099e0a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'af240a49-c913-48af-975f-bfe312ad5ede',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '845',
  'apim-request-id',
  '1849d2e0-6ac4-434c-9b79-6238e8f566f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '303f13be-3032-4877-a4fe-71f6f7d96031',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'd10d64a2-e8ab-41e9-94ee-e8add848cecd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '66ddb177-57ee-493f-b33b-f45327ae8c60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '452126e4-4caf-4cef-bda7-e3cdeba3e4f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'fc4f5a06-8929-4bfa-ad0c-2b0bf10d6296',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '538',
  'apim-request-id',
  '488405e2-b758-427d-9679-549f1d83dc21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '64f07c6a-c248-4fb2-b302-2ac2226cf450',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '383e11e8-5edf-4246-88db-c11914712978',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '361309fc-736a-4258-8993-40bf45d173e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'eac9ff7c-29ac-4564-b737-50afa57dffb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '5d815a3e-0bc1-4d06-990c-996542724295',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:51 GMT'
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
  '8a2db638-7a47-4442-9622-4b0a48720d00',
  'x-ms-ests-server',
  '2.1.11513.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:46:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:46:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '417f5c23-79eb-4509-bf8b-d795329bdfc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'c8ad3d21-fe0a-4f44-9fc6-319caf4c5002',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:44:53.809619Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '201',
  'apim-request-id',
  '290cc468-2d62-43ab-9e42-6d443c81a301',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08')
  .query(true)
  .reply(200, {"jobId":"48a2368d-fbbf-4cca-9fa7-c22d9b7f5e08","lastUpdateDateTime":"2021-02-23T02:44:53Z","createdDateTime":"2021-02-23T02:44:52Z","expirationDateTime":"2021-02-24T02:44:52Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:44:53Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T02:44:53.809619Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '642',
  'apim-request-id',
  'e36a3fa6-8d61-4661-854a-575a765f755f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:58 GMT'
]);

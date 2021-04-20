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
  '6c43895e-f811-408c-bcba-56ff0a711400',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DgAAAJtTx9cOAAAA; expires=Thu, 25-Mar-2021 19:54:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:54:15 GMT',
  'Content-Length',
  '1326'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  '88eb2a2d-77c8-4bd4-b04a-ab2952a7a573',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:16Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:16Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '680f71fd-a2f8-4625-a737-b67b4068286a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:16Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:16Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'c4de9713-584c-4d32-a0bf-656b45c0137f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '059f648e-39b3-4549-bd38-e8382c89d7d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '2a9564bb-62c6-4e03-be80-9e0265480967',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '47a1de29-8192-4c5c-a798-5867546daa59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '96ab8e0d-bc1d-433a-af66-7c2e7265d025',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'aabe86f5-5ea7-45ae-806d-7a30bacf9141',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '970c99bb-f26f-4e25-8116-f6f2265b2045',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '2743d4bb-dcd8-49b0-904b-508ced70308a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '7668918a-14dd-467c-bcf1-0c81d99be423',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '68c53912-42eb-4354-b4d3-8582e5135b1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '58b9e000-ec84-40f9-ae80-65fd6f518e02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '646be323-6ac7-4194-b9b7-cb23458eaec9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '6f7d550a-7c01-4f5b-a90c-6e79626cf726',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '08e84b1e-024a-40b1-9bc3-05f619e8329a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'fb24de85-c200-40ff-ab06-9d3ccacedea9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:46 GMT'
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
  'bed86653-d10d-400b-b7c4-538c90581500',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DwAAAJtTx9cOAAAA; expires=Thu, 25-Mar-2021 19:54:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:54:45 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '153ab611-2748-476b-a6de-5a69328ee3dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '6629900c-707c-4c5a-af1d-d07ba5b0c5c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '3500b99c-2620-4d00-93cb-69d6f3d11c3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'b071e5e4-5790-4a5f-8d83-c20f9e8a4879',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '16577044-f349-455c-a630-6bedcaf0a4e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '74cd1a38-9f48-4b91-b8ad-be8e1ecac901',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:54:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'e09f5552-ba5d-4c23-9d49-a3c868ee2d27',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '821',
  'apim-request-id',
  '3b3ce88b-7708-45c8-bda8-15086c2cf183',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '83f4b2a8-5d97-4d9e-8260-f705bf07206d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '0d1c2fd2-778e-422d-bfa6-447ad846156d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '43ca6673-6778-4bf8-bab2-110966b3ca6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '1add579e-5be3-4fb5-a714-758405a31eac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'c2d414fd-8890-4ee3-8313-f236623c0469',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'f4cfdbc2-aa08-4063-9860-1c45acf72a3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:16 GMT'
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
  '4f39218a-f2c1-4296-9b0e-5202c9cd1300',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EAAAAJtTx9cOAAAA; expires=Thu, 25-Mar-2021 19:55:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:55:15 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'eb47d55f-3b94-4c1a-afef-4d87588e009c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '23e88ba5-36ee-4593-a031-bbcae80e6731',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '665eab24-40b4-4fa0-8254-31664a386755',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'fe0f878e-16a0-4afe-81fb-80c647da4068',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:54:18.6101676Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '1892e138-edb5-4da5-9109-1b5a09d6bd6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/d489efbb-10cf-4ce2-8ee1-1e500cef73af')
  .query(true)
  .reply(200, {"jobId":"d489efbb-10cf-4ce2-8ee1-1e500cef73af","lastUpdateDateTime":"2021-02-23T19:54:18Z","createdDateTime":"2021-02-23T19:54:16Z","expirationDateTime":"2021-02-24T19:54:16Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:54:18Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:54:18.6101676Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'b009cbac-2037-4a38-b289-d3cbb2425ebc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:26 GMT'
]);

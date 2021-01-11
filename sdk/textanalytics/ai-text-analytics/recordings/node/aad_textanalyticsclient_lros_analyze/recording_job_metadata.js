let nock = require('nock');

module.exports.hash = "f7498d74f6f9a29ceccde964fe73a18a";

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
  '2509c19b-ead4-4eca-af85-e08a15d6db01',
  'x-ms-ests-server',
  '2.1.11328.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag7Gql5Twf5MhtL48gR0olpz_bg1AQAAALh-fNcOAAAA; expires=Thu, 28-Jan-2021 01:34:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 29 Dec 2020 01:34:48 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"displayName":"testJob","tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000',
  'x-envoy-upstream-service-time',
  '503',
  'apim-request-id',
  '9b129b3d-51cd-4586-8f3e-edcef42b90ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:34:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:54Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"notStarted","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:54Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '279',
  'apim-request-id',
  'fb6ba3b8-5392-4e46-b252-3fc63b134041',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:34:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:54Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"notStarted","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:54Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '8f6e32a4-0161-433f-bb96-feb8165380ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:34:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '366',
  'apim-request-id',
  'e0e76d8a-adcb-46e8-8fe4-d51419074529',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:34:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'd2d1adae-2630-48ef-a19a-cf0ae18bcb2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'efe0b37f-ef68-4e18-8a76-3709565f17d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '1bf021a4-260f-44bf-b2c6-388f84f227e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '439b6545-39a6-4d18-8a98-da22327d5075',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '75dbfd07-15ca-4fab-8e4c-7ce16ce95d3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'a85e55d1-f37a-4fac-9574-0b7ce67d8f88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '74542fe7-35e1-4eef-9a16-8bf8740510d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'd4559c83-4705-499e-aac4-0f8a503182bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '54212ba1-b9f3-4847-9e3b-782d803fa564',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '91c67423-13f8-47e4-b6b5-c726df176d67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:19 GMT'
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
  'b727b4af-214d-414e-b73c-606342422e02',
  'x-ms-ests-server',
  '2.1.11328.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag7Gql5Twf5MhtL48gR0olpz_bg1AgAAALh-fNcOAAAA; expires=Thu, 28-Jan-2021 01:35:19 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 29 Dec 2020 01:35:19 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '81676ccf-eafc-4180-b7da-9739c88f53a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '5993643e-cc19-4f73-8d5b-2df2f421c145',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '0c7deec9-b223-4c5c-8ce6-32c85f8b2566',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'c52bd59f-28cf-4105-b712-483b4e8736c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '9a50a541-99f5-48d0-a4f6-b88ad83cc3aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'a6953a5b-a017-455a-995f-647cd6d3c287',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '2405df46-ad1d-4ee5-8403-f8690077a40e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '1ca56571-aa11-47c4-9c50-73bf9a4ff558',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '2541dbce-2cac-42ce-a3f1-2befe3dce3eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'b33ccd86-7daf-4ef8-bf15-f8291380d820',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '8da4dd0b-c7b2-4966-bfc9-98c7b76a0648',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'fe624f52-7618-4ac5-b83e-3df188609863',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '66234481-8d97-4638-a3cc-1b477c7786ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'e0cba622-7519-44af-85de-928401b20955',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '1260793d-5386-49dd-8617-76e4c89d777e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:51 GMT'
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
  '27f2771d-174d-433f-bbb7-1a9f572c4102',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag7Gql5Twf5MhtL48gR0olpz_bg1AwAAALh-fNcOAAAA; expires=Thu, 28-Jan-2021 01:35:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 29 Dec 2020 01:35:51 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '862285a5-d528-4856-b5f1-ad5475f04723',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '9c3ea4d6-80f7-4c97-a0ce-ef959f0c899d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '233808de-0ce6-4a20-b631-70e067048f1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '9594304c-863e-4a5e-980a-300d50f22ae2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:35:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'b5dc4e64-bafb-4903-bff2-cfccf4b328fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '4058e485-042e-406b-9d16-0ec64a9bccfc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'd6745f9b-b73c-4fab-966a-78d37d58274b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'b380f852-78f3-4e91-9310-35931e7f57b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '6b29d2ff-0c1d-47f8-9c0a-afd93dc6589d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '1c5f2b38-0ff4-46c1-9f42-2f34480a61ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'fc00daec-c6a1-482e-bc53-97107ee47fc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'b22d2daf-0ff3-4cc0-b650-45c50de3a6ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'e25e7176-e7d2-458f-b7a4-fdeacff36b8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '5b3a5093-e912-4150-b679-6b1814b7612c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'f70db183-68f2-4ce9-9d1b-51a9e8425612',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:22 GMT'
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
  'e10b13d8-b73a-4ab1-9656-3429cfa44502',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ag7Gql5Twf5MhtL48gR0olpz_bg1BAAAALh-fNcOAAAA; expires=Thu, 28-Jan-2021 01:36:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 29 Dec 2020 01:36:22 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '0aca1527-8d90-493a-9a4a-645263163647',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '241eb10e-164a-41b1-b1f2-edfacc502891',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  'a6630ed3-6608-4481-96b8-311682c20623',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'f189411d-1a59-44a5-b971-85f5c2c33679',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '669e6c2b-fbd0-4b57-b119-a7de68adcd31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '1bb68462-db3d-437e-8a33-c28f8132cff3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '29664d49-76e6-4131-a482-c2fbda231e73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'b0dd2757-a4ac-48f3-b9a0-a066604eb893',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '7e76c261-33b7-483a-9a73-b34c6b85c810',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'ee4784c7-1cad-47ee-860f-1d7d80b55b13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'eee1d096-b507-4207-899d-062f1ca618dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '03e2fe79-007f-4a19-9f01-9215ab03f753',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '923b8247-4229-4e9b-83fa-e63e8f89fc91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '7238df7a-03bc-421e-a8f8-01aa00bcdf55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'e7cb36a9-916b-4624-8aab-7e451fcdc54b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:54 GMT'
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
  '5c1c0802-892b-457f-8118-5ad79d544402',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag7Gql5Twf5MhtL48gR0olpz_bg1BQAAALh-fNcOAAAA; expires=Thu, 28-Jan-2021 01:36:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 29 Dec 2020 01:36:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'c687f2a9-0c78-467c-b17b-9f798271502a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '22dfb2a6-1588-4958-9048-91beebc917f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:36:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '4053f3e3-4953-4c5f-a0ad-3adea7c901e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:37:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"70ac7205-b654-4567-89b0-ad2fe001db4c_637447968000000000","lastUpdateDateTime":"2020-12-29T01:34:56Z","createdDateTime":"2020-12-29T01:34:54Z","expirationDateTime":"2020-12-30T01:34:54Z","status":"succeeded","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"name":"testJob","lastUpdateDateTime":"2020-12-29T01:34:56.0303439Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '346',
  'apim-request-id',
  'ba07261a-9790-4325-9a0d-ae73757079ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 29 Dec 2020 01:37:03 GMT'
]);

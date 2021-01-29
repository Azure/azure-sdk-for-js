let nock = require('nock');

module.exports.hash = "e5389059533437b4c058f5ef35093b73";

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
  '9dfb9450-2340-4bcb-a85a-94d1ed157700',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkBkfHMU625LodiUruRq-d1z_bg1AQAAAGiwftcOAAAA; expires=Fri, 29-Jan-2021 17:31:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:31:20 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.","language":"es"},{"id":"3","text":"Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.","language":"de"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000',
  'x-envoy-upstream-service-time',
  '625',
  'apim-request-id',
  '488eacec-1468-4cd9-985f-268c3b3e1606',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:20Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:20Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '19',
  'apim-request-id',
  'a16ef6f9-e8d3-46f0-8b25-cd6642fc26f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:20Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:20Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'de80e77d-c532-497b-87de-346da55657d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '0a9ddf00-2f08-4c6a-ac1e-1cef3234bfb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '6939c089-db26-4e09-b5fd-a6299a80c734',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  'd5f75ec8-164a-48ef-9e42-3cacde9b9762',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '9975d64e-39d7-4325-8cc4-861fcf05c08f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '2b9d36fd-4ca4-4d59-a93a-99fa9b46d45d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '172f4ceb-510a-4a25-9b96-d990c5d08b56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '95480179-6357-4b7e-b7c7-5ad5183c1428',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '7e4275d1-acd9-4a07-b440-13c6d5daf93c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'f86caae1-c835-42d5-9c0d-0b26b6f2679a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '1c55f90d-74fe-4dbb-9c29-c474f3fa633e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'aebe03ac-58f7-4b1e-b6e7-8fbf8bc5115f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '0c504073-bb43-4f6e-84d7-be08c3f7fc38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'eacf428b-d347-4e99-bb5a-6c60ed017cc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '10015ee3-139c-4a11-95a3-370f3b524b68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:50 GMT'
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
  '2bf1577e-4127-4e76-85d2-e8ff52d77400',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkBkfHMU625LodiUruRq-d1z_bg1AgAAAGiwftcOAAAA; expires=Fri, 29-Jan-2021 17:31:51 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:31:51 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'ce7d4ecf-41fd-4692-8180-3cb9ee925138',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '7abedc95-074a-4533-8c06-6037a0d0030f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '500425ea-c4dd-4ada-9ed3-6e4c3ab02519',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'fc1e5d62-1ef0-42d9-a208-689c3b7aa735',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '66ac628b-68d9-4e56-9d10-fffa51ae6bda',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'b3805a61-f1b6-42ba-a094-a44c97c813d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '00357eea-c904-4b52-b844-e87f0461a1c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'f432ce7a-d664-45c3-b6ac-449b038f1984',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '00e5093c-4196-4da9-89cd-c557e43b261b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '85a48776-dd86-46a5-a607-3bdcfa15a1bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '61f55a48-9193-4328-b8db-87550c5aac31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'efb4d923-681a-430e-b689-566e26219e60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '957bb2eb-5d10-4bed-b348-39d73b61d099',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '864b6566-f0fe-40f4-a762-cc24aee7fd67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '84c938d9-6b89-4a44-ac0e-9810f1f54cda',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:22 GMT'
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
  'a4cfe55c-7b7b-4c72-a040-8be12cd57800',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkBkfHMU625LodiUruRq-d1z_bg1AwAAAGiwftcOAAAA; expires=Fri, 29-Jan-2021 17:32:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:32:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '9990a631-5a04-45b1-a16a-ea36cdff03cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  'cfd4b9e2-5b6c-4b90-9f09-4b84281314b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '6a04aed5-133a-44d8-b90d-21b5cca1a254',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '9f4fa42b-7932-4cd0-bd39-088621b89f9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'bfac2dae-d42b-415a-bef8-92d4fb1a27e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:31:23.2298807Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.83},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.87},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.89},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.8},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":0.86},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.98}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '7506e4a5-37b2-4d21-98ae-814868e5bbcf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"fb48ded7-476c-4206-aca4-47fe034f86de_637448832000000000","lastUpdateDateTime":"2020-12-30T17:31:23Z","createdDateTime":"2020-12-30T17:31:20Z","expirationDateTime":"2020-12-31T17:31:20Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:31:23Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:31:23.2298807Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.83},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.87},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.89},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.8},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":0.86},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.98}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '0e621321-7247-4abe-8869-e13dc3545010',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:32:35 GMT'
]);

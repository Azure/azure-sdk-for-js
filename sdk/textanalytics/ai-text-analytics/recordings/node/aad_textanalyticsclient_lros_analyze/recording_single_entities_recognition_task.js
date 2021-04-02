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
  'f8476665-5141-4361-b0e4-d45e85853100',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aoop172blWFEgLk5vV0NCrNz_bg1AQAAALdJdNcOAAAA; expires=Thu, 21-Jan-2021 20:10:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:10:31 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.","language":"es"},{"id":"3","text":"Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.","language":"de"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '52a51769-83f5-4f8c-90b3-e4924fc677bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:31Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:31Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '587b5429-59ad-430c-90e6-6022cdeb1c29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:31Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:31Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'c75097d2-6e1d-4dcc-9c3c-b378eb7aca3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'e2b3f723-0be3-48d1-b456-874c3ccf99d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '1d10c378-e22d-46c6-90db-f966bacda973',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '8ba78966-f6f1-41e7-9e7d-c09aeaecc635',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'b5fd0a7c-af8b-4fe0-be03-a59dec02bd63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '5a9db8eb-2bac-40bb-a7b1-5e6ed1588092',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '2d53745e-a16d-4294-af1e-100f8944b1cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'd7729934-6ef8-4dd1-ada4-5573844f356c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '5661c6a3-cd8f-4616-bf29-a022b47eaed8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '4a5a1984-e0e1-4bed-a23b-b23f82493558',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'e3ce02bd-5452-4f4b-a379-48e1edd75a7e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '17147c06-e61a-4f24-8a13-55ef5afb9ee7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '586bc883-8b2f-451e-acbb-4703a39561b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '326d6a61-e000-4dc0-acfa-66a9d2ab03dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:10:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '3b0ec845-355d-4721-ba1c-bdc90b52a4c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:00 GMT'
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
  'c44ea060-5273-411b-b474-51fc7f48d500',
  'x-ms-ests-server',
  '2.1.11328.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aoop172blWFEgLk5vV0NCrNz_bg1AgAAALdJdNcOAAAA; expires=Thu, 21-Jan-2021 20:11:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:11:00 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'f51c3eb9-342f-4740-a23b-e5b9332e58df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '9c278a21-d0fe-47a5-bf1a-5da2adf72120',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  'cf0b58c9-47b9-4616-8ecc-0a64ebc14a23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'db8c0784-c75d-40a9-93c9-b9f65183cd52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'a0dcaf95-9378-4016-ad6e-8171c10101bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'be5583f7-ddbb-417d-bed5-0dfd2547dfb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '4fb94f9a-89f2-4176-bb57-864e93ee61eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '73835794-6edc-4a9d-af7a-b80f704aaa47',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '7ef5ab28-da4e-4f0d-95ac-823b9f18d061',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '131db41e-1770-42d4-bfc8-bb81b15e6c98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '4aec7d97-d9fd-4d93-b6e3-384baf331729',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'bab42d53-9ccb-4ab5-86d1-11110ae0c68b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '3d7974e0-0d5f-4d40-8208-05f7ad21aa90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '3e96c483-ea80-481f-b7e8-c2392cea69a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '81e23b53-4e80-4a6b-85e7-d8422d7ec749',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:32 GMT'
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
  '9fb55c59-287a-423a-b466-0dcbb159f000',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Aoop172blWFEgLk5vV0NCrNz_bg1AwAAALdJdNcOAAAA; expires=Thu, 21-Jan-2021 20:11:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:11:33 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '1d460611-ed29-4a15-b2b3-3ce50a51ef41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'bb453786-9f44-4f8b-9226-63c5c577a0e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '11e6d15e-4782-47cf-a8bd-9cab76141191',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '0a83230a-a207-4c87-8ed7-2cf621813e92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '2d2a6d35-551d-4d2c-a05d-f4087a7c591e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '88ad876a-fc71-4261-ba3d-1fce21f0829f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:10:32.6124321Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.83},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.87},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.89},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.8},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":0.86},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.98}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'f2048079-4e13-4566-b360-34e2d6060d68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"f79ca5a4-7338-4682-8265-1a0dfc2b9774_637441920000000000","lastUpdateDateTime":"2020-12-22T20:10:32Z","createdDateTime":"2020-12-22T20:10:31Z","expirationDateTime":"2020-12-23T20:10:31Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:10:32Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-22T20:10:32.6124321Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.83},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.87},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.89},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.8},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":0.86},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.98}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '05d0328d-1526-40fc-8e3d-b6a96113dc08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:47 GMT'
]);

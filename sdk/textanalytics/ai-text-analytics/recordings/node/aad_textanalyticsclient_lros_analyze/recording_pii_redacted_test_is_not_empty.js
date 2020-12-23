let nock = require('nock');

module.exports.hash = "5d653e1deb27f35a16f87e12cd65a267";

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
  '4fbd3831-aa2e-4684-ab93-754eccced500',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvPl4cZ_mvJMk8oQAm5ixzFz_bg1AQAAACNOdNcOAAAA; expires=Thu, 21-Jan-2021 20:29:23 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:29:23 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000',
  'x-envoy-upstream-service-time',
  '600',
  'apim-request-id',
  'e382dafb-5a9e-4c1b-beb9-126bd37b8e93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:24Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:24Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '55c6b9cb-31f6-4a4f-8820-b939b7911a75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:24Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:24Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '97bd20d5-a520-49cd-8906-a8bb56fca09b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'd8e5e784-e597-410f-8744-8a504523bbc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '3ba61fd3-3bff-4f45-928d-c95924103c8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'c8868b78-5f85-483d-bed3-b0d6eae6f0f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '1bbbb390-8db7-48ca-b119-dbaa1c73c678',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'f7111212-e8a8-424b-8f82-4bfa1121550e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '2be67049-81e8-4293-a0bf-5fce475ee7dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'ad0f65d9-8bf1-4af5-a265-f8552c619b2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '764d331b-277d-41cd-9cbf-52c9f2caaefe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'dcf1da77-cffe-498a-97de-d827cc97be4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '2a773ed9-809a-4191-b274-84ce2716a62a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '0a7eb79b-aa0b-44c0-8916-7a73cf473c64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'c2fe929b-94a7-43c7-8a7b-1b09b6ce72b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '1a5ce293-6aff-4e20-92b1-2eb9fb5a92b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '5589379f-8b15-43ab-bb70-2dbb9cc1a4f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:54 GMT'
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
  '5c9bc70a-025d-444f-ad87-02786cf9a000',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvPl4cZ_mvJMk8oQAm5ixzFz_bg1AgAAACNOdNcOAAAA; expires=Thu, 21-Jan-2021 20:29:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:29:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  'c8471725-810e-4b6d-964a-315e5700b547',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '0dc77515-80c6-44fd-b2e0-4a1015602ab1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:29:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'f5d607d6-b0c3-483f-93a6-96c2247b771b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'f9f8fe84-91b6-410a-a238-7f5f0126703a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '099c4f9d-4d63-41c5-9586-462b0258af70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'ff27cc65-0be5-47af-a7ad-6abd903bf96f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '58bfe11f-c2db-4674-8fe2-3c58db3c465f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '2c385a8e-c7f5-4c3c-afc4-cc1625367961',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'a2de784b-3042-477c-b21e-d4b9a9312d82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '3b8409fd-b51e-407e-9b83-7f9ca344aef2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'ee927150-401f-4b07-a3a7-9fd5d59fb4f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '6016f02f-854c-4659-8549-22e43037dd4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'b781923a-fbb7-4bce-bb59-6db7c94f7760',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'dd7c11eb-8630-4d1e-9828-44fae345d464',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:24 GMT'
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
  'd651b870-359a-47ca-9057-38145effe400',
  'x-ms-ests-server',
  '2.1.11328.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvPl4cZ_mvJMk8oQAm5ixzFz_bg1AwAAACNOdNcOAAAA; expires=Thu, 21-Jan-2021 20:30:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:30:26 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '1de3ee55-9aee-4619-a44a-d7a834242a91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '1b2de6ff-d91b-4f6f-888d-aed3c9e31b38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '3eb8ac1e-8475-4e0c-b4d5-791aa595da6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'e9ec0bf7-1bac-4eda-83cd-6f564655e090',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '82ed0b6e-020d-400b-8907-a72be8bbcd65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'e69d10f8-6a02-41b1-9b10-99e8f1e2e7a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:29:25.7543717Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '27fd938a-06e8-454c-b498-76ecd8787d54',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"ef779168-a5e3-4c68-a85e-3491ac6109ef_637441920000000000","lastUpdateDateTime":"2020-12-22T20:29:25Z","createdDateTime":"2020-12-22T20:29:24Z","expirationDateTime":"2020-12-23T20:29:24Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:29:25Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:29:25.7543717Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'd238b376-9710-410c-b22b-b02802f08d2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:30:38 GMT'
]);

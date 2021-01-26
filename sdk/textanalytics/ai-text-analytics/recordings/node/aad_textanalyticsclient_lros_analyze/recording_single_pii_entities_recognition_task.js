let nock = require('nock');

module.exports.hash = "ebdc6fc366816bcb9ac9d4c8c3a3385c";

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
  '377cc5df-d482-4a09-a97c-decb65c8d700',
  'x-ms-ests-server',
  '2.1.11328.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsVDP-xF_c9CnlBsA1jeqvxz_bg1AQAAAARKdNcOAAAA; expires=Thu, 21-Jan-2021 20:11:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:11:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000',
  'x-envoy-upstream-service-time',
  '493',
  'apim-request-id',
  '0f6fa0bf-11e5-4496-8633-40f26626b727',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:48Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:48Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '0470b270-165f-476c-b127-8516c57c388b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:48Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:48Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'eb65b1e8-8950-4994-a637-4a75d03c0c86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '45f1c046-4a23-467b-b76a-efa1e661a4d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '2d467204-e09e-4089-99fd-1ecfe997959a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '5020c889-5c87-4218-a3f6-81d5e293fb6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '19a08186-b63b-477c-9403-7a117ecbb8a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '485b2164-3ebd-4784-900f-37a10b93d137',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:11:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'ce17f7d4-f67a-4dec-a2b9-cc8c812cc019',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'a6311aad-ffc7-4ea7-9540-4415772c56b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '651d3c81-d32c-401b-9548-da635b82e414',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  'c9d14d17-78a6-48b2-85aa-6e65514d7096',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '65e9dcdf-e482-455d-804b-e9e532620923',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '5ca14cb3-377a-4ada-9b47-619cc9017e6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '47817c79-645c-4c0a-9774-e8bdb3445ab9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '600b0048-9783-4670-a713-bbf338f53e75',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'a9544021-e7a4-4920-b81d-23f991c8f363',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:18 GMT'
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
  '02b29bf6-c515-4283-b426-50332f29f300',
  'x-ms-ests-server',
  '2.1.11328.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AsVDP-xF_c9CnlBsA1jeqvxz_bg1AQAAAARKdNcOAAAA; expires=Thu, 21-Jan-2021 20:12:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:12:18 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '4ecaa636-82ff-4001-9f00-e6d8fd931f6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '167b01ee-7642-474d-846f-5f76d454c2b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'fabfd86c-3fac-4363-91d8-c8825d353fa9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '5797c68f-2de0-4aa9-840c-0594e3e0ca4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '4e7f8437-f148-4101-9ba9-d0af92ac3f8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'f8af7c85-6f4e-468f-8dbf-a1629df03c68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '780683d2-52e1-438e-8a52-0142061ccd8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'f47dc3da-579a-437f-b67f-04a6d0dd36d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'cb44285f-2c88-4f18-995a-a020a074f711',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'b86e44b0-3231-4210-b4df-2b78a79877d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '4b54be00-83b2-4260-9664-405de8f2369f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '746bce86-9b6f-43b6-996b-f18d2d5e5fba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '84dc5337-84e7-412a-961e-0be9fe8ddaef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'f69c4de3-1577-41be-a53a-c8eab48019a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:47 GMT'
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
  '15f57cb6-90be-47e9-932d-bb6bf0cbdf00',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AsVDP-xF_c9CnlBsA1jeqvxz_bg1AQAAAARKdNcOAAAA; expires=Thu, 21-Jan-2021 20:12:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:12:50 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'ccf499cc-d48e-44e3-9ef8-ae91f03a327a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'fd43cd55-03ef-4112-9003-ecf57ff52f35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '6e6a610e-9417-4bcb-87d9-9614c634aa40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '6916e6bc-8174-41c2-b013-fe0aaeb77d4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '783240f6-1f80-42fc-b644-3752d2d22179',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:12:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'ce7d23b2-0e7a-4386-8ce2-6302c21ff64f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '8f9121a7-9d0a-418a-90a3-5763aefded94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '0c861b2b-e442-4fe3-8449-a2313bd116f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'fb61eaba-2de4-46e6-b2fc-56d358d5f54e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '2a589383-047d-4649-b69b-b6411f8167da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'b74b7a41-83a1-4f49-aa9e-77fb04adaa52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '6514c518-665b-437d-ba10-a56adc7337ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '97eef29f-102f-47a5-8822-1694daa6c28b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '482366a7-937a-4a9f-9aa9-347589349f2f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '327c1bd5-d383-4296-a513-a51179629feb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:19 GMT'
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
  '5c9bc70a-025d-444f-ad87-02780507a000',
  'x-ms-ests-server',
  '2.1.11328.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AsVDP-xF_c9CnlBsA1jeqvxz_bg1AQAAAARKdNcOAAAA; expires=Thu, 21-Jan-2021 20:13:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:13:21 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '2af06857-05e2-4971-a4b9-dc029b7b8805',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '1a879a0a-45b8-422e-8f1d-8391b4cdbbf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '9811158e-48de-4de5-b67c-6109f44baeb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'eb597057-392e-4043-9dfa-32a19a880c2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '901ee7a0-2089-4626-a8b8-05face418fc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '8217e56b-1922-4179-a020-33762a1b83cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '78c78cbd-6348-426a-8851-49b61275aafd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '0f43e098-757b-49e3-9643-2c8a5b117ca0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'd582537b-063c-49eb-a923-70f3fe16e0fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '8107922d-16c3-42c9-b10c-705cb937f199',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '66215280-5f86-4bb5-9acb-7d1e45925a84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '68397231-0e99-4cbc-8996-bdf029d05159',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '20456d32-4fb3-47d3-bf28-7e9571ebec12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'ba72cd8d-4371-401e-9ce5-23143e39455b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '2c4f734b-e974-4f15-82ab-65dbddd5bc39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:50 GMT'
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
  '082ffc23-38db-42b6-ba25-9485fe209a00',
  'x-ms-ests-server',
  '2.1.11328.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsVDP-xF_c9CnlBsA1jeqvxz_bg1AQAAAARKdNcOAAAA; expires=Thu, 21-Jan-2021 20:13:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 22 Dec 2020 20:13:53 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:11:49.4643567Z","results":{"inTerminalState":true,"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"Phone Number","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABA Routing Number","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"New Zealand Social Welfare Number","offset":18,"length":9,"confidenceScore":0.65},{"text":"111000025","category":"Portugal Tax Identification Number","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is ************** your Brazilian CPF number?","id":"3","entities":[{"text":"998.214.865-68","category":"Brazil CPF Number","offset":3,"length":14,"confidenceScore":0.85}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  'ec4a63f3-d744-43bf-9cfa-144d19b37422',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000')
  .query(true)
  .reply(200, {"jobId":"cfbd1388-fa98-4582-a1e7-8712055f5912_637441920000000000","lastUpdateDateTime":"2020-12-22T20:11:49Z","createdDateTime":"2020-12-22T20:11:48Z","expirationDateTime":"2020-12-23T20:11:48Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-22T20:11:49Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-22T20:11:49.4643567Z","results":{"inTerminalState":true,"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"U.S. Social Security Number (SSN)","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"Phone Number","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABA Routing Number","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"New Zealand Social Welfare Number","offset":18,"length":9,"confidenceScore":0.65},{"text":"111000025","category":"Portugal Tax Identification Number","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is ************** your Brazilian CPF number?","id":"3","entities":[{"text":"998.214.865-68","category":"Brazil CPF Number","offset":3,"length":14,"confidenceScore":0.85}],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'af64aae7-8d35-4dd4-85d7-5b70fae5262c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:13:53 GMT'
]);

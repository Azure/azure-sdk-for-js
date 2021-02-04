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
  'c1fb9557-1c37-4dfc-b79a-f3ea41316a00',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AqD60g0u_w1OvLBdt9UDxm9z_bg1AQAAABKwftcOAAAA; expires=Fri, 29-Jan-2021 17:29:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:29:55 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000',
  'x-envoy-upstream-service-time',
  '730',
  'apim-request-id',
  'cb9e5ac5-c403-4b30-ba49-ef488d6bc027',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:55Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:55Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '331',
  'apim-request-id',
  '40f33a1b-afac-4984-a417-60e0ba87579a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:55Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:55Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '361ffdcd-6e4f-4df8-bc14-5c16da45cbc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '194',
  'apim-request-id',
  '8b32d682-3d6b-432a-814f-ed117ed59706',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '438',
  'apim-request-id',
  '16c48a8c-d457-448f-ae6f-6b35abeb9fcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '06ab001c-1f26-4a06-9f2a-3fcb7b69314d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '24289f99-668c-4eb5-90c1-f3b8f413f655',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '160',
  'apim-request-id',
  'b9473374-5c60-4fc9-ab90-59eac43c193c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '246',
  'apim-request-id',
  'e2de96e9-cf8d-43f6-ae13-c356c5a6c5ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '22150918-dbce-4ae7-b03b-02b450bc4289',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '7be558a7-95cb-41b7-8908-0ba92ebe202f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'a7cee1df-0818-4dc2-94dd-d3f82825a874',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'd046d00c-8f33-4553-bdb0-3f7db3cce646',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '365',
  'apim-request-id',
  '65e2f675-fa8e-4e5b-9cb2-a3b4c2ef7a10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'a9d096a8-2f98-4713-9cb9-91ba640d8749',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:22 GMT'
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
  '21255fc2-dbf7-4e38-83d6-77b1c6ef6c00',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqD60g0u_w1OvLBdt9UDxm9z_bg1AQAAABKwftcOAAAA; expires=Fri, 29-Jan-2021 17:30:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:30:25 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  'f467568e-1666-4014-9d36-6aeb8f0d808e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '846198db-cef8-416c-af0e-05ebf6a8de2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '597d6947-023f-406e-95bf-88767848afbd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'a63179c3-8a90-4753-93b3-37bf0d1d9c46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'b5cd6bd7-bbf9-4500-a63d-96ec567672d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '8da7317a-92d0-43ae-8bdb-761a32bfea88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'bc596da8-2f3b-4d4a-9947-8365a97b2477',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'e3ad5090-da63-442e-81ff-65880e7ecc83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '33c6698b-696f-43c6-9403-3633e6bc0c76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  'e1a08e1d-8a46-4dcc-a815-9580da9931cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '62b5b07e-deb5-45fa-b645-c225335658d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'd95a471c-82b1-45a0-95fe-1d99610da10d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'c588561f-9377-40d2-9620-7e67ff2e6503',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'df5b597d-00ae-466c-93af-da20ecbf74ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '5ceb3a3d-1b94-46dc-b01f-07b73a5e6b70',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:55 GMT'
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
  '18817caf-7482-4aee-83cb-bd538bce6f00',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AqD60g0u_w1OvLBdt9UDxm9z_bg1AQAAABKwftcOAAAA; expires=Fri, 29-Jan-2021 17:30:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:30:57 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '9f2cdca1-98fa-4c9c-8ade-76a05a17056b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '599079b3-219d-4765-a75c-b79714cec643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:30:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'b87b9c37-693b-434a-89cc-89964b7c201b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'eb5eb133-ce2b-47de-a1e8-95f7c3ed01ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '566a0eb8-029b-4474-a445-fe6d0dca48e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'c52db98d-82a6-41ba-b9ac-4fc74b2a880e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:29:57.1733034Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.86},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.82},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '26bfa627-6544-4b9f-924c-2fde7ec3adb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"0dbe95e1-1d6d-4f97-9e06-02ebb7117039_637448832000000000","lastUpdateDateTime":"2020-12-30T17:29:57Z","createdDateTime":"2020-12-30T17:29:55Z","expirationDateTime":"2020-12-31T17:29:55Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:29:57Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2020-12-30T17:29:57.1733034Z","results":{"inTerminalState":true,"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.82},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.84},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.89}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.86},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":0.82},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.75}],"warnings":[]}],"errors":[],"modelVersion":"2020-04-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '245',
  'apim-request-id',
  'b2979cfe-f6ed-4c56-9658-1a0830e5a6e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:31:10 GMT'
]);

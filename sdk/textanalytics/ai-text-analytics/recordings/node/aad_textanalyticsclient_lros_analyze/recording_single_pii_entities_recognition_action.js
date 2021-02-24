let nock = require('nock');

module.exports.hash = "ec6bb31f1352749827a96f68b96d168b";

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
  '05d34d3c-f218-4aa7-ad05-cc70b6af1200',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EQAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:38:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:38:40 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '1abed6e6-af2d-40d5-afbe-6bfb1874cb8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:40Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:40Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '9a7d5f85-70ee-4d08-8dfe-dc6cd15988b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:40Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:40Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '01683b31-240f-48e6-ade3-5a34d5e15828',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '228',
  'apim-request-id',
  '373198a4-e808-41cb-a57c-2a27c78fa110',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'ea4e75ca-08e8-4d1c-8e25-43fb356a0603',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '993e8a11-efa9-4f1c-b33e-9dec47ae17d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '71c7c8bf-ff4c-492e-9c6b-2faadfb56ca5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '87faad3f-56f8-4ba4-b974-e4b2f81796d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '720e8bc4-79f0-4505-bef9-de720ed9a30a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '7a10e4cc-c64f-4c82-9b64-e0b671587cc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '508',
  'apim-request-id',
  '198f1ba1-bba5-486a-937c-13cba3068435',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '58e4e650-b615-4491-930e-bb16be75664f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '8b1e7054-9836-4ec0-8676-9f7e04f829ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'cc199d5d-8dc2-43bb-bfff-70b6a25f6c23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '046eb5eb-2f02-4bf4-97a4-67605d611f92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '900ce51d-b0ae-4e46-a310-afbf13dfcf93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:08 GMT'
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
  '7439fb7e-2e9c-47dc-a95a-aecfcf1d1800',
  'x-ms-ests-server',
  '2.1.11513.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EQAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:39:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:39:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '239bc717-e406-4e50-8975-d4306ac12464',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'd6a77010-4c94-4c4b-a818-89f524ddb379',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '9733cef7-fadd-4fa6-a906-f55b9149a37a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  '3cb65d4b-bd4c-41ca-be84-269c7137150b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '4f3c1283-d2cc-4f05-8d3e-0fba3d0b13cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '2d9d5d30-a5e9-40c6-b507-ca8ba1620336',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  'f8c3b60b-4a62-41f5-aff8-954a7e41a397',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '0a435d79-5064-4dcd-a13f-83bdcca0c829',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'a4701927-b963-4906-907d-e602e4923223',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '4e88c50b-a27d-466f-a960-87ab6958292b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '7244de0e-53a8-43d8-be91-abf7680204b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'efa89065-9267-490d-a71c-ccc58f521409',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'c4a7503c-f8dd-4f58-926f-5bf7633251db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'dd483517-f799-49f6-9ebc-3aea362681de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '738c6af2-a15c-4650-8f86-08d7d823580c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:39 GMT'
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
  '2620474d-e76b-40be-8b7c-6955a0b51100',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EQAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:39:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:39:42 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '93b9103d-8957-4f92-baa2-f83505145bc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '330',
  'apim-request-id',
  '7b53f958-2340-4f90-8905-03ed55d28420',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '9b185fc8-3692-4884-9075-629953f6f6a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '539',
  'apim-request-id',
  '42c15f22-34f2-43a8-be4f-3ac36b82254f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '7ffed046-14d2-41f2-83ac-5887f28b4389',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '5cec51d3-3a8c-44b3-a9ab-b77b55794271',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '316f11a9-d652-43ab-bb58-434e6bb0f260',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'cd6d8050-5858-4f96-be11-83e09ef8eb25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:39:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '00e2c0fa-9dc6-4469-b6a1-d340023d69f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '6b31dbe3-3d10-4887-8db7-c37b8a721108',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '2c4f478f-c442-4174-8322-c90540e603c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'c4df73a7-df1e-486f-ba00-25f2221ee3e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '95836c3d-6856-4abc-a2f0-e5de838fc30c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'cd70a1aa-bad4-47e5-8127-52c9002b86a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:10 GMT'
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
  '38791ae6-cb09-41d3-8ab8-ad19d7171500',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EQAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:40:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:40:12 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '16a9727f-cc62-48f1-9885-fbe78172538d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '43940674-1f92-4300-aace-60881f005462',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '278',
  'apim-request-id',
  '40860ef9-7f67-4468-a16c-3c9571e35bdf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '050adfcd-4eec-40c5-99eb-99391032bbee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'b7cc65ff-fc8f-4b19-80b9-0ddb17d4deb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '206346c5-f7bf-4e2d-83e9-187a5164915a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '253654d0-cb19-46d4-9465-1f080be2c6d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '1bb9545e-eb83-4f76-9030-7fe204abfc16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '440c7e8d-e7cf-4117-a111-30a171344dc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'f69a6253-e0a5-49a9-a7c5-8474407346bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '3d50f1b5-3acd-43ff-b28a-2a168ff38966',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '288e66fb-fe52-4785-a35a-d70f516de252',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '6081e716-b826-455e-a73f-0f22c4e681ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '50ce1f6c-f443-4f7c-830d-24781165564e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '6bd18c69-e266-4e28-993a-49b97b80c9c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:42 GMT'
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
  '4f39218a-f2c1-4296-9b0e-5202b82c1300',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EQAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:40:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:40:44 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '6597c594-aaf0-4a48-b111-ba66e103287c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:38:41.5887577Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '455',
  'apim-request-id',
  'a3ffe554-e131-405e-94c1-bcc9f99edeb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/2fecc115-9e84-4501-a983-6d0aa11fbdfb')
  .query(true)
  .reply(200, {"jobId":"2fecc115-9e84-4501-a983-6d0aa11fbdfb","lastUpdateDateTime":"2021-02-23T19:38:41Z","createdDateTime":"2021-02-23T19:38:40Z","expirationDateTime":"2021-02-24T19:38:40Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:38:41Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:38:41.5887577Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  'd35673e2-8380-49dd-ab23-eaf08c2d5020',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:40:47 GMT'
]);

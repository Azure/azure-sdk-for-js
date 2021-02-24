let nock = require('nock');

module.exports.hash = "e93a2f532d1ed856cf5a797a648b9d79";

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
  '6c43895e-f811-408c-bcba-56ffa08a1400',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DAAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:56:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:56:36 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]},"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  'f5d0e3a9-614a-419a-b1af-a745ba63f39f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:36Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:36Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '4403d915-2712-448e-9c94-4a4e8d37e0e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:36Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:36Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'dbd740f3-0443-4710-af2e-002aa05e231b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '3c893666-93ab-4970-8942-734307334784',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '72a1f89d-d246-4bb0-b88d-754c494f7e8a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '1319a2a2-7685-4ad3-b89d-240daf45e75e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '693f078f-1039-48c4-85a4-e2143c5b8532',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '9490cda9-e87b-4e26-963c-c2ea97bc2e65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '646aba2f-d8c0-4758-a0d0-dc6181e5b9cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '3dc2d88e-a5fe-4fdb-90e6-7c076b84e65f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '7ec82f8c-3553-418d-9e4f-2f0f2f40f958',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '440',
  'apim-request-id',
  '2fe60241-bfdd-4906-8a7a-20a3d37032a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '78ca2175-54b4-47eb-9119-cc5870c18bfd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '46342f25-2a36-462d-8e2e-9e708675bb78',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '867d0df4-652d-4104-b3e6-2df66027b04b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '293',
  'apim-request-id',
  'a34309f1-dffa-4b90-8d9c-22d7b5f4362e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:04 GMT'
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
  '5d553547-1547-4b42-9e1f-e762863f1300',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DAAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:57:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:57:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '307',
  'apim-request-id',
  'c06b442c-770c-4fd3-81dd-cd824c4aa678',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '66f05eab-d3b7-4ee9-afef-3683fc619be1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'aa349551-9b6a-45c3-9590-4135e50f09c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '5a69f58c-55c6-4126-a6ee-fee4bc74e92e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '6432930e-4ee9-4eb1-bde9-38018bd67f77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '6c8c2704-7a15-4a0b-8084-5e1b7a305e97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'd4190670-9e10-496d-964b-bc9ab02091d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '28c86256-d2de-44f5-812c-0818a6da016e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '7195b3f2-3c6d-4ee9-92ca-ebd1e7ed4ce8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'c60f2112-155c-4bc1-b4a5-e5785c55a593',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'ab8e0ec0-a647-4565-a5ad-def71e92ac85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '9c2be843-e7af-4c65-b520-3a90deff15e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '9fbddc21-12f0-432f-8c40-05bc82694170',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'eb3c1d09-fe0f-465b-b52e-c1ad0c6ca633',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '5b2b83e2-d146-4a37-9c5b-ef8233c8a393',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:36 GMT'
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
  '6c43895e-f811-408c-bcba-56ff5c961400',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DAAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:57:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:57:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '838c033e-d240-49eb-92c6-96b60325f7b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'ebd2aaf9-b624-4ec4-a07d-23d416084663',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '585e33da-a5ab-44d8-94f7-c8566f43049b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '7c2a7ea8-d520-47b1-b404-e3094c649e48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '4495e929-aec0-44e6-a5be-c1678dac7c19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '5d420438-a594-4057-917c-5da9050b8180',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '57670c31-73ee-4c99-a0cd-58d47280232c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '302',
  'apim-request-id',
  '8b40bed8-f105-4ca4-b3c4-e5ab6effdce2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '216bfcf1-c72b-435c-a805-dbad4b17a5aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '72575246-b1c7-4587-8a4e-e4b17a0e6f40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '00a6af80-1db6-4d65-b2fa-a8a30895b231',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:57:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'd073e876-f6d9-40e9-a9a8-e2cec5d851d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '0dbf807c-aa77-4b90-a71b-388b2279e0a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '2f5f8646-ccc8-4178-bf7e-7d452b868ddd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '6da25295-b9eb-4593-bdcb-7edc32706752',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:08 GMT'
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
  'bed86653-d10d-400b-b7c4-538c0e7c1500',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DAAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:58:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:58:09 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '4b45bf30-146e-4fb3-a2e8-32bd82765fe5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '257c29b7-c56f-4615-bfcb-47a1ac12ba8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '3ca0f924-8265-49aa-929b-706f328f0bb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'eb28bd4b-3038-4d40-a981-17b116e00f4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '568e1c73-b25d-41f9-bda1-48ae0b1d2a8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  '7fb21bef-434b-4ef2-96cf-c39f8a43c952',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '462ba6a2-e3d1-47e9-888d-b9d3988e08ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '6187658a-c1b3-4be2-8006-59c888940160',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '53839e4d-d464-4f06-a3a7-86dbc4d7100a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '3acb3c57-4a25-4b08-bc20-563f8d1dbf7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '3f933ec4-8534-4a4c-9a18-fc78d56df789',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'b3e401ac-5bb5-421b-9b1c-ecde6147348f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '459',
  'apim-request-id',
  'b2972e28-29a9-4e2a-85f8-52057b8e6de5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '8b73aff3-3d20-437f-b462-dd872059157a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:37 GMT'
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
  'bed86653-d10d-400b-b7c4-538c20821500',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DAAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:58:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:58:39 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '312bd22f-cde1-4c72-a069-f3d861a18643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:56:37.153188Z","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '6ab1f33e-d464-4df4-8580-fae366510518',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/a4f59f71-41af-4f76-bb21-bfafcc0fc563')
  .query(true)
  .reply(200, {"jobId":"a4f59f71-41af-4f76-bb21-bfafcc0fc563","lastUpdateDateTime":"2021-02-23T19:56:37Z","createdDateTime":"2021-02-23T19:56:36Z","expirationDateTime":"2021-02-24T19:56:36Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:56:37Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:56:37.153188Z","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'dbba5324-91e0-4856-9967-9dee67fe8995',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:58:42 GMT'
]);

let nock = require('nock');

module.exports.hash = "7b6d6a579a71ca7a5c79151e7ea04a90";

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
  'cfa7c857-928f-4a0d-a44b-e4f9c2861700',
  'x-ms-ests-server',
  '2.1.11513.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EAAAAJtTx9cOAAAA; expires=Thu, 25-Mar-2021 19:55:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:55:26 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '05dec94e-e03a-4de6-adf6-c613b2aa830b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:27Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:27Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'cc433eff-4b14-4f03-b305-7e3c9435c803',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:27Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:27Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '549925f7-a834-4a08-88a4-9ebaa71ac336',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '8e5e0b56-0577-436b-87e5-732bb8687d42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '7d0491ad-ba36-40d0-b12c-bcdc7c27c893',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'd295480e-7924-4bbc-a441-a6b2d8abdf5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '349',
  'apim-request-id',
  'faf50869-9c27-4361-8eae-b931317af394',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '30766e53-f388-4323-822b-adabe4e53f2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'd3a1c027-c956-4c1b-bfcc-cf7c8a41d610',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '901fcd5d-e16f-455a-a837-d2e383eb78a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '1c30a81c-fbb8-4b79-b0fe-0dc6ad3cf39a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'fd00074b-03f6-4f76-b2a6-9d9bb7ba4668',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'ff79fedd-0b54-4408-ad66-d01352faed32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '07589ca9-6e2f-4886-9eaf-36445126dd4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '57b3290f-b6e0-4f64-b8bd-b8898d630328',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '446',
  'apim-request-id',
  '85e9d060-5ecb-4000-8b40-4a1af75c6129',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'f96aefa0-c3ca-43e1-be30-165ecdb5897c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:57 GMT'
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
  '6c43895e-f811-408c-bcba-56ff64831400',
  'x-ms-ests-server',
  '2.1.11513.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DAAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:55:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:55:57 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '30957732-ed6a-4b10-a23c-c7c29bdd8ba2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:55:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'ea477086-4a85-4e8d-8db9-fb76e8c0c427',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '13267606-a6a5-4df6-9747-1d86e666a950',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'b8615fef-6c3a-4e39-b2e1-112e6d4a0898',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '8979eca6-8699-4c33-a8c0-c2374749da8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '60c55599-a8bc-4e85-b19d-8df9203d815d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '70856daf-bd03-4d29-8cb7-5f7563751e13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '939',
  'apim-request-id',
  '8b958a36-0e89-430c-96d2-a61adea69473',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '91acd622-852e-4121-8a41-fb9beeae76ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  'd3b2307b-1af2-4df3-a351-9be5eefcc45d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '605',
  'apim-request-id',
  'ba05c078-97f7-4977-8b9f-14a9f74d8339',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '37e0a639-07b7-48dc-9c65-4eadeb570105',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:25 GMT'
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
  '60b46c3f-9a86-442a-9947-a09b9f901800',
  'x-ms-ests-server',
  '2.1.11513.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1DAAAAMdUx9cOAAAA; expires=Thu, 25-Mar-2021 19:56:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:56:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'c454c491-2f5f-4a1f-bf22-56c035bf4dca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '198bdf5d-55aa-4214-9e07-11990dbca1b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '3c6a9339-873c-4622-b1bc-23b67b84025f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '28d7334f-fe36-4ce6-aaea-ea2f1c60c847',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/9366b7a9-560b-408f-972b-8c1b88d39c7e')
  .query(true)
  .reply(200, {"jobId":"9366b7a9-560b-408f-972b-8c1b88d39c7e","lastUpdateDateTime":"2021-02-23T19:55:28Z","createdDateTime":"2021-02-23T19:55:27Z","expirationDateTime":"2021-02-24T19:55:27Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:55:28Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T19:55:28.415581Z","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '3eae9bc0-a164-4771-8257-3a558954763f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:56:35 GMT'
]);

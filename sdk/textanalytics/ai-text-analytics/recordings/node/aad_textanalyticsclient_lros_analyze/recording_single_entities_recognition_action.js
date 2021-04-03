let nock = require('nock');

module.exports.hash = "c686773b099b6fa962ac83db7f0aaaa2";

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
  '38791ae6-cb09-41d3-8ab8-ad1952f91400',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EAAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:37:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:37:30 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.","language":"es"},{"id":"3","text":"Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.","language":"de"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  '71ceef61-88ac-4e36-8e1a-01c9a459cb49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:30Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:30Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '28ff3f17-8156-4361-88ff-7aff226d57a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:30Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:30Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '496f08b1-5631-4fab-a9e3-88ddc937726b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '206a3dd5-d337-43e8-a80c-03878760cf2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'ca572915-7489-4b29-8765-20e167782a43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'c5d4484c-c40b-4ca6-9a2c-bfaabe784018',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '6fc96d84-06f4-4acb-b585-b23cf37c0d2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '1a14f8f1-1d02-4281-8af5-4aedf8a5e55e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '197f8741-ee68-4da7-bd3e-17024e1e62f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '1877a0de-fedd-4d48-9c1d-b094acbb2d88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '05ef41a4-83ef-4e3d-9659-2dafe7607a30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '97aef8f1-1839-41d3-bfff-d44d751bc120',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '4ed9ae70-7620-44d4-bded-3b5a28f2db91',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '2c9cf3b9-fcfb-470e-9863-64415f0fb0f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '2fdfd1ea-5ed7-4a55-bc1f-87465480b562',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'b70b8b94-ced8-4f53-b3c6-5fd34809c22e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'c19896f1-0f61-4e11-84dd-1f741eb0e194',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:37:59 GMT'
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
  '85d060cf-ada7-485b-b965-3861a9871300',
  'x-ms-ests-server',
  '2.1.11513.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EAAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:38:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:38:01 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'f74e70b4-a37a-4b8f-b147-33dd004ff610',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'd8a844e7-f9d5-4534-8594-b2f78b7e680e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '1a71125f-2927-4e14-b8a5-470b600b94ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'f7e072c2-7ae8-46d9-87f1-883211547e90',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '562f2b91-8967-41b4-99a5-3d956d484c0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'afb2a026-8d71-455a-9c49-ca92cb5e3f8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'c52bfcb2-6a55-4156-8fa2-b8490a047d81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'a83a50b7-7001-4b6a-8124-17f173e6c42a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'dd04aaa0-43a6-4438-96e4-cab2884eb14c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '3ef4fae1-eefe-497f-b3cc-879b0f324a36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '540d2f7a-c7bb-4209-8802-77e458bec925',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '218d8a63-257d-4411-b58a-c392dcf45799',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '518',
  'apim-request-id',
  'ec7c11a2-2595-4881-b01b-d6c3afe55201',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'b1e093e3-d6d5-47ab-8b2d-db634f7cfef9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:29 GMT'
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
  'cd73eda8-5cdb-403b-84f6-290cdcf11400',
  'x-ms-ests-server',
  '2.1.11513.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjD5-380YexHjqzsgRoIFGNz_bg1EQAAABdQx9cOAAAA; expires=Thu, 25-Mar-2021 19:38:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 19:38:32 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '332',
  'apim-request-id',
  'ecb6f42c-21a2-4fe0-ade3-43b5f8a20f26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '814',
  'apim-request-id',
  'e2c1b095-952d-4e28-9c0e-ae77501636b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '3e2e4bb7-14c7-49cf-a109-3eced0c843d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:37:31.5740048Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'aa5fd385-2e48-4109-a0f7-26724d20f03a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/6c687c1c-261e-4029-97b6-909037b903a4')
  .query(true)
  .reply(200, {"jobId":"6c687c1c-261e-4029-97b6-909037b903a4","lastUpdateDateTime":"2021-02-23T19:37:31Z","createdDateTime":"2021-02-23T19:37:30Z","expirationDateTime":"2021-02-24T19:37:30Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T19:37:31Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-02-23T19:37:31.5740048Z","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.96},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":0.99},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":0.99},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":0.97},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '711',
  'apim-request-id',
  '3b34b6ba-4f3b-4cde-9e41-f11ac5e1730c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:38:40 GMT'
]);

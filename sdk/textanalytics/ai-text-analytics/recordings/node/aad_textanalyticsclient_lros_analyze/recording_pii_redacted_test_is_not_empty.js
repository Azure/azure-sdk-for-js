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
  '918777bc-738a-4c3d-bb77-c043f0687000',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoyltyCYCABGgI0S3ELHV11z_bg1AQAAAIO0ftcOAAAA; expires=Fri, 29-Jan-2021 17:48:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:48:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000',
  'x-envoy-upstream-service-time',
  '594',
  'apim-request-id',
  'dc2c7118-4461-43cf-b617-4ae9a9c12b06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:52Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:52Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'fd2cd599-c84f-4c97-89df-92d384f8a16a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:52Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:52Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'f439d683-1ebb-4df1-b39a-dbbfdbc32e1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'e20f3cb2-13a2-465f-a7a7-4a807cde5ae7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '9141082a-05e4-4547-b5f6-7fba64df9d3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '3210a1b2-e2e8-42ad-988a-dfd292e2f7bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:48:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '418c85d4-4180-4261-8283-bb0efdbaf8b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'bf0afd53-93f6-4d0a-a26c-a0d0072e7643',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'c8a47349-b49c-4ff2-96d5-18796a8607f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'c2509204-e7d9-4f6a-9f3b-e545a7d8f85e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '4e5d0e9a-b9b2-4036-a1a7-6e16e150a764',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '754399b5-4842-447f-9c86-fe4df32ff764',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '1dfb261b-809e-4c61-b339-27e31692f780',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'dabfdc30-83e2-48d1-8f7c-a9fe4b1a8414',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '93ff9d31-b38c-4228-9274-d7e1c89f9f86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'c7332c9f-65de-4dc0-9930-8d5bf511c5eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:20 GMT'
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
  '1f7368c1-724a-46c8-8d10-3a06bed97800',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoyltyCYCABGgI0S3ELHV11z_bg1AgAAAIO0ftcOAAAA; expires=Fri, 29-Jan-2021 17:49:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:49:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'f1562656-965f-4055-b6f5-c599d7977c00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '96ad7bff-929f-43b4-a4a4-a7ee6bdab9c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '6cac01b0-1cf1-41f4-95f0-41eaa1d647dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'e6867e90-a1bc-4e58-ad5e-75b957564a29',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'a18dc879-1e12-45c6-b743-996eed07272a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '341f55f2-e845-44db-b7b8-27a57b557b42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'b3e20dc7-432e-4e67-8d66-d95d4e3cf594',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'b5ac0503-5a6d-460c-a42f-456089d8201d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '61331cee-2592-448f-b258-91c923609203',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  'faab3ff0-5a4d-441e-94e7-f2d0c13113c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '3a7a029c-25fe-4f20-87bd-b6f3c2efb710',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '25fd004f-f347-418a-a0f7-5e0bb498ecb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'eb709de3-3d60-4eff-80ad-cffc1d0f7cf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'fe7de44d-4d53-4a29-b173-d518f3cc6af8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '0e1756ee-5aef-4b07-af2f-64d4249a0273',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:52 GMT'
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
  'f46eb0e9-f0c2-4a34-af3c-9beee39f6f00',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoyltyCYCABGgI0S3ELHV11z_bg1AwAAAIO0ftcOAAAA; expires=Fri, 29-Jan-2021 17:49:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:49:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '7e13cb51-1b8d-488e-b6db-c0642756d40d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '3fa127fd-3281-4296-9e95-70e23016a2d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '95b1ceb1-335b-49d5-bd23-559f65f1d4c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:49:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '91b6291c-42fa-4e6b-b554-e5e25aa30c96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'ca149579-d339-4b34-90b3-1b562eda4878',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '6f69380a-6b8a-432a-8d3d-a0fba24278d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '20c86bca-26b0-4520-81e3-e45fa925108d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '1f976df2-6629-4338-8bce-ae5e7ae5554b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'eb3de5b5-d271-4517-ae69-5ae21e0d6c13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '7730cbbe-a6a0-4a6f-95eb-7727cf8a2070',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '6781a003-5e07-4cc0-b617-8ebf0e4142b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '1daed277-7c11-4ad5-b337-e700cad9a824',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '92d013e2-bdf6-4490-8afa-b38729a5acb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '9d840d8b-8bf9-43be-8f35-b3b9685d8037',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'ed370c17-b6ee-406e-8481-66cba6a04bb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '70fbe2af-d397-4212-8b1b-cab330c82fa7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:26 GMT'
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
  'c3feadce-e7ee-416b-895d-0321ad9d7400',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoyltyCYCABGgI0S3ELHV11z_bg1BAAAAIO0ftcOAAAA; expires=Fri, 29-Jan-2021 17:50:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:50:26 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '8f41f4a6-1484-442b-83f2-3336c05cd20a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'b7902a73-a8cb-41bd-bfef-1227d8f27385',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '93013ae1-1b6e-4ee4-b0bf-e48801a98fbd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '4b81f9ed-1a93-4f9a-b495-1de9699ec265',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'f48abadf-a706-4661-b043-532e827bc67a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '2aba14fc-06f7-4cd1-a60f-80812b26d2be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'ee1c6cb2-9080-4bb2-ac93-5f7e520bd41b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'aab582d6-87a0-4a73-817d-e7e485c6b98e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '82080c3b-4ce2-4e6b-98c7-fe69fdab2830',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'b56f792b-e80c-455f-9b2d-d76c59786649',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '1705bf6e-1c43-4821-bbb0-a7798761cbad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'fe2bcdb6-49e9-42c8-836c-135bbc9607fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'fb79d46c-39c6-4ffc-b85c-a5d8bb7c107b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'ec3edcbe-1b39-42f4-880e-50862464b7b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '08ef1f5d-8bc6-45e6-a1f2-a553acd83eab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:56 GMT'
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
  'ed5ac0c3-07d5-4153-9a78-fd34aab17200',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoyltyCYCABGgI0S3ELHV11z_bg1BQAAAIO0ftcOAAAA; expires=Fri, 29-Jan-2021 17:50:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:50:57 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '81444078-e080-4255-8928-def7de530d5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:50:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:48:53.5479062Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '383',
  'apim-request-id',
  'b141aa0d-3658-406f-ac69-c184d5e6dfd6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000')
  .query(true)
  .reply(200, {"jobId":"3abe6b83-e321-4e4b-93bb-1f1d56fd07f5_637448832000000000","lastUpdateDateTime":"2020-12-30T17:48:53Z","createdDateTime":"2020-12-30T17:48:52Z","expirationDateTime":"2020-12-31T17:48:52Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2020-12-30T17:48:53Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2020-12-30T17:48:53.5479062Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '01a5f2c8-10ef-4b58-9f7c-0a321dad64dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:02 GMT'
]);

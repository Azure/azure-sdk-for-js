let nock = require('nock');

module.exports.hash = "f7498d74f6f9a29ceccde964fe73a18a";

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
  '081cef05-c70d-44ca-afc1-d9681f5d6800',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkSc7To3y3FAhJvGl0R6K7pz_bg1AQAAAAa1ftcOAAAA; expires=Fri, 29-Jan-2021 17:51:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:51:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/analyze', {"displayName":"testJob","tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000',
  'x-envoy-upstream-service-time',
  '393',
  'apim-request-id',
  'e0dbccb2-8289-4811-81b9-39102fbe469c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:03Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"notStarted","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:03Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '599684b1-eb62-4c1f-b2ef-72fd0b684437',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:03Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"notStarted","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:03Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '92b54b54-43cd-4010-9a2f-1b9226961029',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '67a3db34-de0e-4163-8809-a06c9b2b1998',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '070e28de-7a58-449d-99f3-4a33e2e1af74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'dfd3d016-dd6c-4b1f-8e2f-9d265d072082',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '4d4bcc97-d998-4c83-bd7c-0eb28671f2ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'f48807e4-3aec-41a4-acd5-f7764ac3b359',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '82267d4d-78ba-4d9b-a881-b0c24ff2ffa4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '03fccc6e-68d1-490c-97a4-ae443575fc4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '51390e31-30ff-42c2-a7c8-6f718e87221b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '1e186c73-d943-41d5-ab79-129c01659df2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '6e35b5f7-553f-4f0d-b8d7-a820a9e68ad6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'c508e36d-c3da-4835-9f1e-903a5ac921e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '67c89328-beb6-49b5-b949-6c8cac88b38f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'a04103bd-bcbd-40a7-899d-82cff13540af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:30 GMT'
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
  '081cef05-c70d-44ca-afc1-d96803656800',
  'x-ms-ests-server',
  '2.1.11328.14 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkSc7To3y3FAhJvGl0R6K7pz_bg1AQAAAAa1ftcOAAAA; expires=Fri, 29-Jan-2021 17:51:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:51:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '8bd9e5e0-45dc-45bf-b187-0a6be9ba3e01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '75c432b5-0b3b-478c-9fdb-ef8638d53c39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '66cacaef-2d4d-4767-ba6a-66d2f31e5773',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '9787d734-6e89-4018-88b9-5b01e3c70262',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '1cf76626-437e-4bf6-bac8-992ae1670959',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '5ca209d1-9971-41a2-b930-98396dacb0c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'c5a348bd-2848-46dc-a9a2-9c1a403f038e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '63668e7a-b581-471b-b3b8-048a2a24cf22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '73217e18-47f8-4d77-b703-05ed0510ebc1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'f17d5296-6215-4c40-8986-7149cd3376c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'ed67f14f-ba91-49f2-bbfe-3600351c8073',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '45619d88-9a9d-454a-8654-a3426af512a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '76b30913-912b-4f56-b66e-7f472099ca32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '35f5f4ee-63db-4de2-8245-7630beacc0cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:51:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '2f1caa54-f5cb-4a29-bd16-613633ad85c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '6e15ff31-6b78-40c8-9666-0d5bef5704dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:04 GMT'
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
  'a48e1991-2d52-4435-8bff-9e5945a77000',
  'x-ms-ests-server',
  '2.1.11328.14 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkSc7To3y3FAhJvGl0R6K7pz_bg1AgAAAAa1ftcOAAAA; expires=Fri, 29-Jan-2021 17:52:04 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:52:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '8bc24349-7ccb-4f2e-a6ce-2e949c386f0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'be626d35-3cdc-4031-b034-9569cb00ad60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '8f853157-d2ab-4f2a-a557-97240548aa8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '34f18103-6866-44d1-8977-23bc8054070a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '5dd507a0-4ba4-42be-bce9-286ce0326a8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '6f279e33-a1b5-4059-98a5-be18f87321fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'ed357726-7c74-4552-a68e-b63a7b806b1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '136dca7a-48a8-4050-b68d-97fef780afa4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'f5dd566c-4de1-46d1-b881-12195b59b6b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '39940212-e77f-48c3-b122-e4a5c4db40f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'afb6f158-8afb-499c-921d-c3e4619595b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '6ace135e-7e1b-4b4d-8537-915b2cef1ae2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '8f845dcb-2d49-42e0-b373-8852fb6581a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'b1bb711e-5eeb-4fd4-a58c-579ab4bda47f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '72c544e3-44d6-4713-9fe7-9f228683569e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:36 GMT'
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
  '8ebcc3ab-dd16-4cfa-bb7d-1b3b47086600',
  'x-ms-ests-server',
  '2.1.11328.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AkSc7To3y3FAhJvGl0R6K7pz_bg1AwAAAAa1ftcOAAAA; expires=Fri, 29-Jan-2021 17:52:36 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:52:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'bad60598-e99f-48cd-b4fa-817ad2f1c8f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '9baca781-4464-457f-8686-5b32b84b404d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '520f7284-7f00-47e2-9b5a-4a856a34bbad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  'feb46f48-db83-4368-911e-6271c1ff4d67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'd03e98d6-7394-489c-9044-4ad2c58beb1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '72',
  'apim-request-id',
  '7a6864ea-9562-429d-995f-63291488f04c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '186053a4-2681-4468-afa8-e819dfd7124b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '1a30f081-e691-4b68-bb06-a94bed5d4ea6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'f7e6a11c-27fc-4fde-bd4f-792c7b96bcc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'de71d992-3b65-418e-bd4d-751c3d648421',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'e294e094-9ef3-4537-9024-f5766d929db9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:52:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'f60a499e-688e-41fb-9f80-6b95de9b1c9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:53:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '362e43f0-9aae-4ec1-bf49-076c304f5259',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:53:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '465427f1-0297-4b41-b7f9-27cbfb2a1d9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:53:05 GMT'
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
  '8ca0d302-e942-463f-a8fa-608c3c157400',
  'x-ms-ests-server',
  '2.1.11328.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AkSc7To3y3FAhJvGl0R6K7pz_bg1BAAAAAa1ftcOAAAA; expires=Fri, 29-Jan-2021 17:53:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 30 Dec 2020 17:53:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '638e9a3f-8573-45e2-8427-62ef8a6dda34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:53:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '343e1205-377e-47ff-a30c-86eec7aab42a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:53:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'edae158e-3bff-445d-b097-092cab45fba4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:53:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"running","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '7e01b5bd-a7fd-494d-8751-a904564c9250',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:53:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/analyze/jobs/41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000')
  .query(true)
  .reply(200, {"displayName":"testJob","jobId":"41a86518-75d6-4e3c-a079-dceb0f427104_637448832000000000","lastUpdateDateTime":"2020-12-30T17:51:04Z","createdDateTime":"2020-12-30T17:51:03Z","expirationDateTime":"2020-12-31T17:51:03Z","status":"succeeded","errors":[],"tasks":{"details":{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"name":"testJob","lastUpdateDateTime":"2020-12-30T17:51:04.271277Z","results":{"inTerminalState":true,"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2020-07-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '966808a9-e096-420e-8d4c-b953a98b48ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:53:16 GMT'
]);

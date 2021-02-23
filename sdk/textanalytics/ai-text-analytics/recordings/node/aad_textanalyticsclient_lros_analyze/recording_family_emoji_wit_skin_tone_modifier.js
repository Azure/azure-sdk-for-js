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
  '994db4a0-1bcb-4139-9699-833f14d10e00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1EwAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:04:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:04:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]},"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '19a4db04-e701-41eb-bc6d-158b8a91b6e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:49Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:49Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '6e8b080e-8a28-41a7-ab23-dab049ed17d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:49Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:49Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'dd9ccddb-e122-48ef-aee2-70a0e18f32a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '6c85b2d8-2c5d-4b73-b621-0ca2855d8b39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '4fd1fce6-baf0-4c7e-a828-b02e7678e009',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '5523a581-b6f0-4d2a-bfc6-5153a4bd9d0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '6056e59f-079e-40dd-a46a-ece016831b85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:04:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  '3100af84-1614-4fbf-87e4-29ea5734904a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  'c1ff5b6b-3829-471e-8254-37a5a3823912',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '615',
  'apim-request-id',
  '8b71e37b-12f1-499c-af23-f5a1ebdf4c72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '19f85026-1f6f-4068-a8d5-92a63f24cf6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'cd67f800-5a40-43f0-a060-d60f19c4af3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '4a3b20c9-8812-4ed3-ba0d-2522dfa02432',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '4abd2cfe-7c5c-48d7-a654-68eae6d2477c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '549',
  'apim-request-id',
  '8f66c2c3-3732-4488-ac59-6887206023d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '922fb211-7e4b-4107-9758-7d97fb04f828',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  '54be8440-8d66-4d4d-a57d-323ce7dfc353',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:20 GMT'
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
  '08d59057-9a31-4712-889d-9bfd59440e00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:05:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:05:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '99c1017d-bc0c-4b04-bcdc-c39d4ffb1f97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'b2e045c5-182d-4913-ba81-9af2eca08291',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'a3dcc186-153a-4f0b-8c87-662b2df57613',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '35a3fa71-d3fc-47be-9c53-9628d7d1b957',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '269e2bfa-37ea-458e-adf7-0b2e35d0cb3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '9765a11e-7691-473f-bd75-b3c84ed33246',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  '0df556d3-8545-493a-a5bd-fdd6d98303f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'c8701ead-e9c4-4c56-b34d-3a850ac273eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  '9c50453f-8b1e-416a-b596-8288c323bbdf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'd6c567d7-ca21-4d8c-a7d3-0cc0affb99f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '8283a4e3-a1d7-4bd6-9401-b1e98a828d84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '6a900262-c439-4bb0-a1e4-cf0def6f28e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '097c3d3b-ca24-46c4-9170-de3cdbecb935',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '312c5051-ab51-4149-992c-39c1ac37fe20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'fadd5855-e59c-4417-afc6-063b37008db8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:52 GMT'
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
  '1731d1ee-9a5f-4727-9cc8-4b31239f0e00',
  'x-ms-ests-server',
  '2.1.11513.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAHVnxtcOAAAA; expires=Thu, 25-Mar-2021 03:05:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 03:05:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'e9ad3dcb-e766-4a51-a102-72a7223778d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '3c97d0a8-98d3-4683-9e8f-39b2015a4974',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:04:51.2678335Z","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '54fd8438-cc4b-4e88-9ddc-4eec9c34d7da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/8c72036e-28ed-407d-bb29-a4714d43bcec')
  .query(true)
  .reply(200, {"jobId":"8c72036e-28ed-407d-bb29-a4714d43bcec","lastUpdateDateTime":"2021-02-23T03:04:51Z","createdDateTime":"2021-02-23T03:04:49Z","expirationDateTime":"2021-02-24T03:04:49Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T03:04:51Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T03:04:51.2678335Z","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '56415bb5-4c0b-457e-8182-a8f2e0fe3018',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 03:05:58 GMT'
]);

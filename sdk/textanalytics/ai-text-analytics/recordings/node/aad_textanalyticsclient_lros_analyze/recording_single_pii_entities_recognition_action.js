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
  '655fd65c-ce1c-4592-a25b-14c7268d0c00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:46:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:46:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/analyze', {"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]},"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"3","text":"Is 998.214.865-68 your Brazilian CPF number?"}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539',
  'x-envoy-upstream-service-time',
  '348',
  'apim-request-id',
  '77f94d16-ba2e-4572-829c-fe79ffbb29c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:46:59Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:46:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '52c39aff-0d52-421f-a903-040b1099f74f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:46:59Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"notStarted","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:46:59Z"},"completed":0,"failed":0,"inProgress":0,"total":0}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'c8bfbfab-fe49-44d8-ba95-f239a696b580',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:46:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'd059e9d6-ca63-44f1-92d7-2c02c4fc8718',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '57224d94-a5f0-4d6d-9977-36eabf9eec84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '77bf5b82-ab75-4aaa-af2c-8b8d95137e50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'd71bce06-9244-4173-98eb-134ce2a4dc74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  '41352a61-7e25-4a21-8a0d-ec300159dbe1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '42',
  'apim-request-id',
  'ff3505fd-cc48-4c82-9708-debefbd9151d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'a1f58533-9147-4c1b-a3e5-203300995e4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '782',
  'apim-request-id',
  '714977ce-d5b8-4968-977f-5ff4019b56d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '4aa35820-4d6e-45cc-8649-d310a4c14fb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  '1a0a06d3-c06f-4edf-bbc5-ea1657a75e56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '38802b2a-3610-475f-872c-ad81e0181960',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '1beca18a-97f6-4da1-b474-efeaa253f46c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '533247aa-6751-4b88-a361-765e6f9b5a79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:27 GMT'
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
  '74ce6e1e-24d2-4f31-9b7d-ae8650e50b00',
  'x-ms-ests-server',
  '2.1.11513.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:47:30 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:47:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '238',
  'apim-request-id',
  '94c54f2b-b2dd-4b96-9101-6cb7bd072598',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'a67107e1-2cea-4d3b-ae40-a36ee55b21ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '782caaa0-a1ce-494c-a9b7-be8b78fbb6a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'f5f20003-00ff-48e4-9824-4160114b609a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '5fba75e9-bf9e-4479-8d0e-1e158d91fd24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '661',
  'apim-request-id',
  '612c04d3-f919-4fb5-869d-b3bf07bfefbc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '4def1552-ff7c-4eb5-81c7-1db2a4fde263',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'afe8b058-e277-4f9d-a990-5dc7bd7845db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '6a7b6361-9e5b-4424-87e8-da0dd4a9a933',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '3c0bffd0-054b-4060-8828-c12227b7bd1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '4b4b567a-8816-4636-891b-342dbe19104d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '632',
  'apim-request-id',
  'e9fe8f87-f35c-462a-99cb-384f28762b39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '76e30e31-9077-4265-9e5e-10502292fb9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '471a7ea1-681e-4a5d-9f90-80ba20e036aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:47:58 GMT'
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
  'f2d7a52e-3e63-4269-90d3-668f99357300',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AoskbHw9f_VIuMWAfB4u6atz_bg1FAAAAMVixtcOAAAA; expires=Thu, 25-Mar-2021 02:48:01 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 23 Feb 2021 02:48:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '72f7e5f3-b3cd-408d-88ec-6caa43515211',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'f421fbb3-3f93-4267-b173-79b865a7d7af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"running","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '87a255ba-e579-4858-af20-dbf87849cd14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:47:01.3648231Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '1d4f4e9b-8123-4cb8-8c17-182e417cdca8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/analyze/jobs/eaf97921-045b-4de9-a6cf-134890ade539')
  .query(true)
  .reply(200, {"jobId":"eaf97921-045b-4de9-a6cf-134890ade539","lastUpdateDateTime":"2021-02-23T02:47:01Z","createdDateTime":"2021-02-23T02:46:59Z","expirationDateTime":"2021-02-24T02:46:59Z","status":"succeeded","errors":[],"tasks":{"details":{"lastUpdateDateTime":"2021-02-23T02:47:01Z"},"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-02-23T02:47:01.3648231Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is ***********.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - ********* - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[{"text":"111000025","category":"PhoneNumber","offset":18,"length":9,"confidenceScore":0.8},{"text":"111000025","category":"ABARoutingNumber","offset":18,"length":9,"confidenceScore":0.75},{"text":"111000025","category":"NZSocialWelfareNumber","offset":18,"length":9,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Is 998.214.865-68 your Brazilian CPF number?","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '50f4145e-483f-477f-8c0e-e5df20232e2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:48:07 GMT'
]);

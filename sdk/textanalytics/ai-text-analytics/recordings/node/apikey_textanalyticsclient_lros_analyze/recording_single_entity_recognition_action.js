let nock = require('nock');

module.exports.hash = "de35700ea43a39df2d66af7075d93f38";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'a641a9d2-5cbc-41b5-9b4e-bdfc1cfcda5b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:56Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '3ded192b-8e55-4900-add6-d05ae4c7798e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:56Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '6deecec9-836d-4573-829e-5e4d42e3f61d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:56Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'c53a7258-1c7f-4c66-a4ef-44180ad47a77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:46:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '7153e53f-20f1-4399-b58b-dec53394a660',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a7b5cd2e-3220-44e9-9346-62cf5e981f6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'e2c6cf36-f66c-4f7f-a3bb-354a5aafe059',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:04 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '09be9edf-63c9-4022-ba2b-a4202e4b0055',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'abd05698-d8b5-4da8-8505-c41cc8eddef2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '38bc736b-0f39-40df-9dfe-db6d1980bd9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'adbe738b-06e2-4a1b-a0a9-f6f9397c7a08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '830313b0-55be-4bf6-9eb7-7c92b2bb4e92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'd259afe2-c6c0-4599-9fe8-0b40ccf4135d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '8804cea6-4ef1-4122-af2d-f85f14554180',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b0e54e93-f1e1-4dde-99bf-2a82b20b96a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:46:59Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0908e7e2-8728-44fa-8bf7-6dbc99510b11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:47:25Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:47:25.5252938Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'b1179534-f7cd-455c-be52-42405967fdb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9a5fa160-d89d-4445-b29d-a3e471ae5d66')
  .query(true)
  .reply(200, {"jobId":"9a5fa160-d89d-4445-b29d-a3e471ae5d66","lastUpdateDateTime":"2021-06-25T19:47:25Z","createdDateTime":"2021-06-25T19:46:56Z","expirationDateTime":"2021-06-26T19:46:56Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:47:25.5252938Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '4a438903-a91a-4e44-8cc9-8a6f39c4111f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:25 GMT'
]);

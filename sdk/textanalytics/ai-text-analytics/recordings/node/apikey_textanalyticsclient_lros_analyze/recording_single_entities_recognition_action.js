let nock = require('nock');

module.exports.hash = "d3883c1b02faf3494e22c243c4aaf823";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.","language":"es"},{"id":"3","text":"Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.","language":"de"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '7cfed1f7-51dc-462d-a6d3-b05f273c2acc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:10Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e60f74ba-d9e8-4ff2-9da0-dc1e19e8aafe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:10Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '1fb6ef7d-2f22-4631-8ef0-1c34c3ea9d31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:10Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '8dc2ca56-f15f-474c-a0b8-2f9cfccb4e2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:10Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '764e12f4-760e-4e6c-b62a-53729de2ade0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:10Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6bbd5da1-5aaa-473b-965f-20857f6cc4d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:10Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'db94479d-4083-4e54-a14d-a49446b96b4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:10Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'c5d85be8-0fa8-4e6f-b058-46b598e427f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:10Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'bef7f118-6b8a-43af-b034-96049cc47a3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'aac0aae2-0ece-48c8-86b0-f5c7808f2e12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'c2f9e3df-e620-4e45-9c60-10870640a640',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e12271a9-94ff-424f-914c-75f2179fc2b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '86c1b052-3bbd-42f8-ad9d-8d89c05ff08b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2405d77c-afe7-4453-b06b-be24862b9841',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '31918f77-df13-4910-8053-d631328b6bd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '55656dc2-19c0-42f3-bf9c-1025330a854b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'fb3eb443-6bd1-4af6-a9be-c6f487dec78a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0e5ec21d-d548-4687-88fe-8714dcab869a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '22',
  'apim-request-id',
  '79f43970-aa01-461e-af8f-36e86adc9dfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '038754b3-3b42-4791-996b-f4aba8abb60b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '108b23fc-7994-4bfe-bff6-22a6fe61ece7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:23Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e485ff44-d471-4fb4-b8ee-5dd57f31dbfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:50Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:48:50.3273457Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":1}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  'f0866d21-c52b-4f72-9263-6456cf8b2525',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/cfd6bbb8-93ce-4c22-8115-a7e41cb576e2')
  .query(true)
  .reply(200, {"jobId":"cfd6bbb8-93ce-4c22-8115-a7e41cb576e2","lastUpdateDateTime":"2021-06-25T19:48:50Z","createdDateTime":"2021-06-25T19:48:10Z","expirationDateTime":"2021-06-26T19:48:10Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:48:50.3273457Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1},{"text":"April 4, 1975","category":"DateTime","subcategory":"Date","offset":54,"length":13,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99},{"text":"4 de abril de 1975","category":"DateTime","subcategory":"Date","offset":53,"length":18,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"4. April 1975","category":"DateTime","subcategory":"Date","offset":19,"length":13,"confidenceScore":0.8},{"text":"Bill Gates","category":"Person","offset":37,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":52,"length":10,"confidenceScore":1}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'ffa8c0b8-9cef-4f2b-aa32-2fdde0f36fca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:51 GMT'
]);

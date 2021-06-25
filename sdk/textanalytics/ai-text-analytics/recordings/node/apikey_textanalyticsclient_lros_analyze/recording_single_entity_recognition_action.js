let nock = require('nock');

module.exports.hash = "de35700ea43a39df2d66af7075d93f38";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  '2388dad1-e431-4c77-8697-e638b3b5b0e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:00:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:00:59Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '5eb0ab5c-28b4-404b-8f83-9eb9925f4fc9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:00:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:00:59Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'c03933b1-e943-49e7-9ae1-23f7b45002b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:00:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:00:59Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '6f4d2a7f-7943-4fe1-b724-af3465f0c1b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:00:59Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'd121ffc3-59e7-4eb3-a157-13b9079b5aca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'd953e7aa-ca28-4867-9d8b-34ff11c84bf7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  '10982ed1-8e20-4ab3-88d2-2d5186e31014',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '275b5bfb-a13c-4559-aab2-a73c85ecf3c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '0f5801b6-7bfe-42dd-a6c6-e58087faef56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd5c3ca65-7c36-4552-b4be-3a3faa3fc5af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '05bd2392-24d9-4161-a710-4a2853bc68ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b1dbae4e-316a-4c4d-8c6f-c6dccce4d966',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '805e81cc-31cb-4737-b0d6-02c2a8ad70df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '24',
  'apim-request-id',
  'c4393cc7-e115-4afd-9fbe-208fdc22403e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:05Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  '5de34e4f-2a95-41e6-b7a7-9824ae7767eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:25Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T05:01:25.9172454Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'a8f38d0f-da1f-4c42-b7b2-fffd8d1d3fdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/2b99a503-5328-446a-98d3-18fe4c3a3729')
  .query(true)
  .reply(200, {"jobId":"2b99a503-5328-446a-98d3-18fe4c3a3729","lastUpdateDateTime":"2021-06-25T05:01:25Z","createdDateTime":"2021-06-25T05:00:59Z","expirationDateTime":"2021-06-26T05:00:59Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T05:01:25.9172454Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'ffbd0807-f45f-41b8-9df0-664d126d196e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:01:26 GMT'
]);

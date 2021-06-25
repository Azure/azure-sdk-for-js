let nock = require('nock');

module.exports.hash = "d7e8054512e98cb5ba9ae070e69b37f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3',
  'x-envoy-upstream-service-time',
  '2754',
  'apim-request-id',
  'a135bb8a-3113-4363-ae6e-1a2e319139ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:28Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '74172180-dcdd-4bb4-b5ab-1f594dfe03bf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:28Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'e9774018-b516-496e-9cf4-aeefc5f23289',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '30824b9c-af09-42a5-8f50-7531147a319c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c43fcdd9-550f-49a0-bfea-7ac32244eade',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '70a5a3d3-e9d6-4bd9-85ce-1b375cad628c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'fdf35e21-d335-43ea-b60d-b2dd0c896181',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'adb93d7c-76da-4751-8d62-aa845685ef81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2e25c3d0-e7a3-4129-8fc1-b6fd0632a1ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '744d947f-14db-4c6d-aa92-d7f7083810db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a6628575-06b2-4228-9302-2b90190787d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '923be5c7-5173-4b12-9a0c-1459a2eb060a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5ea86265-ad82-43f3-bb22-13b16c5ff72a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'ce118157-48e4-4e4a-89c0-2c5550b4488d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c0978b28-2f18-4d34-8093-c0e3e7fb5734',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '18',
  'apim-request-id',
  'ec9da051-aa3c-465e-bf51-1dd86b7ff198',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e4194517-75de-48be-bb7b-0a66e7b27126',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:47:29Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'a9a8e857-4bfb-407c-a943-bd218a9cfb31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:47:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:48:01Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:48:01.3716213Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '69e64a82-ad21-4e1d-93d5-102762d8ce77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/4501a5f9-015f-4844-8541-2b491751b1d3')
  .query(true)
  .reply(200, {"jobId":"4501a5f9-015f-4844-8541-2b491751b1d3","lastUpdateDateTime":"2021-06-25T19:48:01Z","createdDateTime":"2021-06-25T19:47:26Z","expirationDateTime":"2021-06-26T19:47:26Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:48:01.3716213Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]},{"id":"2","keyPhrases":["Bill Gates","Paul Allen","Microsoft"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7686',
  'apim-request-id',
  'c8ac4444-27f4-45f1-8bb2-7bcc3079f9e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:48:09 GMT'
]);

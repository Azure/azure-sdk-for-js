let nock = require('nock');

module.exports.hash = "586a571f3405fc4a91192c8057f26eba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/9ebcc56f-6735-4204-897e-e585142d7244',
  'x-envoy-upstream-service-time',
  '823',
  'apim-request-id',
  '5bf306d1-a1a6-489d-9ca1-0c8cdd8a0c56',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9ebcc56f-6735-4204-897e-e585142d7244')
  .query(true)
  .reply(200, {"jobId":"9ebcc56f-6735-4204-897e-e585142d7244","lastUpdateDateTime":"2021-10-23T00:41:08Z","createdDateTime":"2021-10-23T00:41:08Z","expirationDateTime":"2021-10-24T00:41:08Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'a56aac5b-f8ad-48db-88f4-c3dc8b464c80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9ebcc56f-6735-4204-897e-e585142d7244')
  .query(true)
  .reply(200, {"jobId":"9ebcc56f-6735-4204-897e-e585142d7244","lastUpdateDateTime":"2021-10-23T00:41:08Z","createdDateTime":"2021-10-23T00:41:08Z","expirationDateTime":"2021-10-24T00:41:08Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8b33ce8f-a7c9-496c-81a5-345118fc6153',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9ebcc56f-6735-4204-897e-e585142d7244')
  .query(true)
  .reply(200, {"jobId":"9ebcc56f-6735-4204-897e-e585142d7244","lastUpdateDateTime":"2021-10-23T00:41:09Z","createdDateTime":"2021-10-23T00:41:08Z","expirationDateTime":"2021-10-24T00:41:08Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c2d49d26-b139-469e-9328-9b36a74b4f11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9ebcc56f-6735-4204-897e-e585142d7244')
  .query(true)
  .reply(200, {"jobId":"9ebcc56f-6735-4204-897e-e585142d7244","lastUpdateDateTime":"2021-10-23T00:41:09Z","createdDateTime":"2021-10-23T00:41:08Z","expirationDateTime":"2021-10-24T00:41:08Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'dd713664-3e9d-4b66-9ceb-263050c835cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9ebcc56f-6735-4204-897e-e585142d7244')
  .query(true)
  .reply(200, {"jobId":"9ebcc56f-6735-4204-897e-e585142d7244","lastUpdateDateTime":"2021-10-23T00:41:09Z","createdDateTime":"2021-10-23T00:41:08Z","expirationDateTime":"2021-10-24T00:41:08Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '40',
  'apim-request-id',
  'ee3b27d3-ddb0-4e0a-aa34-e9e0b8d34f7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9ebcc56f-6735-4204-897e-e585142d7244')
  .query(true)
  .reply(200, {"jobId":"9ebcc56f-6735-4204-897e-e585142d7244","lastUpdateDateTime":"2021-10-23T00:41:16Z","createdDateTime":"2021-10-23T00:41:08Z","expirationDateTime":"2021-10-24T00:41:08Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:41:16.4789392Z","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  '21257b4e-0054-4ea6-86aa-0b6109f53c81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/9ebcc56f-6735-4204-897e-e585142d7244')
  .query(true)
  .reply(200, {"jobId":"9ebcc56f-6735-4204-897e-e585142d7244","lastUpdateDateTime":"2021-10-23T00:41:16Z","createdDateTime":"2021-10-23T00:41:08Z","expirationDateTime":"2021-10-24T00:41:08Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:41:16.4789392Z","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '172766e4-f6f9-4c0d-893f-e44f85c54cb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:17 GMT'
]);

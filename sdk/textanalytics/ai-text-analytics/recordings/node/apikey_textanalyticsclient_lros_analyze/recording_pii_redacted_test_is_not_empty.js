let nock = require('nock');

module.exports.hash = "cc6235e70058b9b21b1bc57b78b521dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/2d3fc8ec-4d77-4ed7-873f-9f440c3d3348',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  'd0f09b28-8d4a-4996-9ff6-5ccfc1bf73a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2d3fc8ec-4d77-4ed7-873f-9f440c3d3348')
  .query(true)
  .reply(200, {"jobId":"2d3fc8ec-4d77-4ed7-873f-9f440c3d3348","lastUpdateDateTime":"2021-08-03T22:41:36Z","createdDateTime":"2021-08-03T22:41:35Z","expirationDateTime":"2021-08-04T22:41:35Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1b725f35-beee-49ac-9573-1c50423ec45b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2d3fc8ec-4d77-4ed7-873f-9f440c3d3348')
  .query(true)
  .reply(200, {"jobId":"2d3fc8ec-4d77-4ed7-873f-9f440c3d3348","lastUpdateDateTime":"2021-08-03T22:41:36Z","createdDateTime":"2021-08-03T22:41:35Z","expirationDateTime":"2021-08-04T22:41:35Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'eab5f471-fedc-4274-9f0a-39ee498ec91d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2d3fc8ec-4d77-4ed7-873f-9f440c3d3348')
  .query(true)
  .reply(200, {"jobId":"2d3fc8ec-4d77-4ed7-873f-9f440c3d3348","lastUpdateDateTime":"2021-08-03T22:41:37Z","createdDateTime":"2021-08-03T22:41:35Z","expirationDateTime":"2021-08-04T22:41:35Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'de593feb-beba-41d5-b612-e9db622c9282',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2d3fc8ec-4d77-4ed7-873f-9f440c3d3348')
  .query(true)
  .reply(200, {"jobId":"2d3fc8ec-4d77-4ed7-873f-9f440c3d3348","lastUpdateDateTime":"2021-08-03T22:41:37Z","createdDateTime":"2021-08-03T22:41:35Z","expirationDateTime":"2021-08-04T22:41:35Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '9b387647-a7aa-4e08-a54c-5c04e61d8ec1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2d3fc8ec-4d77-4ed7-873f-9f440c3d3348')
  .query(true)
  .reply(200, {"jobId":"2d3fc8ec-4d77-4ed7-873f-9f440c3d3348","lastUpdateDateTime":"2021-08-03T22:41:37Z","createdDateTime":"2021-08-03T22:41:35Z","expirationDateTime":"2021-08-04T22:41:35Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5e9402f9-9228-4dd6-9e02-1d572bf3f7d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2d3fc8ec-4d77-4ed7-873f-9f440c3d3348')
  .query(true)
  .reply(200, {"jobId":"2d3fc8ec-4d77-4ed7-873f-9f440c3d3348","lastUpdateDateTime":"2021-08-03T22:41:42Z","createdDateTime":"2021-08-03T22:41:35Z","expirationDateTime":"2021-08-04T22:41:35Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:42.5867082Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '6f52baf9-1aca-4a52-9ed4-25abf75c9ba1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/2d3fc8ec-4d77-4ed7-873f-9f440c3d3348')
  .query(true)
  .reply(200, {"jobId":"2d3fc8ec-4d77-4ed7-873f-9f440c3d3348","lastUpdateDateTime":"2021-08-03T22:41:42Z","createdDateTime":"2021-08-03T22:41:35Z","expirationDateTime":"2021-08-04T22:41:35Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:42.5867082Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '09944258-4780-41d8-a07f-08c2275cfee2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:44 GMT'
]);

let nock = require('nock');

module.exports.hash = "204756a0ef7bb31d61c833d32a9152fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"displayName":"testJob","analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/fc0f0e8b-e389-4e14-ac90-47a5c0f92720',
  'x-envoy-upstream-service-time',
  '211',
  'apim-request-id',
  'a424b669-b2e3-437c-9278-78c5a65e4373',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:32 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/fc0f0e8b-e389-4e14-ac90-47a5c0f92720')
  .query(true)
  .reply(200, {"jobId":"fc0f0e8b-e389-4e14-ac90-47a5c0f92720","lastUpdateDateTime":"2021-08-03T03:14:33Z","createdDateTime":"2021-08-03T03:14:33Z","expirationDateTime":"2021-08-04T03:14:33Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c11019f2-31e0-49e6-9396-d745eb4cf995',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:32 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/fc0f0e8b-e389-4e14-ac90-47a5c0f92720')
  .query(true)
  .reply(200, {"jobId":"fc0f0e8b-e389-4e14-ac90-47a5c0f92720","lastUpdateDateTime":"2021-08-03T03:14:33Z","createdDateTime":"2021-08-03T03:14:33Z","expirationDateTime":"2021-08-04T03:14:33Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e5cf2624-f591-4639-85a7-dd1e79538104',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:32 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/fc0f0e8b-e389-4e14-ac90-47a5c0f92720')
  .query(true)
  .reply(200, {"jobId":"fc0f0e8b-e389-4e14-ac90-47a5c0f92720","lastUpdateDateTime":"2021-08-03T03:14:33Z","createdDateTime":"2021-08-03T03:14:33Z","expirationDateTime":"2021-08-04T03:14:33Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f3b89fc1-992e-43e3-84a2-8107a2e3f0cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:35 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/fc0f0e8b-e389-4e14-ac90-47a5c0f92720')
  .query(true)
  .reply(200, {"jobId":"fc0f0e8b-e389-4e14-ac90-47a5c0f92720","lastUpdateDateTime":"2021-08-03T03:14:36Z","createdDateTime":"2021-08-03T03:14:33Z","expirationDateTime":"2021-08-04T03:14:33Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '28f5faa9-724e-4f7a-9d90-8281af12ff2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:37 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/fc0f0e8b-e389-4e14-ac90-47a5c0f92720')
  .query(true)
  .reply(200, {"jobId":"fc0f0e8b-e389-4e14-ac90-47a5c0f92720","lastUpdateDateTime":"2021-08-03T03:14:36Z","createdDateTime":"2021-08-03T03:14:33Z","expirationDateTime":"2021-08-04T03:14:33Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8fa499ea-2223-4e6f-ba1d-643b985f518f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:39 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/fc0f0e8b-e389-4e14-ac90-47a5c0f92720')
  .query(true)
  .reply(200, {"jobId":"fc0f0e8b-e389-4e14-ac90-47a5c0f92720","lastUpdateDateTime":"2021-08-03T03:14:36Z","createdDateTime":"2021-08-03T03:14:33Z","expirationDateTime":"2021-08-04T03:14:33Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '937bc2a9-d95a-4120-b026-025743323760',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:41 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/fc0f0e8b-e389-4e14-ac90-47a5c0f92720')
  .query(true)
  .reply(200, {"jobId":"fc0f0e8b-e389-4e14-ac90-47a5c0f92720","lastUpdateDateTime":"2021-08-03T03:14:42Z","createdDateTime":"2021-08-03T03:14:33Z","expirationDateTime":"2021-08-04T03:14:33Z","status":"succeeded","errors":[],"displayName":"testJob","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:42.7105674Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  'e027f489-c389-46e2-bf0d-320471a187ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:43 GMT'
]);

let nock = require('nock');

module.exports.hash = "204756a0ef7bb31d61c833d32a9152fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"displayName":"testJob","analysisInput":{"documents":[{"id":"1","text":"I will go to the park."},{"id":"2","text":"Este es un document escrito en Español."},{"id":"3","text":"猫は幸せ"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/4eede913-9927-480d-b4f6-fe43e9124124',
  'x-envoy-upstream-service-time',
  '200',
  'apim-request-id',
  'f5ed8351-4db5-4e9c-bdd6-d6a85d1ca6fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4eede913-9927-480d-b4f6-fe43e9124124')
  .query(true)
  .reply(200, {"jobId":"4eede913-9927-480d-b4f6-fe43e9124124","lastUpdateDateTime":"2021-08-03T22:41:45Z","createdDateTime":"2021-08-03T22:41:44Z","expirationDateTime":"2021-08-04T22:41:44Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '766687a1-e53f-4ac7-8642-048a5114e56d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4eede913-9927-480d-b4f6-fe43e9124124')
  .query(true)
  .reply(200, {"jobId":"4eede913-9927-480d-b4f6-fe43e9124124","lastUpdateDateTime":"2021-08-03T22:41:45Z","createdDateTime":"2021-08-03T22:41:44Z","expirationDateTime":"2021-08-04T22:41:44Z","status":"notStarted","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '8504d1c0-10f6-4e3a-a60a-aba58031a8a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4eede913-9927-480d-b4f6-fe43e9124124')
  .query(true)
  .reply(200, {"jobId":"4eede913-9927-480d-b4f6-fe43e9124124","lastUpdateDateTime":"2021-08-03T22:41:47Z","createdDateTime":"2021-08-03T22:41:44Z","expirationDateTime":"2021-08-04T22:41:44Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '275917ad-b7ca-4a45-bb15-ef0e5b795bf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4eede913-9927-480d-b4f6-fe43e9124124')
  .query(true)
  .reply(200, {"jobId":"4eede913-9927-480d-b4f6-fe43e9124124","lastUpdateDateTime":"2021-08-03T22:41:47Z","createdDateTime":"2021-08-03T22:41:44Z","expirationDateTime":"2021-08-04T22:41:44Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6ee68c34-9427-4716-951f-2a7f301b84c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4eede913-9927-480d-b4f6-fe43e9124124')
  .query(true)
  .reply(200, {"jobId":"4eede913-9927-480d-b4f6-fe43e9124124","lastUpdateDateTime":"2021-08-03T22:41:47Z","createdDateTime":"2021-08-03T22:41:44Z","expirationDateTime":"2021-08-04T22:41:44Z","status":"running","errors":[],"displayName":"testJob","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1537db89-53e7-43a3-ad2d-af9962400013',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/4eede913-9927-480d-b4f6-fe43e9124124')
  .query(true)
  .reply(200, {"jobId":"4eede913-9927-480d-b4f6-fe43e9124124","lastUpdateDateTime":"2021-08-03T22:41:52Z","createdDateTime":"2021-08-03T22:41:44Z","expirationDateTime":"2021-08-04T22:41:44Z","status":"succeeded","errors":[],"displayName":"testJob","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:41:52.5978988Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"I will go to the park.","id":"1","entities":[],"warnings":[]},{"redactedText":"Este es un document escrito en Español.","id":"2","entities":[],"warnings":[]},{"redactedText":"猫は幸せ","id":"3","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  'f04b5035-9b6a-445d-8817-84f857ce79b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:53 GMT'
]);

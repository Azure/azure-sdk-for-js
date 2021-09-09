let nock = require('nock');

module.exports.hash = "0627b94eef6a969b005adf51cea00788";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"Microsoft was founded by Bill Gates and Paul Allen","language":"en"},{"id":"2","text":"Microsoft fue fundado por Bill Gates y Paul Allen","language":"es"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/ec30af90-2566-44f3-859b-a64dce4e66f1',
  'x-envoy-upstream-service-time',
  '262',
  'apim-request-id',
  'fdd489bc-5d0c-4077-ba54-3a86be21f67d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ec30af90-2566-44f3-859b-a64dce4e66f1')
  .query(true)
  .reply(200, {"jobId":"ec30af90-2566-44f3-859b-a64dce4e66f1","lastUpdateDateTime":"2021-08-03T22:37:10Z","createdDateTime":"2021-08-03T22:37:09Z","expirationDateTime":"2021-08-04T22:37:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '9453fd4d-7516-4f54-96f0-a65e0889c324',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ec30af90-2566-44f3-859b-a64dce4e66f1')
  .query(true)
  .reply(200, {"jobId":"ec30af90-2566-44f3-859b-a64dce4e66f1","lastUpdateDateTime":"2021-08-03T22:37:10Z","createdDateTime":"2021-08-03T22:37:09Z","expirationDateTime":"2021-08-04T22:37:09Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '963c1fab-703c-44a7-a581-e6255f7fc17e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ec30af90-2566-44f3-859b-a64dce4e66f1')
  .query(true)
  .reply(200, {"jobId":"ec30af90-2566-44f3-859b-a64dce4e66f1","lastUpdateDateTime":"2021-08-03T22:37:11Z","createdDateTime":"2021-08-03T22:37:09Z","expirationDateTime":"2021-08-04T22:37:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'fec69127-bc7a-48c2-b626-b520c4276df5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ec30af90-2566-44f3-859b-a64dce4e66f1')
  .query(true)
  .reply(200, {"jobId":"ec30af90-2566-44f3-859b-a64dce4e66f1","lastUpdateDateTime":"2021-08-03T22:37:11Z","createdDateTime":"2021-08-03T22:37:09Z","expirationDateTime":"2021-08-04T22:37:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '62c2a0fe-8464-459a-9b1c-46fdba5d6426',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ec30af90-2566-44f3-859b-a64dce4e66f1')
  .query(true)
  .reply(200, {"jobId":"ec30af90-2566-44f3-859b-a64dce4e66f1","lastUpdateDateTime":"2021-08-03T22:37:11Z","createdDateTime":"2021-08-03T22:37:09Z","expirationDateTime":"2021-08-04T22:37:09Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f94846fd-6ca7-411c-a424-6eb16aaf20a8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ec30af90-2566-44f3-859b-a64dce4e66f1')
  .query(true)
  .reply(200, {"jobId":"ec30af90-2566-44f3-859b-a64dce4e66f1","lastUpdateDateTime":"2021-08-03T22:37:17Z","createdDateTime":"2021-08-03T22:37:09Z","expirationDateTime":"2021-08-04T22:37:09Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T22:37:17.0635429Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '731c2989-c01e-4bae-b86d-c256f5a4e422',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/ec30af90-2566-44f3-859b-a64dce4e66f1')
  .query(true)
  .reply(200, {"jobId":"ec30af90-2566-44f3-859b-a64dce4e66f1","lastUpdateDateTime":"2021-08-03T22:37:17Z","createdDateTime":"2021-08-03T22:37:09Z","expirationDateTime":"2021-08-04T22:37:09Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-08-03T22:37:17.0635429Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":25,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":40,"length":10,"confidenceScore":1}],"warnings":[]},{"id":"2","entities":[{"text":"Microsoft","category":"Organization","offset":0,"length":9,"confidenceScore":1},{"text":"Bill Gates","category":"Person","offset":26,"length":10,"confidenceScore":1},{"text":"Paul Allen","category":"Person","offset":39,"length":10,"confidenceScore":0.99}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '168',
  'apim-request-id',
  'f9739ab7-5c13-421a-aa4e-45acccb5f7ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:37:18 GMT'
]);

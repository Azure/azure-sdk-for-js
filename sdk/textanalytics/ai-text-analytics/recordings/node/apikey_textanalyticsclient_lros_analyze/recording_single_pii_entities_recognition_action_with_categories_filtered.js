let nock = require('nock');

module.exports.hash = "ebe1e864b29f1a1984cdd09711789b18";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","piiCategories":["USSocialSecurityNumber"],"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/7c36d141-2531-40e2-af45-58b550c0bfc3',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '155e47a6-88d4-4508-8172-1ac1ee5cf764',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/7c36d141-2531-40e2-af45-58b550c0bfc3')
  .query(true)
  .reply(200, {"jobId":"7c36d141-2531-40e2-af45-58b550c0bfc3","lastUpdateDateTime":"2021-08-03T22:38:18Z","createdDateTime":"2021-08-03T22:38:18Z","expirationDateTime":"2021-08-04T22:38:18Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f089515e-7419-44aa-a0da-7a12e8240e00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/7c36d141-2531-40e2-af45-58b550c0bfc3')
  .query(true)
  .reply(200, {"jobId":"7c36d141-2531-40e2-af45-58b550c0bfc3","lastUpdateDateTime":"2021-08-03T22:38:18Z","createdDateTime":"2021-08-03T22:38:18Z","expirationDateTime":"2021-08-04T22:38:18Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '07bf4eae-2031-4381-a04c-6147d7eae299',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/7c36d141-2531-40e2-af45-58b550c0bfc3')
  .query(true)
  .reply(200, {"jobId":"7c36d141-2531-40e2-af45-58b550c0bfc3","lastUpdateDateTime":"2021-08-03T22:38:18Z","createdDateTime":"2021-08-03T22:38:18Z","expirationDateTime":"2021-08-04T22:38:18Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '29201ffe-051b-4484-b463-e0fec8c7ee2b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/7c36d141-2531-40e2-af45-58b550c0bfc3')
  .query(true)
  .reply(200, {"jobId":"7c36d141-2531-40e2-af45-58b550c0bfc3","lastUpdateDateTime":"2021-08-03T22:38:18Z","createdDateTime":"2021-08-03T22:38:18Z","expirationDateTime":"2021-08-04T22:38:18Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '11739005-62c5-443b-8a42-387a547418d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/7c36d141-2531-40e2-af45-58b550c0bfc3')
  .query(true)
  .reply(200, {"jobId":"7c36d141-2531-40e2-af45-58b550c0bfc3","lastUpdateDateTime":"2021-08-03T22:38:18Z","createdDateTime":"2021-08-03T22:38:18Z","expirationDateTime":"2021-08-04T22:38:18Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '73da699c-e78f-4fdb-b4ab-b045efd6b607',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/7c36d141-2531-40e2-af45-58b550c0bfc3')
  .query(true)
  .reply(200, {"jobId":"7c36d141-2531-40e2-af45-58b550c0bfc3","lastUpdateDateTime":"2021-08-03T22:38:26Z","createdDateTime":"2021-08-03T22:38:18Z","expirationDateTime":"2021-08-04T22:38:18Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:38:26.857408Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '8605f943-ce54-49cd-a4bd-1f6ceb95ad49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/7c36d141-2531-40e2-af45-58b550c0bfc3')
  .query(true)
  .reply(200, {"jobId":"7c36d141-2531-40e2-af45-58b550c0bfc3","lastUpdateDateTime":"2021-08-03T22:38:26Z","createdDateTime":"2021-08-03T22:38:18Z","expirationDateTime":"2021-08-04T22:38:18Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:38:26.857408Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'fdfc5d1e-6d95-4675-9d4f-4c386dfe1a71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:38:26 GMT'
]);

let nock = require('nock');

module.exports.hash = "b9f03905f298e24c61f205d65ba5d0af";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","piiCategories":["USSocialSecurityNumber"],"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  '3b794e20-c16e-4d67-a1bf-bc40725ddc9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:24Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bc4663dc-7970-4096-8e6f-e1079af99520',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:24Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'ad6fd06f-54e9-4fc2-ba94-434f55b03914',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '247b6805-6ab3-4a75-90b0-ad55497c3c81',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '750eb417-1828-4dc8-a43b-12a7069d81b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '549112c3-8271-4baa-9a21-ba5fe437aabe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5168f636-6bab-4e4f-b099-a6f14848b80f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'ac42db1e-d579-455c-9cde-715e8d171f24',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '372ba504-e483-4ad3-9b39-3ffbaa247bd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'f529c17e-05c4-41de-8003-6cdbdbd210b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '416b00fa-3c8b-4998-8cf8-5d0539f7fc7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '57997542-93e2-4fb7-b5a9-c9e2a49073c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '31758d39-a25e-4bb1-8234-fd9439606ead',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:25Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'd7eaa8b4-5375-419b-a164-911245149599',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:49Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-07-01T17:50:49.3998563Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '9d90184b-93d8-442b-8843-7fcf953b18c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/analyze/jobs/9f83a353-8cea-4b98-b79c-d0643dbd1b4d')
  .query(true)
  .reply(200, {"jobId":"9f83a353-8cea-4b98-b79c-d0643dbd1b4d","lastUpdateDateTime":"2021-07-01T17:50:49Z","createdDateTime":"2021-07-01T17:50:24Z","expirationDateTime":"2021-07-02T17:50:24Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-07-01T17:50:49.3998563Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  'dffa5f34-c069-4e64-aecd-42bd7e2a935a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 01 Jul 2021 17:50:49 GMT'
]);

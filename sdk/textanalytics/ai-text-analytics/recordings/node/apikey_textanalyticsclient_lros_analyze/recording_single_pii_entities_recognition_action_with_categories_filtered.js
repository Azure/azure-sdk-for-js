let nock = require('nock');

module.exports.hash = "c669728e0d1db74e6165e8ee080b20d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"1","text":"My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."},{"id":"2","text":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","piiCategories":["USSocialSecurityNumber"],"stringIndexType":"Utf16CodeUnit"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/4f79b146-c44b-47ca-bad2-a4b4efdcb26a',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '50d58be9-8b35-400f-b93f-a1a7b7c54e86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/4f79b146-c44b-47ca-bad2-a4b4efdcb26a')
  .query(true)
  .reply(200, {"jobId":"4f79b146-c44b-47ca-bad2-a4b4efdcb26a","lastUpdateDateTime":"2021-10-23T00:37:51Z","createdDateTime":"2021-10-23T00:37:51Z","expirationDateTime":"2021-10-24T00:37:51Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '2c0f5269-2199-4caf-b677-d2afd6f8ff31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/4f79b146-c44b-47ca-bad2-a4b4efdcb26a')
  .query(true)
  .reply(200, {"jobId":"4f79b146-c44b-47ca-bad2-a4b4efdcb26a","lastUpdateDateTime":"2021-10-23T00:37:51Z","createdDateTime":"2021-10-23T00:37:51Z","expirationDateTime":"2021-10-24T00:37:51Z","status":"notStarted","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '75c42f38-daea-48e2-a391-64fc2dc66e71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/4f79b146-c44b-47ca-bad2-a4b4efdcb26a')
  .query(true)
  .reply(200, {"jobId":"4f79b146-c44b-47ca-bad2-a4b4efdcb26a","lastUpdateDateTime":"2021-10-23T00:37:51Z","createdDateTime":"2021-10-23T00:37:51Z","expirationDateTime":"2021-10-24T00:37:51Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd4dbe6f3-df89-4f5f-90b9-90f0467a56f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/4f79b146-c44b-47ca-bad2-a4b4efdcb26a')
  .query(true)
  .reply(200, {"jobId":"4f79b146-c44b-47ca-bad2-a4b4efdcb26a","lastUpdateDateTime":"2021-10-23T00:37:51Z","createdDateTime":"2021-10-23T00:37:51Z","expirationDateTime":"2021-10-24T00:37:51Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '69008647-0fa9-4cf5-8e4d-19b808df2dd1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/4f79b146-c44b-47ca-bad2-a4b4efdcb26a')
  .query(true)
  .reply(200, {"jobId":"4f79b146-c44b-47ca-bad2-a4b4efdcb26a","lastUpdateDateTime":"2021-10-23T00:37:51Z","createdDateTime":"2021-10-23T00:37:51Z","expirationDateTime":"2021-10-24T00:37:51Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'f1be1aaa-55bb-409d-ba41-c718fad81a55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/4f79b146-c44b-47ca-bad2-a4b4efdcb26a')
  .query(true)
  .reply(200, {"jobId":"4f79b146-c44b-47ca-bad2-a4b4efdcb26a","lastUpdateDateTime":"2021-10-23T00:38:00Z","createdDateTime":"2021-10-23T00:37:51Z","expirationDateTime":"2021-10-24T00:37:51Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:00.1142045Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'bf3e2d46-9c13-464d-a254-44d31aeb4052',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:37:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/4f79b146-c44b-47ca-bad2-a4b4efdcb26a')
  .query(true)
  .reply(200, {"jobId":"4f79b146-c44b-47ca-bad2-a4b4efdcb26a","lastUpdateDateTime":"2021-10-23T00:38:00Z","createdDateTime":"2021-10-23T00:37:51Z","expirationDateTime":"2021-10-24T00:37:51Z","status":"succeeded","errors":[],"tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:38:00.1142045Z","state":"succeeded","results":{"documents":[{"redactedText":"My SSN is *********** and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"1","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":10,"length":11,"confidenceScore":0.65}],"warnings":[]},{"redactedText":"Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'ba10975d-8f68-42c9-b554-73c05144f5c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:38:00 GMT'
]);

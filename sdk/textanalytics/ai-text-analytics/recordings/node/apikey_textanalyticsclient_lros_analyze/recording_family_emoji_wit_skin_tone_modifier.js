let nock = require('nock');

module.exports.hash = "586a571f3405fc4a91192c8057f26eba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/analyze/jobs/f59c9b05-ea79-4d62-8100-7620cff81a5f',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '87c9ca2f-fda6-446e-bc8f-e89aed92e29c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f59c9b05-ea79-4d62-8100-7620cff81a5f')
  .query(true)
  .reply(200, {"jobId":"f59c9b05-ea79-4d62-8100-7620cff81a5f","lastUpdateDateTime":"2021-08-03T22:41:53Z","createdDateTime":"2021-08-03T22:41:53Z","expirationDateTime":"2021-08-04T22:41:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'a94e2545-693c-433b-a377-3854d9085654',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f59c9b05-ea79-4d62-8100-7620cff81a5f')
  .query(true)
  .reply(200, {"jobId":"f59c9b05-ea79-4d62-8100-7620cff81a5f","lastUpdateDateTime":"2021-08-03T22:41:53Z","createdDateTime":"2021-08-03T22:41:53Z","expirationDateTime":"2021-08-04T22:41:53Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e1e5e034-f55a-4336-8eb1-35af91b7d652',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f59c9b05-ea79-4d62-8100-7620cff81a5f')
  .query(true)
  .reply(200, {"jobId":"f59c9b05-ea79-4d62-8100-7620cff81a5f","lastUpdateDateTime":"2021-08-03T22:41:53Z","createdDateTime":"2021-08-03T22:41:53Z","expirationDateTime":"2021-08-04T22:41:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '54d77801-e751-4f02-8753-5068260a46a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f59c9b05-ea79-4d62-8100-7620cff81a5f')
  .query(true)
  .reply(200, {"jobId":"f59c9b05-ea79-4d62-8100-7620cff81a5f","lastUpdateDateTime":"2021-08-03T22:41:53Z","createdDateTime":"2021-08-03T22:41:53Z","expirationDateTime":"2021-08-04T22:41:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '076666fd-da67-4e5c-96c8-61079af8e094',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f59c9b05-ea79-4d62-8100-7620cff81a5f')
  .query(true)
  .reply(200, {"jobId":"f59c9b05-ea79-4d62-8100-7620cff81a5f","lastUpdateDateTime":"2021-08-03T22:41:53Z","createdDateTime":"2021-08-03T22:41:53Z","expirationDateTime":"2021-08-04T22:41:53Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'fb3be24d-5229-49ae-917f-ed17d9cc9c65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:41:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f59c9b05-ea79-4d62-8100-7620cff81a5f')
  .query(true)
  .reply(200, {"jobId":"f59c9b05-ea79-4d62-8100-7620cff81a5f","lastUpdateDateTime":"2021-08-03T22:42:02Z","createdDateTime":"2021-08-03T22:41:53Z","expirationDateTime":"2021-08-04T22:41:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:42:02.1114679Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '673df33c-5671-43fe-9cc5-9f2454c47569',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:42:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/f59c9b05-ea79-4d62-8100-7620cff81a5f')
  .query(true)
  .reply(200, {"jobId":"f59c9b05-ea79-4d62-8100-7620cff81a5f","lastUpdateDateTime":"2021-08-03T22:42:02Z","createdDateTime":"2021-08-03T22:41:53Z","expirationDateTime":"2021-08-04T22:41:53Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T22:42:02.1114679Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  '46e45544-6d00-40ec-97f8-2ac7ef9bd005',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:42:01 GMT'
]);

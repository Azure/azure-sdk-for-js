let nock = require('nock');

module.exports.hash = "586a571f3405fc4a91192c8057f26eba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/analyze', {"analysisInput":{"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987","language":"en"}]},"tasks":{"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"UnicodeCodePoint"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/analyze/jobs/bb05911e-1873-4888-98e8-147c0de1e0ce',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'bdb0a130-5519-4fff-9b84-74b89ade1fb0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bb05911e-1873-4888-98e8-147c0de1e0ce')
  .query(true)
  .reply(200, {"jobId":"bb05911e-1873-4888-98e8-147c0de1e0ce","lastUpdateDateTime":"2021-08-03T03:14:44Z","createdDateTime":"2021-08-03T03:14:44Z","expirationDateTime":"2021-08-04T03:14:44Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f18bd171-6ef1-49bb-8872-1a0425b22d0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bb05911e-1873-4888-98e8-147c0de1e0ce')
  .query(true)
  .reply(200, {"jobId":"bb05911e-1873-4888-98e8-147c0de1e0ce","lastUpdateDateTime":"2021-08-03T03:14:44Z","createdDateTime":"2021-08-03T03:14:44Z","expirationDateTime":"2021-08-04T03:14:44Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c4b2a30a-fb7e-4bf7-ba02-657ba25853be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bb05911e-1873-4888-98e8-147c0de1e0ce')
  .query(true)
  .reply(200, {"jobId":"bb05911e-1873-4888-98e8-147c0de1e0ce","lastUpdateDateTime":"2021-08-03T03:14:44Z","createdDateTime":"2021-08-03T03:14:44Z","expirationDateTime":"2021-08-04T03:14:44Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '527f47b1-4140-445f-927e-ec550e1b0bfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:45 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bb05911e-1873-4888-98e8-147c0de1e0ce')
  .query(true)
  .reply(200, {"jobId":"bb05911e-1873-4888-98e8-147c0de1e0ce","lastUpdateDateTime":"2021-08-03T03:14:46Z","createdDateTime":"2021-08-03T03:14:44Z","expirationDateTime":"2021-08-04T03:14:44Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a8e445d9-6f3f-4f26-bc47-ca4e71ec003e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:47 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bb05911e-1873-4888-98e8-147c0de1e0ce')
  .query(true)
  .reply(200, {"jobId":"bb05911e-1873-4888-98e8-147c0de1e0ce","lastUpdateDateTime":"2021-08-03T03:14:46Z","createdDateTime":"2021-08-03T03:14:44Z","expirationDateTime":"2021-08-04T03:14:44Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":1,"total":1}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a10dde33-b3ad-4a79-a081-d5c4ac90431a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:49 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bb05911e-1873-4888-98e8-147c0de1e0ce')
  .query(true)
  .reply(200, {"jobId":"bb05911e-1873-4888-98e8-147c0de1e0ce","lastUpdateDateTime":"2021-08-03T03:14:52Z","createdDateTime":"2021-08-03T03:14:44Z","expirationDateTime":"2021-08-04T03:14:44Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:52.6265758Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '37b69c9a-6099-4bb7-832e-9f1a78faa77d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:51 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/analyze/jobs/bb05911e-1873-4888-98e8-147c0de1e0ce')
  .query(true)
  .reply(200, {"jobId":"bb05911e-1873-4888-98e8-147c0de1e0ce","lastUpdateDateTime":"2021-08-03T03:14:52Z","createdDateTime":"2021-08-03T03:14:44Z","expirationDateTime":"2021-08-04T03:14:44Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":1,"failed":0,"inProgress":0,"total":1,"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-08-03T03:14:52.6265758Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: ***********","id":"0","entities":[{"text":"859-98-0987","category":"USSocialSecurityNumber","offset":17,"length":11,"confidenceScore":0.65}],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '817bd0e7-d732-4a0e-92e0-758ab2dd1daa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:52 GMT'
]);

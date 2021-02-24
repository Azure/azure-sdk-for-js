let nock = require('nock');

module.exports.hash = "ccc06bbc882856bacdf46a31a9bfb5a0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/22d5da5f-41d9-4817-8519-b4788a9216a6',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '46ccf8ee-4b4d-44cf-a56e-b6554767a92d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/22d5da5f-41d9-4817-8519-b4788a9216a6')
  .query(true)
  .reply(200, {"jobId":"22d5da5f-41d9-4817-8519-b4788a9216a6","lastUpdateDateTime":"2021-02-23T19:35:33Z","createdDateTime":"2021-02-23T19:35:33Z","expirationDateTime":"2021-02-24T19:35:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '7d6ae890-a81d-411f-8a52-53894ffde3a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/22d5da5f-41d9-4817-8519-b4788a9216a6')
  .query(true)
  .reply(200, {"jobId":"22d5da5f-41d9-4817-8519-b4788a9216a6","lastUpdateDateTime":"2021-02-23T19:35:33Z","createdDateTime":"2021-02-23T19:35:33Z","expirationDateTime":"2021-02-24T19:35:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'd53f27b6-aa30-470f-9cee-ef63eba89041',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/22d5da5f-41d9-4817-8519-b4788a9216a6')
  .query(true)
  .reply(200, {"jobId":"22d5da5f-41d9-4817-8519-b4788a9216a6","lastUpdateDateTime":"2021-02-23T19:35:33Z","createdDateTime":"2021-02-23T19:35:33Z","expirationDateTime":"2021-02-24T19:35:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '580a9044-2812-44a3-8486-c6008a72d7dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/22d5da5f-41d9-4817-8519-b4788a9216a6')
  .query(true)
  .reply(200, {"jobId":"22d5da5f-41d9-4817-8519-b4788a9216a6","lastUpdateDateTime":"2021-02-23T19:35:37Z","createdDateTime":"2021-02-23T19:35:33Z","expirationDateTime":"2021-02-24T19:35:33Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '37dd75ca-7cb5-40e7-8a08-d58810536649',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/22d5da5f-41d9-4817-8519-b4788a9216a6')
  .query(true)
  .reply(200, {"jobId":"22d5da5f-41d9-4817-8519-b4788a9216a6","lastUpdateDateTime":"2021-02-23T19:35:37Z","createdDateTime":"2021-02-23T19:35:33Z","expirationDateTime":"2021-02-24T19:35:33Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'c97ecf07-4913-4693-8c8b-ed627a9cc49a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/22d5da5f-41d9-4817-8519-b4788a9216a6')
  .query(true)
  .reply(200, {"jobId":"22d5da5f-41d9-4817-8519-b4788a9216a6","lastUpdateDateTime":"2021-02-23T19:35:37Z","createdDateTime":"2021-02-23T19:35:33Z","expirationDateTime":"2021-02-24T19:35:33Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'f293b475-d8f2-4ea0-804a-771a9b87971b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:39 GMT'
]);

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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/84743ba8-8a78-49e3-ba42-77470f0e87c4',
  'x-envoy-upstream-service-time',
  '867',
  'apim-request-id',
  'e5108a4e-2531-470f-b228-f43b63d4a8c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/84743ba8-8a78-49e3-ba42-77470f0e87c4')
  .query(true)
  .reply(200, {"jobId":"84743ba8-8a78-49e3-ba42-77470f0e87c4","lastUpdateDateTime":"2021-02-23T02:42:49Z","createdDateTime":"2021-02-23T02:42:48Z","expirationDateTime":"2021-02-24T02:42:48Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5855400a-cf36-4a8e-8562-892c47d2be9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/84743ba8-8a78-49e3-ba42-77470f0e87c4')
  .query(true)
  .reply(200, {"jobId":"84743ba8-8a78-49e3-ba42-77470f0e87c4","lastUpdateDateTime":"2021-02-23T02:42:49Z","createdDateTime":"2021-02-23T02:42:48Z","expirationDateTime":"2021-02-24T02:42:48Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'fcd64483-222e-4969-803f-3fea4f729bde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/84743ba8-8a78-49e3-ba42-77470f0e87c4')
  .query(true)
  .reply(200, {"jobId":"84743ba8-8a78-49e3-ba42-77470f0e87c4","lastUpdateDateTime":"2021-02-23T02:42:51Z","createdDateTime":"2021-02-23T02:42:48Z","expirationDateTime":"2021-02-24T02:42:48Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'd4a60dee-1d0c-4c3b-b05c-4b6e4b3282e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/84743ba8-8a78-49e3-ba42-77470f0e87c4')
  .query(true)
  .reply(200, {"jobId":"84743ba8-8a78-49e3-ba42-77470f0e87c4","lastUpdateDateTime":"2021-02-23T02:42:51Z","createdDateTime":"2021-02-23T02:42:48Z","expirationDateTime":"2021-02-24T02:42:48Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '4a0f1172-08f1-4a79-aef5-f514f11b32d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:51 GMT'
]);

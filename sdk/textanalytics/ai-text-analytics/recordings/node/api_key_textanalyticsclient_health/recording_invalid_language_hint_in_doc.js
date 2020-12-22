let nock = require('nock');

module.exports.hash = "303dd6a20103fef6f7b1df0eb73478c1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/e8009ef9-91e0-4de0-8754-b29165a8f902',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '09acf17c-1f65-45a8-9135-6f74bfae56c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e8009ef9-91e0-4de0-8754-b29165a8f902')
  .query(true)
  .reply(200, {"jobId":"e8009ef9-91e0-4de0-8754-b29165a8f902","lastUpdateDateTime":"2020-11-20T00:13:34Z","createdDateTime":"2020-11-20T00:13:34Z","expirationDateTime":"2020-11-21T00:13:34Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7e4de890-fe0c-42b4-a5d9-46d51e43852d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e8009ef9-91e0-4de0-8754-b29165a8f902')
  .query(true)
  .reply(200, {"jobId":"e8009ef9-91e0-4de0-8754-b29165a8f902","lastUpdateDateTime":"2020-11-20T00:13:34Z","createdDateTime":"2020-11-20T00:13:34Z","expirationDateTime":"2020-11-21T00:13:34Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '074a15de-fc15-4469-8ca7-0bee2b4d7068',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e8009ef9-91e0-4de0-8754-b29165a8f902')
  .query(true)
  .reply(200, {"jobId":"e8009ef9-91e0-4de0-8754-b29165a8f902","lastUpdateDateTime":"2020-11-20T00:13:34Z","createdDateTime":"2020-11-20T00:13:34Z","expirationDateTime":"2020-11-21T00:13:34Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '7ec9e3e0-2956-4827-b837-4bdaf4ae3f63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e8009ef9-91e0-4de0-8754-b29165a8f902')
  .query(true)
  .reply(200, {"jobId":"e8009ef9-91e0-4de0-8754-b29165a8f902","lastUpdateDateTime":"2020-11-20T00:13:37Z","createdDateTime":"2020-11-20T00:13:34Z","expirationDateTime":"2020-11-21T00:13:34Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '30',
  'apim-request-id',
  '6d54601e-5642-48b4-bc23-29a52a28f350',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e8009ef9-91e0-4de0-8754-b29165a8f902')
  .query(true)
  .reply(200, {"jobId":"e8009ef9-91e0-4de0-8754-b29165a8f902","lastUpdateDateTime":"2020-11-20T00:13:37Z","createdDateTime":"2020-11-20T00:13:34Z","expirationDateTime":"2020-11-21T00:13:34Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'df259642-91ea-4c4c-aa6c-ad5ba2d8bac5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:38 GMT'
]);

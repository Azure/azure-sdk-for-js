let nock = require('nock');

module.exports.hash = "a2af35bb8906288de33b66444bb8db36";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/8cd9e5a2-8394-470b-be3a-916b9f3e74cf',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '6100bb79-da5d-4461-9135-b2ffa1e5c9ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8cd9e5a2-8394-470b-be3a-916b9f3e74cf')
  .query(true)
  .reply(200, {"jobId":"8cd9e5a2-8394-470b-be3a-916b9f3e74cf","lastUpdateDateTime":"2021-02-23T02:42:52Z","createdDateTime":"2021-02-23T02:42:52Z","expirationDateTime":"2021-02-24T02:42:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9603927b-6f6a-4fb4-8db1-caf0b0715eaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8cd9e5a2-8394-470b-be3a-916b9f3e74cf')
  .query(true)
  .reply(200, {"jobId":"8cd9e5a2-8394-470b-be3a-916b9f3e74cf","lastUpdateDateTime":"2021-02-23T02:42:52Z","createdDateTime":"2021-02-23T02:42:52Z","expirationDateTime":"2021-02-24T02:42:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '505278d6-c1a5-411b-95a0-b357e1c8d3e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8cd9e5a2-8394-470b-be3a-916b9f3e74cf')
  .query(true)
  .reply(200, {"jobId":"8cd9e5a2-8394-470b-be3a-916b9f3e74cf","lastUpdateDateTime":"2021-02-23T02:42:52Z","createdDateTime":"2021-02-23T02:42:52Z","expirationDateTime":"2021-02-24T02:42:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'cb0dc52c-0c1b-4174-a665-50fcdfb0110f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8cd9e5a2-8394-470b-be3a-916b9f3e74cf')
  .query(true)
  .reply(200, {"jobId":"8cd9e5a2-8394-470b-be3a-916b9f3e74cf","lastUpdateDateTime":"2021-02-23T02:42:52Z","createdDateTime":"2021-02-23T02:42:52Z","expirationDateTime":"2021-02-24T02:42:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '207474c1-cf34-4ae8-bf61-a49a1c3c9afe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8cd9e5a2-8394-470b-be3a-916b9f3e74cf')
  .query(true)
  .reply(200, {"jobId":"8cd9e5a2-8394-470b-be3a-916b9f3e74cf","lastUpdateDateTime":"2021-02-23T02:42:56Z","createdDateTime":"2021-02-23T02:42:52Z","expirationDateTime":"2021-02-24T02:42:52Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'e5cc00d7-9396-42f8-a2a4-75c09ef45159',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8cd9e5a2-8394-470b-be3a-916b9f3e74cf')
  .query(true)
  .reply(200, {"jobId":"8cd9e5a2-8394-470b-be3a-916b9f3e74cf","lastUpdateDateTime":"2021-02-23T02:42:56Z","createdDateTime":"2021-02-23T02:42:52Z","expirationDateTime":"2021-02-24T02:42:52Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '4692c83c-fad5-4bb5-ab29-4bd41e7722fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:57 GMT'
]);

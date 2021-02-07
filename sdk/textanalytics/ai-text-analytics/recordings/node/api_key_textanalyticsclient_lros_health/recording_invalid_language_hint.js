let nock = require('nock');

module.exports.hash = "3dddaab7b19e346d6e0f571162c30323";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/293d4da9-761c-406f-99b9-d67f0983c58f',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'b650d9cd-c8e9-4ac1-ba21-efd3ab72267f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/293d4da9-761c-406f-99b9-d67f0983c58f')
  .query(true)
  .reply(200, {"jobId":"293d4da9-761c-406f-99b9-d67f0983c58f","lastUpdateDateTime":"2020-12-30T17:29:02Z","createdDateTime":"2020-12-30T17:29:01Z","expirationDateTime":"2020-12-31T17:29:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1d3c53e0-64fc-47fb-8ae1-5fd4b10094d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/293d4da9-761c-406f-99b9-d67f0983c58f')
  .query(true)
  .reply(200, {"jobId":"293d4da9-761c-406f-99b9-d67f0983c58f","lastUpdateDateTime":"2020-12-30T17:29:02Z","createdDateTime":"2020-12-30T17:29:01Z","expirationDateTime":"2020-12-31T17:29:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'c2b625fb-3037-46a0-a2ca-c62fc90023f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/293d4da9-761c-406f-99b9-d67f0983c58f')
  .query(true)
  .reply(200, {"jobId":"293d4da9-761c-406f-99b9-d67f0983c58f","lastUpdateDateTime":"2020-12-30T17:29:02Z","createdDateTime":"2020-12-30T17:29:01Z","expirationDateTime":"2020-12-31T17:29:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'ab5c9176-09a2-490d-85f6-107c717cc5c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/293d4da9-761c-406f-99b9-d67f0983c58f')
  .query(true)
  .reply(200, {"jobId":"293d4da9-761c-406f-99b9-d67f0983c58f","lastUpdateDateTime":"2020-12-30T17:29:05Z","createdDateTime":"2020-12-30T17:29:01Z","expirationDateTime":"2020-12-31T17:29:01Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  '44ae9d00-4792-45c3-bc94-23f38cf8db16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/293d4da9-761c-406f-99b9-d67f0983c58f')
  .query(true)
  .reply(200, {"jobId":"293d4da9-761c-406f-99b9-d67f0983c58f","lastUpdateDateTime":"2020-12-30T17:29:05Z","createdDateTime":"2020-12-30T17:29:01Z","expirationDateTime":"2020-12-31T17:29:01Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '2d5cf392-0e41-45c0-9e35-e3c2d18b70e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:29:05 GMT'
]);

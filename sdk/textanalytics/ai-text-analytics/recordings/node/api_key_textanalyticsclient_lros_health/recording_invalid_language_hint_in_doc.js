let nock = require('nock');

module.exports.hash = "0d5c1d3d6320331d571ad7ee110268a3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/79f8206c-e193-41e6-aeb3-58c41014ab9f',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'e7952883-ac23-49a0-be6f-139b5587d881',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/79f8206c-e193-41e6-aeb3-58c41014ab9f')
  .query(true)
  .reply(200, {"jobId":"79f8206c-e193-41e6-aeb3-58c41014ab9f","lastUpdateDateTime":"2020-12-22T20:08:25Z","createdDateTime":"2020-12-22T20:08:25Z","expirationDateTime":"2020-12-23T20:08:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '21576713-f072-4714-a93c-b9260fe096aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/79f8206c-e193-41e6-aeb3-58c41014ab9f')
  .query(true)
  .reply(200, {"jobId":"79f8206c-e193-41e6-aeb3-58c41014ab9f","lastUpdateDateTime":"2020-12-22T20:08:25Z","createdDateTime":"2020-12-22T20:08:25Z","expirationDateTime":"2020-12-23T20:08:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '06edcc7b-d84a-47e8-a9ea-30c70836f9d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/79f8206c-e193-41e6-aeb3-58c41014ab9f')
  .query(true)
  .reply(200, {"jobId":"79f8206c-e193-41e6-aeb3-58c41014ab9f","lastUpdateDateTime":"2020-12-22T20:08:25Z","createdDateTime":"2020-12-22T20:08:25Z","expirationDateTime":"2020-12-23T20:08:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '4895c957-10bb-4deb-8303-96b2b5e933eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/79f8206c-e193-41e6-aeb3-58c41014ab9f')
  .query(true)
  .reply(200, {"jobId":"79f8206c-e193-41e6-aeb3-58c41014ab9f","lastUpdateDateTime":"2020-12-22T20:08:28Z","createdDateTime":"2020-12-22T20:08:25Z","expirationDateTime":"2020-12-23T20:08:25Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'f82ec142-1bd3-4e2f-ae89-ba35905f18bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/79f8206c-e193-41e6-aeb3-58c41014ab9f')
  .query(true)
  .reply(200, {"jobId":"79f8206c-e193-41e6-aeb3-58c41014ab9f","lastUpdateDateTime":"2020-12-22T20:08:28Z","createdDateTime":"2020-12-22T20:08:25Z","expirationDateTime":"2020-12-23T20:08:25Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '9b089d65-1c27-4675-8850-e425399ab06e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:28 GMT'
]);

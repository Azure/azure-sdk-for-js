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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/b61b11e2-8317-4a62-9a67-905e7f57b6e9',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'c3fb25aa-7dcf-4ce9-9300-3cf115d3806e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b61b11e2-8317-4a62-9a67-905e7f57b6e9')
  .query(true)
  .reply(200, {"jobId":"b61b11e2-8317-4a62-9a67-905e7f57b6e9","lastUpdateDateTime":"2021-04-28T20:14:40Z","createdDateTime":"2021-04-28T20:14:40Z","expirationDateTime":"2021-04-29T20:14:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '078de16c-61a2-47b0-8202-a369247f7b4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b61b11e2-8317-4a62-9a67-905e7f57b6e9')
  .query(true)
  .reply(200, {"jobId":"b61b11e2-8317-4a62-9a67-905e7f57b6e9","lastUpdateDateTime":"2021-04-28T20:14:40Z","createdDateTime":"2021-04-28T20:14:40Z","expirationDateTime":"2021-04-29T20:14:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c314521a-0c36-4569-8889-50b1c34f4850',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b61b11e2-8317-4a62-9a67-905e7f57b6e9')
  .query(true)
  .reply(200, {"jobId":"b61b11e2-8317-4a62-9a67-905e7f57b6e9","lastUpdateDateTime":"2021-04-28T20:14:41Z","createdDateTime":"2021-04-28T20:14:40Z","expirationDateTime":"2021-04-29T20:14:40Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'cf698762-63ee-4d2d-87fe-295b8573ac9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b61b11e2-8317-4a62-9a67-905e7f57b6e9')
  .query(true)
  .reply(200, {"jobId":"b61b11e2-8317-4a62-9a67-905e7f57b6e9","lastUpdateDateTime":"2021-04-28T20:14:41Z","createdDateTime":"2021-04-28T20:14:40Z","expirationDateTime":"2021-04-29T20:14:40Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  'a658cfea-2a30-44a2-a5cc-4ea2ace8f7ab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:41 GMT'
]);

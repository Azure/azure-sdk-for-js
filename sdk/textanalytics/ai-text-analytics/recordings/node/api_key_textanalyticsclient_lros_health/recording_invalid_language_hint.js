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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'b4d3b31e-9393-4bc0-a585-a35e38a8aa33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631')
  .query(true)
  .reply(200, {"jobId":"ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631","lastUpdateDateTime":"2021-04-28T21:05:22Z","createdDateTime":"2021-04-28T21:05:22Z","expirationDateTime":"2021-04-29T21:05:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'bed78db6-2208-4fff-b650-5cf97cc53353',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631')
  .query(true)
  .reply(200, {"jobId":"ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631","lastUpdateDateTime":"2021-04-28T21:05:22Z","createdDateTime":"2021-04-28T21:05:22Z","expirationDateTime":"2021-04-29T21:05:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e432f3c5-9ba2-4161-9da5-1b6c00c28c2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631')
  .query(true)
  .reply(200, {"jobId":"ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631","lastUpdateDateTime":"2021-04-28T21:05:24Z","createdDateTime":"2021-04-28T21:05:22Z","expirationDateTime":"2021-04-29T21:05:22Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  '64196999-b365-4b62-8985-4835b4f95f05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631')
  .query(true)
  .reply(200, {"jobId":"ff3fc723-c2dc-4d3f-84fc-5cbbfa6bf631","lastUpdateDateTime":"2021-04-28T21:05:24Z","createdDateTime":"2021-04-28T21:05:22Z","expirationDateTime":"2021-04-29T21:05:22Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  '1b30cbf2-b1da-4b8c-a843-1c1d3dd42cf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:24 GMT'
]);

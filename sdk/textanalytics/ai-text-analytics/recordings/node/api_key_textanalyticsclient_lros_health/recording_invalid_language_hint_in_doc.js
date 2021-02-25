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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/8d55edc3-73b3-41a8-abfe-3dabc8abb3dc',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'f12b26ab-dd50-4c86-8540-977d89e0717b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8d55edc3-73b3-41a8-abfe-3dabc8abb3dc')
  .query(true)
  .reply(200, {"jobId":"8d55edc3-73b3-41a8-abfe-3dabc8abb3dc","lastUpdateDateTime":"2021-02-23T19:35:39Z","createdDateTime":"2021-02-23T19:35:39Z","expirationDateTime":"2021-02-24T19:35:39Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c7d7bd8e-aaa1-44c5-8c59-1bdc9bb3c193',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8d55edc3-73b3-41a8-abfe-3dabc8abb3dc')
  .query(true)
  .reply(200, {"jobId":"8d55edc3-73b3-41a8-abfe-3dabc8abb3dc","lastUpdateDateTime":"2021-02-23T19:35:39Z","createdDateTime":"2021-02-23T19:35:39Z","expirationDateTime":"2021-02-24T19:35:39Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'dfb50418-da73-415f-a9e7-f8a7d82f33a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8d55edc3-73b3-41a8-abfe-3dabc8abb3dc')
  .query(true)
  .reply(200, {"jobId":"8d55edc3-73b3-41a8-abfe-3dabc8abb3dc","lastUpdateDateTime":"2021-02-23T19:35:41Z","createdDateTime":"2021-02-23T19:35:39Z","expirationDateTime":"2021-02-24T19:35:39Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '50ab0cd1-a915-4a79-8657-17ff4c8720f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/8d55edc3-73b3-41a8-abfe-3dabc8abb3dc')
  .query(true)
  .reply(200, {"jobId":"8d55edc3-73b3-41a8-abfe-3dabc8abb3dc","lastUpdateDateTime":"2021-02-23T19:35:41Z","createdDateTime":"2021-02-23T19:35:39Z","expirationDateTime":"2021-02-24T19:35:39Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'f0a5f0c7-bbe5-495f-911a-e754a65892c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:41 GMT'
]);

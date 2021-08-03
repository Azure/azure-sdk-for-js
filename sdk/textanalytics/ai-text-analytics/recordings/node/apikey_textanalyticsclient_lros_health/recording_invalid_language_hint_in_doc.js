let nock = require('nock');

module.exports.hash = "95091b45dc61495bb4243ad632fd8fa2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/d25f7790-23a8-463d-b651-7cc227eb18d9',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '93630e8a-66d2-4266-8fb2-b031ceee1f49',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:42 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d25f7790-23a8-463d-b651-7cc227eb18d9')
  .query(true)
  .reply(200, {"jobId":"d25f7790-23a8-463d-b651-7cc227eb18d9","lastUpdateDateTime":"2021-08-03T03:16:43Z","createdDateTime":"2021-08-03T03:16:43Z","expirationDateTime":"2021-08-04T03:16:43Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2f491811-9c33-40d3-8bb6-49942a0744fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d25f7790-23a8-463d-b651-7cc227eb18d9')
  .query(true)
  .reply(200, {"jobId":"d25f7790-23a8-463d-b651-7cc227eb18d9","lastUpdateDateTime":"2021-08-03T03:16:43Z","createdDateTime":"2021-08-03T03:16:43Z","expirationDateTime":"2021-08-04T03:16:43Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'e6c00115-98a7-40c8-82df-f8551e478fa8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:43 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d25f7790-23a8-463d-b651-7cc227eb18d9')
  .query(true)
  .reply(200, {"jobId":"d25f7790-23a8-463d-b651-7cc227eb18d9","lastUpdateDateTime":"2021-08-03T03:16:43Z","createdDateTime":"2021-08-03T03:16:43Z","expirationDateTime":"2021-08-04T03:16:43Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '19408725-bb53-4555-99f9-58ce9e466d40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:45 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d25f7790-23a8-463d-b651-7cc227eb18d9')
  .query(true)
  .reply(200, {"jobId":"d25f7790-23a8-463d-b651-7cc227eb18d9","lastUpdateDateTime":"2021-08-03T03:16:47Z","createdDateTime":"2021-08-03T03:16:43Z","expirationDateTime":"2021-08-04T03:16:43Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '8715305a-2a3e-4056-b755-d8af4439d97c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:47 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/d25f7790-23a8-463d-b651-7cc227eb18d9')
  .query(true)
  .reply(200, {"jobId":"d25f7790-23a8-463d-b651-7cc227eb18d9","lastUpdateDateTime":"2021-08-03T03:16:47Z","createdDateTime":"2021-08-03T03:16:43Z","expirationDateTime":"2021-08-04T03:16:43Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'c7bf2fc5-2116-4805-821f-e9223612ff28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:47 GMT'
]);

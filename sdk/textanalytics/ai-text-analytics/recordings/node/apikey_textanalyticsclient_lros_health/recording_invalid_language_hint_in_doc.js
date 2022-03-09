let nock = require('nock');

module.exports.hash = "95091b45dc61495bb4243ad632fd8fa2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/a1f47bab-9c8e-4d9f-acec-8f0636fa1b14',
  'x-envoy-upstream-service-time',
  '352',
  'apim-request-id',
  'bde29f15-6ebe-42bf-836f-01024afa2400',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a1f47bab-9c8e-4d9f-acec-8f0636fa1b14')
  .query(true)
  .reply(200, {"jobId":"a1f47bab-9c8e-4d9f-acec-8f0636fa1b14","lastUpdateDateTime":"2021-10-23T00:42:57Z","createdDateTime":"2021-10-23T00:42:57Z","expirationDateTime":"2021-10-24T00:42:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'b238bb40-08bc-4003-81c6-caeb7dfcd382',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a1f47bab-9c8e-4d9f-acec-8f0636fa1b14')
  .query(true)
  .reply(200, {"jobId":"a1f47bab-9c8e-4d9f-acec-8f0636fa1b14","lastUpdateDateTime":"2021-10-23T00:42:57Z","createdDateTime":"2021-10-23T00:42:57Z","expirationDateTime":"2021-10-24T00:42:57Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'e15c3b0e-7acf-4466-ab94-e4bf2c130e21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a1f47bab-9c8e-4d9f-acec-8f0636fa1b14')
  .query(true)
  .reply(200, {"jobId":"a1f47bab-9c8e-4d9f-acec-8f0636fa1b14","lastUpdateDateTime":"2021-10-23T00:42:58Z","createdDateTime":"2021-10-23T00:42:57Z","expirationDateTime":"2021-10-24T00:42:57Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'bc79b900-8f32-4925-b7b0-05217cee158c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/a1f47bab-9c8e-4d9f-acec-8f0636fa1b14')
  .query(true)
  .reply(200, {"jobId":"a1f47bab-9c8e-4d9f-acec-8f0636fa1b14","lastUpdateDateTime":"2021-10-23T00:42:58Z","createdDateTime":"2021-10-23T00:42:57Z","expirationDateTime":"2021-10-24T00:42:57Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '6da4bba5-93eb-42f3-89d0-7d97cbe62a3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:59 GMT'
]);

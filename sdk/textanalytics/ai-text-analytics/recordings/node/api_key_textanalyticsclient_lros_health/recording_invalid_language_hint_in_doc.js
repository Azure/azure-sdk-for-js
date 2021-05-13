let nock = require('nock');

module.exports.hash = "a2af35bb8906288de33b66444bb8db36";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"1","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/f3d66aa1-0294-4af3-9a5e-7457bc9549a5',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '2df18977-e2af-49c6-afb7-bf2c47a74225',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/f3d66aa1-0294-4af3-9a5e-7457bc9549a5')
  .query(true)
  .reply(200, {"jobId":"f3d66aa1-0294-4af3-9a5e-7457bc9549a5","lastUpdateDateTime":"2021-05-12T19:05:37Z","createdDateTime":"2021-05-12T19:05:37Z","expirationDateTime":"2021-05-13T19:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bcada3fd-47f9-44bc-8fa1-70655c65f03c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/f3d66aa1-0294-4af3-9a5e-7457bc9549a5')
  .query(true)
  .reply(200, {"jobId":"f3d66aa1-0294-4af3-9a5e-7457bc9549a5","lastUpdateDateTime":"2021-05-12T19:05:37Z","createdDateTime":"2021-05-12T19:05:37Z","expirationDateTime":"2021-05-13T19:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '1c8408d5-82f8-4bc7-a88a-0601ec354321',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/f3d66aa1-0294-4af3-9a5e-7457bc9549a5')
  .query(true)
  .reply(200, {"jobId":"f3d66aa1-0294-4af3-9a5e-7457bc9549a5","lastUpdateDateTime":"2021-05-12T19:05:37Z","createdDateTime":"2021-05-12T19:05:37Z","expirationDateTime":"2021-05-13T19:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'bddb895a-5d2f-47c5-b284-f02a3f5c33b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/f3d66aa1-0294-4af3-9a5e-7457bc9549a5')
  .query(true)
  .reply(200, {"jobId":"f3d66aa1-0294-4af3-9a5e-7457bc9549a5","lastUpdateDateTime":"2021-05-12T19:05:37Z","createdDateTime":"2021-05-12T19:05:37Z","expirationDateTime":"2021-05-13T19:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd85446af-6e02-4f16-baf6-a3f9a5d8ab4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/f3d66aa1-0294-4af3-9a5e-7457bc9549a5')
  .query(true)
  .reply(200, {"jobId":"f3d66aa1-0294-4af3-9a5e-7457bc9549a5","lastUpdateDateTime":"2021-05-12T19:05:37Z","createdDateTime":"2021-05-12T19:05:37Z","expirationDateTime":"2021-05-13T19:05:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '46750e06-713e-4f82-a09e-f519f9c0d090',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/f3d66aa1-0294-4af3-9a5e-7457bc9549a5')
  .query(true)
  .reply(200, {"jobId":"f3d66aa1-0294-4af3-9a5e-7457bc9549a5","lastUpdateDateTime":"2021-05-12T19:05:44Z","createdDateTime":"2021-05-12T19:05:37Z","expirationDateTime":"2021-05-13T19:05:37Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '8892d07e-c4c7-4d54-a36c-d46ed380c118',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/f3d66aa1-0294-4af3-9a5e-7457bc9549a5')
  .query(true)
  .reply(200, {"jobId":"f3d66aa1-0294-4af3-9a5e-7457bc9549a5","lastUpdateDateTime":"2021-05-12T19:05:44Z","createdDateTime":"2021-05-12T19:05:37Z","expirationDateTime":"2021-05-13T19:05:37Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '204657b8-6f7e-46c3-af5f-e9bd44748e10',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:45 GMT'
]);

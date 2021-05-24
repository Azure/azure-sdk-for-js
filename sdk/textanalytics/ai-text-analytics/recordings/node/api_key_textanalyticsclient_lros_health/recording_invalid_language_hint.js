let nock = require('nock');

module.exports.hash = "ccc06bbc882856bacdf46a31a9bfb5a0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"0","text":"This should fail because we're passing in an invalid language hint","language":"notalanguage"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/7c5f835c-31c0-4c95-932f-84b9a6c0e515',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '179daa9e-d865-466c-a416-10e73b6bd16c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/7c5f835c-31c0-4c95-932f-84b9a6c0e515')
  .query(true)
  .reply(200, {"jobId":"7c5f835c-31c0-4c95-932f-84b9a6c0e515","lastUpdateDateTime":"2021-05-12T19:05:32Z","createdDateTime":"2021-05-12T19:05:32Z","expirationDateTime":"2021-05-13T19:05:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '12419ec6-9a4a-4453-8a0d-39ff66ea9dfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/7c5f835c-31c0-4c95-932f-84b9a6c0e515')
  .query(true)
  .reply(200, {"jobId":"7c5f835c-31c0-4c95-932f-84b9a6c0e515","lastUpdateDateTime":"2021-05-12T19:05:32Z","createdDateTime":"2021-05-12T19:05:32Z","expirationDateTime":"2021-05-13T19:05:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c9119bb5-8dd4-4d11-a78d-b1f23941b220',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/7c5f835c-31c0-4c95-932f-84b9a6c0e515')
  .query(true)
  .reply(200, {"jobId":"7c5f835c-31c0-4c95-932f-84b9a6c0e515","lastUpdateDateTime":"2021-05-12T19:05:32Z","createdDateTime":"2021-05-12T19:05:32Z","expirationDateTime":"2021-05-13T19:05:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1f230032-cf00-4450-94ea-f196b3eccc85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/7c5f835c-31c0-4c95-932f-84b9a6c0e515')
  .query(true)
  .reply(200, {"jobId":"7c5f835c-31c0-4c95-932f-84b9a6c0e515","lastUpdateDateTime":"2021-05-12T19:05:36Z","createdDateTime":"2021-05-12T19:05:32Z","expirationDateTime":"2021-05-13T19:05:32Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '3b5466f6-1e4b-4c40-ac0e-e2023517fa3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/7c5f835c-31c0-4c95-932f-84b9a6c0e515')
  .query(true)
  .reply(200, {"jobId":"7c5f835c-31c0-4c95-932f-84b9a6c0e515","lastUpdateDateTime":"2021-05-12T19:05:36Z","createdDateTime":"2021-05-12T19:05:32Z","expirationDateTime":"2021-05-13T19:05:32Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"0","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'e071b672-421a-4829-ac2f-99bc59471767',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:05:36 GMT'
]);

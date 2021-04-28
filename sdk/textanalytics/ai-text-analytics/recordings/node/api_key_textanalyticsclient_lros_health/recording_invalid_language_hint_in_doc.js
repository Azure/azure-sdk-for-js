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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/37487979-992a-4b45-8cad-3ff236c64dd6',
  'x-envoy-upstream-service-time',
  '7619',
  'apim-request-id',
  'dc75b0e8-edca-434c-aa29-2dc68241f96b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/37487979-992a-4b45-8cad-3ff236c64dd6')
  .query(true)
  .reply(200, {"jobId":"37487979-992a-4b45-8cad-3ff236c64dd6","lastUpdateDateTime":"2021-04-28T20:14:50Z","createdDateTime":"2021-04-28T20:14:42Z","expirationDateTime":"2021-04-29T20:14:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '779c1c02-bfe3-42b8-91bb-a6e3074306f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/37487979-992a-4b45-8cad-3ff236c64dd6')
  .query(true)
  .reply(200, {"jobId":"37487979-992a-4b45-8cad-3ff236c64dd6","lastUpdateDateTime":"2021-04-28T20:14:50Z","createdDateTime":"2021-04-28T20:14:42Z","expirationDateTime":"2021-04-29T20:14:42Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f896586a-ad22-421a-9ea7-950d843246ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/37487979-992a-4b45-8cad-3ff236c64dd6')
  .query(true)
  .reply(200, {"jobId":"37487979-992a-4b45-8cad-3ff236c64dd6","lastUpdateDateTime":"2021-04-28T20:14:51Z","createdDateTime":"2021-04-28T20:14:42Z","expirationDateTime":"2021-04-29T20:14:42Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '29',
  'apim-request-id',
  'e2f20b1a-ef86-4dec-88f8-f3c59b7f6dc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/37487979-992a-4b45-8cad-3ff236c64dd6')
  .query(true)
  .reply(200, {"jobId":"37487979-992a-4b45-8cad-3ff236c64dd6","lastUpdateDateTime":"2021-04-28T20:14:51Z","createdDateTime":"2021-04-28T20:14:42Z","expirationDateTime":"2021-04-29T20:14:42Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '0cc9a95b-24aa-4bf5-9070-b10e52a68868',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:52 GMT'
]);

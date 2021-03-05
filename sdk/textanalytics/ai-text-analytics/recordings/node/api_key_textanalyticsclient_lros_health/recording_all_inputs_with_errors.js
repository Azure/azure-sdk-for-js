let nock = require('nock');

module.exports.hash = "502c2a738b30a7fc46c968423a28b552";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/2fb503e0-e350-488e-9b45-8694b94465c1',
  'x-envoy-upstream-service-time',
  '230',
  'apim-request-id',
  'ab2dc3d0-34e5-4bb6-84a3-76fbf7f0ee99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2fb503e0-e350-488e-9b45-8694b94465c1')
  .query(true)
  .reply(200, {"jobId":"2fb503e0-e350-488e-9b45-8694b94465c1","lastUpdateDateTime":"2021-03-04T20:18:20Z","createdDateTime":"2021-03-04T20:18:20Z","expirationDateTime":"2021-03-05T20:18:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'dddef248-2ad7-4d5b-8bfe-743094732cbf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2fb503e0-e350-488e-9b45-8694b94465c1')
  .query(true)
  .reply(200, {"jobId":"2fb503e0-e350-488e-9b45-8694b94465c1","lastUpdateDateTime":"2021-03-04T20:18:20Z","createdDateTime":"2021-03-04T20:18:20Z","expirationDateTime":"2021-03-05T20:18:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd0cfac71-5fef-417d-975b-c7dc611282ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2fb503e0-e350-488e-9b45-8694b94465c1')
  .query(true)
  .reply(200, {"jobId":"2fb503e0-e350-488e-9b45-8694b94465c1","lastUpdateDateTime":"2021-03-04T20:18:20Z","createdDateTime":"2021-03-04T20:18:20Z","expirationDateTime":"2021-03-05T20:18:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'e52922c3-2d81-4544-8c03-24bbe776da50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2fb503e0-e350-488e-9b45-8694b94465c1')
  .query(true)
  .reply(200, {"jobId":"2fb503e0-e350-488e-9b45-8694b94465c1","lastUpdateDateTime":"2021-03-04T20:18:24Z","createdDateTime":"2021-03-04T20:18:20Z","expirationDateTime":"2021-03-05T20:18:20Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '987f2945-341c-47a7-a977-dee584d1d4cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2fb503e0-e350-488e-9b45-8694b94465c1')
  .query(true)
  .reply(200, {"jobId":"2fb503e0-e350-488e-9b45-8694b94465c1","lastUpdateDateTime":"2021-03-04T20:18:24Z","createdDateTime":"2021-03-04T20:18:20Z","expirationDateTime":"2021-03-05T20:18:20Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '26c87aad-730a-4d03-9d89-1998bb7cb5eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:25 GMT'
]);

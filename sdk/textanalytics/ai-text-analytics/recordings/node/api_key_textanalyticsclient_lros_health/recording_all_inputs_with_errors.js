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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/44a10f7e-c144-494f-8300-f30dd9c22a48',
  'x-envoy-upstream-service-time',
  '2661',
  'apim-request-id',
  '1d76c70e-f844-4a0b-948d-20b7dc25aa3e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/44a10f7e-c144-494f-8300-f30dd9c22a48')
  .query(true)
  .reply(200, {"jobId":"44a10f7e-c144-494f-8300-f30dd9c22a48","lastUpdateDateTime":"2021-04-28T21:04:38Z","createdDateTime":"2021-04-28T21:04:35Z","expirationDateTime":"2021-04-29T21:04:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4790662d-6316-4cb1-ab52-5235ebf8b3ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/44a10f7e-c144-494f-8300-f30dd9c22a48')
  .query(true)
  .reply(200, {"jobId":"44a10f7e-c144-494f-8300-f30dd9c22a48","lastUpdateDateTime":"2021-04-28T21:04:38Z","createdDateTime":"2021-04-28T21:04:35Z","expirationDateTime":"2021-04-29T21:04:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '71171e88-6107-41da-8c97-18542dd3c3fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/44a10f7e-c144-494f-8300-f30dd9c22a48')
  .query(true)
  .reply(200, {"jobId":"44a10f7e-c144-494f-8300-f30dd9c22a48","lastUpdateDateTime":"2021-04-28T21:04:39Z","createdDateTime":"2021-04-28T21:04:35Z","expirationDateTime":"2021-04-29T21:04:35Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10117',
  'apim-request-id',
  '07f01080-75ba-4b2d-9df0-9a71cc1d59a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/44a10f7e-c144-494f-8300-f30dd9c22a48')
  .query(true)
  .reply(200, {"jobId":"44a10f7e-c144-494f-8300-f30dd9c22a48","lastUpdateDateTime":"2021-04-28T21:04:39Z","createdDateTime":"2021-04-28T21:04:35Z","expirationDateTime":"2021-04-29T21:04:35Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '9a8a355c-ff10-4d89-b8a0-861108f56bfb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:49 GMT'
]);

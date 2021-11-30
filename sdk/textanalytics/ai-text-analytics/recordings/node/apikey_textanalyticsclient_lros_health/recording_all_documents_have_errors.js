let nock = require('nock');

module.exports.hash = "312581be23da2744639956ae58b5b5f3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"1","text":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":"english"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/entities/health/jobs/a27f1804-8f8b-48f3-a204-ed2823e9b3ff',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  '500a69bf-1a28-4105-8810-6c5c678352d4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 29 Nov 2021 22:47:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/entities/health/jobs/a27f1804-8f8b-48f3-a204-ed2823e9b3ff')
  .query(true)
  .reply(200, {"jobId":"a27f1804-8f8b-48f3-a204-ed2823e9b3ff","lastUpdateDateTime":"2021-11-29T22:47:02Z","createdDateTime":"2021-11-29T22:47:02Z","expirationDateTime":"2021-11-30T22:47:02Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '5c090303-5654-489a-abc1-f3523789fb63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 29 Nov 2021 22:47:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/entities/health/jobs/a27f1804-8f8b-48f3-a204-ed2823e9b3ff')
  .query(true)
  .reply(200, {"jobId":"a27f1804-8f8b-48f3-a204-ed2823e9b3ff","lastUpdateDateTime":"2021-11-29T22:47:02Z","createdDateTime":"2021-11-29T22:47:02Z","expirationDateTime":"2021-11-30T22:47:02Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  '805938f1-1992-48f3-9076-53ed2675b32b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 29 Nov 2021 22:47:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/entities/health/jobs/a27f1804-8f8b-48f3-a204-ed2823e9b3ff')
  .query(true)
  .reply(200, {"jobId":"a27f1804-8f8b-48f3-a204-ed2823e9b3ff","lastUpdateDateTime":"2021-11-29T22:47:03Z","createdDateTime":"2021-11-29T22:47:02Z","expirationDateTime":"2021-11-30T22:47:02Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  'c3322726-ba90-4872-9b71-568552029466',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 29 Nov 2021 22:47:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/entities/health/jobs/a27f1804-8f8b-48f3-a204-ed2823e9b3ff')
  .query(true)
  .reply(200, {"jobId":"a27f1804-8f8b-48f3-a204-ed2823e9b3ff","lastUpdateDateTime":"2021-11-29T22:47:03Z","createdDateTime":"2021-11-29T22:47:02Z","expirationDateTime":"2021-11-30T22:47:02Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '207',
  'apim-request-id',
  'f3a807d3-6cdc-471f-b0f3-767d5d760c41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 29 Nov 2021 22:47:05 GMT'
]);

let nock = require('nock');

module.exports.hash = "502c2a738b30a7fc46c968423a28b552";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'd6a7fae8-118c-46dd-9450-c8d15072606f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7')
  .query(true)
  .reply(200, {"jobId":"0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7","lastUpdateDateTime":"2021-05-12T19:04:43Z","createdDateTime":"2021-05-12T19:04:43Z","expirationDateTime":"2021-05-13T19:04:43Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '26902e56-5083-4c0a-93f3-5180e17bb375',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7')
  .query(true)
  .reply(200, {"jobId":"0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7","lastUpdateDateTime":"2021-05-12T19:04:43Z","createdDateTime":"2021-05-12T19:04:43Z","expirationDateTime":"2021-05-13T19:04:43Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '994a87b8-4326-4c26-b168-84ddef4e78f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7')
  .query(true)
  .reply(200, {"jobId":"0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7","lastUpdateDateTime":"2021-05-12T19:04:43Z","createdDateTime":"2021-05-12T19:04:43Z","expirationDateTime":"2021-05-13T19:04:43Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'dda82688-a216-4d47-9e65-c37043ae173f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7')
  .query(true)
  .reply(200, {"jobId":"0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7","lastUpdateDateTime":"2021-05-12T19:04:46Z","createdDateTime":"2021-05-12T19:04:43Z","expirationDateTime":"2021-05-13T19:04:43Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'c9d45d81-5034-4f28-bb63-8f8ad743c7e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7')
  .query(true)
  .reply(200, {"jobId":"0c5bc7b0-8bdb-4819-a15c-77e4c497d1f7","lastUpdateDateTime":"2021-05-12T19:04:46Z","createdDateTime":"2021-05-12T19:04:43Z","expirationDateTime":"2021-05-13T19:04:43Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en. For additional details see https://aka.ms/text-analytics/language-support"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  '23c5dff1-0648-45a3-b7d2-eb066420fb77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:47 GMT'
]);

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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/527cfeb3-2b0e-460f-a08c-cea1804715f4',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '68eaedd9-12df-48a9-80f1-6d3dd8d5ffb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/527cfeb3-2b0e-460f-a08c-cea1804715f4')
  .query(true)
  .reply(200, {"jobId":"527cfeb3-2b0e-460f-a08c-cea1804715f4","lastUpdateDateTime":"2021-02-23T19:34:47Z","createdDateTime":"2021-02-23T19:34:47Z","expirationDateTime":"2021-02-24T19:34:47Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4eb039cb-b346-4beb-bded-8aa663e79252',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/527cfeb3-2b0e-460f-a08c-cea1804715f4')
  .query(true)
  .reply(200, {"jobId":"527cfeb3-2b0e-460f-a08c-cea1804715f4","lastUpdateDateTime":"2021-02-23T19:34:47Z","createdDateTime":"2021-02-23T19:34:47Z","expirationDateTime":"2021-02-24T19:34:47Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'bbac3762-bd3f-40df-b44d-d6ef0622d47d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/527cfeb3-2b0e-460f-a08c-cea1804715f4')
  .query(true)
  .reply(200, {"jobId":"527cfeb3-2b0e-460f-a08c-cea1804715f4","lastUpdateDateTime":"2021-02-23T19:34:47Z","createdDateTime":"2021-02-23T19:34:47Z","expirationDateTime":"2021-02-24T19:34:47Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'f8b1f8f6-2a04-4173-8737-e6cdd7924bc6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/527cfeb3-2b0e-460f-a08c-cea1804715f4')
  .query(true)
  .reply(200, {"jobId":"527cfeb3-2b0e-460f-a08c-cea1804715f4","lastUpdateDateTime":"2021-02-23T19:34:51Z","createdDateTime":"2021-02-23T19:34:47Z","expirationDateTime":"2021-02-24T19:34:47Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '304cc637-59c8-46ad-8a4a-30ebb8ef8621',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/527cfeb3-2b0e-460f-a08c-cea1804715f4')
  .query(true)
  .reply(200, {"jobId":"527cfeb3-2b0e-460f-a08c-cea1804715f4","lastUpdateDateTime":"2021-02-23T19:34:51Z","createdDateTime":"2021-02-23T19:34:47Z","expirationDateTime":"2021-02-24T19:34:47Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '7f7bf125-5dc6-4861-8ee8-a96b0466a04c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:51 GMT'
]);

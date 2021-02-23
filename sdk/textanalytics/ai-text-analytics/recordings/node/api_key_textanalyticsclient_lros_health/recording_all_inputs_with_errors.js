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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/178a80f7-ce5d-42e2-b785-41de280ad471',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  'bd5f8456-e47a-4c77-b804-bf14f4c10e65',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/178a80f7-ce5d-42e2-b785-41de280ad471')
  .query(true)
  .reply(200, {"jobId":"178a80f7-ce5d-42e2-b785-41de280ad471","lastUpdateDateTime":"2021-02-23T02:42:03Z","createdDateTime":"2021-02-23T02:42:03Z","expirationDateTime":"2021-02-24T02:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '8b37527d-8556-48aa-b8ec-fd8d43a76143',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/178a80f7-ce5d-42e2-b785-41de280ad471')
  .query(true)
  .reply(200, {"jobId":"178a80f7-ce5d-42e2-b785-41de280ad471","lastUpdateDateTime":"2021-02-23T02:42:03Z","createdDateTime":"2021-02-23T02:42:03Z","expirationDateTime":"2021-02-24T02:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'edea50a6-5126-4d03-be98-4d30b577f2ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/178a80f7-ce5d-42e2-b785-41de280ad471')
  .query(true)
  .reply(200, {"jobId":"178a80f7-ce5d-42e2-b785-41de280ad471","lastUpdateDateTime":"2021-02-23T02:42:03Z","createdDateTime":"2021-02-23T02:42:03Z","expirationDateTime":"2021-02-24T02:42:03Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a1812de0-97cf-40f0-b4f0-bd7a4b548485',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/178a80f7-ce5d-42e2-b785-41de280ad471')
  .query(true)
  .reply(200, {"jobId":"178a80f7-ce5d-42e2-b785-41de280ad471","lastUpdateDateTime":"2021-02-23T02:42:06Z","createdDateTime":"2021-02-23T02:42:03Z","expirationDateTime":"2021-02-24T02:42:03Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '040d3aff-884f-404d-9ed3-e5ced7e89482',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/178a80f7-ce5d-42e2-b785-41de280ad471')
  .query(true)
  .reply(200, {"jobId":"178a80f7-ce5d-42e2-b785-41de280ad471","lastUpdateDateTime":"2021-02-23T02:42:06Z","createdDateTime":"2021-02-23T02:42:03Z","expirationDateTime":"2021-02-24T02:42:03Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  'f5c4b490-0555-4c92-b8f5-59c57519b05c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:08 GMT'
]);

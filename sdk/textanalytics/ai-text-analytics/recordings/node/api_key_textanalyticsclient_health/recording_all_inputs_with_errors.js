let nock = require('nock');

module.exports.hash = "22d5d4de6cf514eaa1e38e764978709c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/930b5af3-9792-44f0-b5b1-30fe846b5783',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  'f2c6e4ec-8185-406e-ab21-990cbe9469c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:12:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/930b5af3-9792-44f0-b5b1-30fe846b5783')
  .query(true)
  .reply(200, {"jobId":"930b5af3-9792-44f0-b5b1-30fe846b5783","lastUpdateDateTime":"2020-11-20T00:12:59Z","createdDateTime":"2020-11-20T00:12:59Z","expirationDateTime":"2020-11-21T00:12:59Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '40a446dd-9265-4868-bbeb-82ada6eaf277',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:12:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/930b5af3-9792-44f0-b5b1-30fe846b5783')
  .query(true)
  .reply(200, {"jobId":"930b5af3-9792-44f0-b5b1-30fe846b5783","lastUpdateDateTime":"2020-11-20T00:12:59Z","createdDateTime":"2020-11-20T00:12:59Z","expirationDateTime":"2020-11-21T00:12:59Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '58318d2c-102a-49c9-8d8d-da63f552aa00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:12:58 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/930b5af3-9792-44f0-b5b1-30fe846b5783')
  .query(true)
  .reply(200, {"jobId":"930b5af3-9792-44f0-b5b1-30fe846b5783","lastUpdateDateTime":"2020-11-20T00:12:59Z","createdDateTime":"2020-11-20T00:12:59Z","expirationDateTime":"2020-11-21T00:12:59Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ac71a6eb-83ac-4531-96cf-8a631a1a1011',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/930b5af3-9792-44f0-b5b1-30fe846b5783')
  .query(true)
  .reply(200, {"jobId":"930b5af3-9792-44f0-b5b1-30fe846b5783","lastUpdateDateTime":"2020-11-20T00:13:02Z","createdDateTime":"2020-11-20T00:12:59Z","expirationDateTime":"2020-11-21T00:12:59Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'b4d2bf05-c837-4755-ba17-831101d915cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/930b5af3-9792-44f0-b5b1-30fe846b5783')
  .query(true)
  .reply(200, {"jobId":"930b5af3-9792-44f0-b5b1-30fe846b5783","lastUpdateDateTime":"2020-11-20T00:13:02Z","createdDateTime":"2020-11-20T00:12:59Z","expirationDateTime":"2020-11-21T00:12:59Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '4cdba016-bbf5-48ec-a05a-8a7d7dd63feb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:02 GMT'
]);

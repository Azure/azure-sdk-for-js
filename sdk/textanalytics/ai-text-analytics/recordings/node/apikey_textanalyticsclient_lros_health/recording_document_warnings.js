let nock = require('nock');

module.exports.hash = "e219eeaade4101fb86a8ad6fac7778fb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/945453ef-7f72-4bfd-ae25-940353a87d3d',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '8f20445e-4da5-44b6-bc8a-58ff01381ad2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/945453ef-7f72-4bfd-ae25-940353a87d3d')
  .query(true)
  .reply(200, {"jobId":"945453ef-7f72-4bfd-ae25-940353a87d3d","lastUpdateDateTime":"2021-08-03T22:43:14Z","createdDateTime":"2021-08-03T22:43:13Z","expirationDateTime":"2021-08-04T22:43:13Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '57153211-a9ba-4d41-ae44-3c49a722ba5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/945453ef-7f72-4bfd-ae25-940353a87d3d')
  .query(true)
  .reply(200, {"jobId":"945453ef-7f72-4bfd-ae25-940353a87d3d","lastUpdateDateTime":"2021-08-03T22:43:14Z","createdDateTime":"2021-08-03T22:43:13Z","expirationDateTime":"2021-08-04T22:43:13Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f5233566-e74a-45ae-b090-b0a47d3bca66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/945453ef-7f72-4bfd-ae25-940353a87d3d')
  .query(true)
  .reply(200, {"jobId":"945453ef-7f72-4bfd-ae25-940353a87d3d","lastUpdateDateTime":"2021-08-03T22:43:15Z","createdDateTime":"2021-08-03T22:43:13Z","expirationDateTime":"2021-08-04T22:43:13Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  'cfe7053c-c8e5-4a66-b154-9c0d37d4d8cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/945453ef-7f72-4bfd-ae25-940353a87d3d')
  .query(true)
  .reply(200, {"jobId":"945453ef-7f72-4bfd-ae25-940353a87d3d","lastUpdateDateTime":"2021-08-03T22:43:15Z","createdDateTime":"2021-08-03T22:43:13Z","expirationDateTime":"2021-08-04T22:43:13Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  '12521a24-2a49-43b7-a567-d3c0bb660741',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 22:43:15 GMT'
]);

let nock = require('nock');

module.exports.hash = "b5f82998ec382ffdc25c0a92c73703fd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/f8f279da-1634-4288-b4b8-501a80fd98bc',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  'd3d06a9c-1e86-43f4-9c7e-6d6adf1e6318',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f8f279da-1634-4288-b4b8-501a80fd98bc')
  .query(true)
  .reply(200, {"jobId":"f8f279da-1634-4288-b4b8-501a80fd98bc","lastUpdateDateTime":"2021-02-23T02:42:13Z","createdDateTime":"2021-02-23T02:42:13Z","expirationDateTime":"2021-02-24T02:42:13Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '178e1740-5a68-41b5-bec2-9a16d2c1b039',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f8f279da-1634-4288-b4b8-501a80fd98bc')
  .query(true)
  .reply(200, {"jobId":"f8f279da-1634-4288-b4b8-501a80fd98bc","lastUpdateDateTime":"2021-02-23T02:42:13Z","createdDateTime":"2021-02-23T02:42:13Z","expirationDateTime":"2021-02-24T02:42:13Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'e54d7099-5202-4c7d-9362-d89d99fdfa4f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f8f279da-1634-4288-b4b8-501a80fd98bc')
  .query(true)
  .reply(200, {"jobId":"f8f279da-1634-4288-b4b8-501a80fd98bc","lastUpdateDateTime":"2021-02-23T02:42:13Z","createdDateTime":"2021-02-23T02:42:13Z","expirationDateTime":"2021-02-24T02:42:13Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '07a4fd75-8ba2-4cfd-b509-ea2d5ffec7cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f8f279da-1634-4288-b4b8-501a80fd98bc')
  .query(true)
  .reply(200, {"jobId":"f8f279da-1634-4288-b4b8-501a80fd98bc","lastUpdateDateTime":"2021-02-23T02:42:16Z","createdDateTime":"2021-02-23T02:42:13Z","expirationDateTime":"2021-02-24T02:42:13Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '17d0044f-505b-44c5-ab31-6c4c735ba9d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f8f279da-1634-4288-b4b8-501a80fd98bc')
  .query(true)
  .reply(200, {"jobId":"f8f279da-1634-4288-b4b8-501a80fd98bc","lastUpdateDateTime":"2021-02-23T02:42:16Z","createdDateTime":"2021-02-23T02:42:13Z","expirationDateTime":"2021-02-24T02:42:13Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '45daba3d-c300-4a1b-9316-5b0df1f3398e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:17 GMT'
]);

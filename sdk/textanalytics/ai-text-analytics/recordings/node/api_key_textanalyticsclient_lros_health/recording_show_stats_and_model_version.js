let nock = require('nock');

module.exports.hash = "68e739025094d7d7ee600e41d62938a8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/40f00331-9414-440c-9594-6cfd3fe11eaa',
  'x-envoy-upstream-service-time',
  '259',
  'apim-request-id',
  '759982d7-f177-4992-afc1-13d9f9e50298',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/40f00331-9414-440c-9594-6cfd3fe11eaa')
  .query(true)
  .reply(200, {"jobId":"40f00331-9414-440c-9594-6cfd3fe11eaa","lastUpdateDateTime":"2021-02-23T19:35:08Z","createdDateTime":"2021-02-23T19:35:08Z","expirationDateTime":"2021-02-24T19:35:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'a38a7b67-8c29-4495-9f7f-1dd8bc95de52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/40f00331-9414-440c-9594-6cfd3fe11eaa')
  .query(true)
  .reply(200, {"jobId":"40f00331-9414-440c-9594-6cfd3fe11eaa","lastUpdateDateTime":"2021-02-23T19:35:08Z","createdDateTime":"2021-02-23T19:35:08Z","expirationDateTime":"2021-02-24T19:35:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f5d44fd1-7442-4c1f-a1ed-d838079fe3ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:07 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/40f00331-9414-440c-9594-6cfd3fe11eaa')
  .query(true)
  .reply(200, {"jobId":"40f00331-9414-440c-9594-6cfd3fe11eaa","lastUpdateDateTime":"2021-02-23T19:35:08Z","createdDateTime":"2021-02-23T19:35:08Z","expirationDateTime":"2021-02-24T19:35:08Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '37c00026-48b4-4539-9486-f257872525bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/40f00331-9414-440c-9594-6cfd3fe11eaa')
  .query(true)
  .reply(200, {"jobId":"40f00331-9414-440c-9594-6cfd3fe11eaa","lastUpdateDateTime":"2021-02-23T19:35:11Z","createdDateTime":"2021-02-23T19:35:08Z","expirationDateTime":"2021-02-24T19:35:08Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'c74997f5-d042-4ee6-ba63-d94046e18ddc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:12 GMT'
]);

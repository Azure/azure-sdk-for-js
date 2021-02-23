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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/21ac9857-e9c9-45b0-9ca5-1889750ffa93',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  'ef0e2217-63f2-4a9e-a279-b3fc219478ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/21ac9857-e9c9-45b0-9ca5-1889750ffa93')
  .query(true)
  .reply(200, {"jobId":"21ac9857-e9c9-45b0-9ca5-1889750ffa93","lastUpdateDateTime":"2021-02-23T02:42:22Z","createdDateTime":"2021-02-23T02:42:22Z","expirationDateTime":"2021-02-24T02:42:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7f59fe37-d49f-484f-95bf-13bdc239e373',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/21ac9857-e9c9-45b0-9ca5-1889750ffa93')
  .query(true)
  .reply(200, {"jobId":"21ac9857-e9c9-45b0-9ca5-1889750ffa93","lastUpdateDateTime":"2021-02-23T02:42:22Z","createdDateTime":"2021-02-23T02:42:22Z","expirationDateTime":"2021-02-24T02:42:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '8e2bde35-7ff7-409e-b05d-3e89bbf890fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/21ac9857-e9c9-45b0-9ca5-1889750ffa93')
  .query(true)
  .reply(200, {"jobId":"21ac9857-e9c9-45b0-9ca5-1889750ffa93","lastUpdateDateTime":"2021-02-23T02:42:22Z","createdDateTime":"2021-02-23T02:42:22Z","expirationDateTime":"2021-02-24T02:42:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f4a8bdf3-c7be-4649-9c0a-92461ad73ce7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/21ac9857-e9c9-45b0-9ca5-1889750ffa93')
  .query(true)
  .reply(200, {"jobId":"21ac9857-e9c9-45b0-9ca5-1889750ffa93","lastUpdateDateTime":"2021-02-23T02:42:26Z","createdDateTime":"2021-02-23T02:42:22Z","expirationDateTime":"2021-02-24T02:42:22Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '750b2b72-88a4-4179-9d85-719c44fb8753',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/21ac9857-e9c9-45b0-9ca5-1889750ffa93')
  .query(true)
  .reply(200, {"jobId":"21ac9857-e9c9-45b0-9ca5-1889750ffa93","lastUpdateDateTime":"2021-02-23T02:42:26Z","createdDateTime":"2021-02-23T02:42:22Z","expirationDateTime":"2021-02-24T02:42:22Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '0c5cffdb-b22e-4829-97a6-b1c8d64d8e8f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:28 GMT'
]);

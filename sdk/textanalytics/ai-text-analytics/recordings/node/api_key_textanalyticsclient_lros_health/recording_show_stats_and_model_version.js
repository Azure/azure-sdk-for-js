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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/2767628e-6cb3-4877-b129-887a633a815d',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '81bab3c3-8f8e-4259-8bc3-2617ebeac607',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2767628e-6cb3-4877-b129-887a633a815d')
  .query(true)
  .reply(200, {"jobId":"2767628e-6cb3-4877-b129-887a633a815d","lastUpdateDateTime":"2021-04-28T20:14:23Z","createdDateTime":"2021-04-28T20:14:23Z","expirationDateTime":"2021-04-29T20:14:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '19427bac-f13e-4a1b-95d0-d492ae8f3f9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2767628e-6cb3-4877-b129-887a633a815d')
  .query(true)
  .reply(200, {"jobId":"2767628e-6cb3-4877-b129-887a633a815d","lastUpdateDateTime":"2021-04-28T20:14:23Z","createdDateTime":"2021-04-28T20:14:23Z","expirationDateTime":"2021-04-29T20:14:23Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '52ac9199-98b5-44e8-902d-fc13064e2a07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2767628e-6cb3-4877-b129-887a633a815d')
  .query(true)
  .reply(200, {"jobId":"2767628e-6cb3-4877-b129-887a633a815d","lastUpdateDateTime":"2021-04-28T20:14:23Z","createdDateTime":"2021-04-28T20:14:23Z","expirationDateTime":"2021-04-29T20:14:23Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5210',
  'apim-request-id',
  '3786b8f0-3265-484d-bcd1-1106b519cf5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:30 GMT'
]);

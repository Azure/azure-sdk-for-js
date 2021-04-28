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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/c971d435-e10f-4588-b78b-425cdfe74e75',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '6b2b0d18-ca16-4968-8464-ddb3b545e107',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/c971d435-e10f-4588-b78b-425cdfe74e75')
  .query(true)
  .reply(200, {"jobId":"c971d435-e10f-4588-b78b-425cdfe74e75","lastUpdateDateTime":"2021-04-28T21:05:10Z","createdDateTime":"2021-04-28T21:05:10Z","expirationDateTime":"2021-04-29T21:05:10Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '8623b143-f6d6-4b71-8913-66a49812988d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/c971d435-e10f-4588-b78b-425cdfe74e75')
  .query(true)
  .reply(200, {"jobId":"c971d435-e10f-4588-b78b-425cdfe74e75","lastUpdateDateTime":"2021-04-28T21:05:10Z","createdDateTime":"2021-04-28T21:05:10Z","expirationDateTime":"2021-04-29T21:05:10Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'cc6bb453-f368-4e4a-b488-37d8584b481c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/c971d435-e10f-4588-b78b-425cdfe74e75')
  .query(true)
  .reply(200, {"jobId":"c971d435-e10f-4588-b78b-425cdfe74e75","lastUpdateDateTime":"2021-04-28T21:05:10Z","createdDateTime":"2021-04-28T21:05:10Z","expirationDateTime":"2021-04-29T21:05:10Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'a2947642-e751-4c08-a765-83c4b8b4cc9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:11 GMT'
]);

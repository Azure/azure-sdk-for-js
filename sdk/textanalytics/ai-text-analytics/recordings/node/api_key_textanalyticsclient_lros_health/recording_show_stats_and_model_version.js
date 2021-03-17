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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/4aa5cc2d-89d5-4e87-8920-457f8b4a7e75',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '6e6a4bc6-600b-4891-8cdd-eff365cd47eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4aa5cc2d-89d5-4e87-8920-457f8b4a7e75')
  .query(true)
  .reply(200, {"jobId":"4aa5cc2d-89d5-4e87-8920-457f8b4a7e75","lastUpdateDateTime":"2021-03-04T20:18:37Z","createdDateTime":"2021-03-04T20:18:37Z","expirationDateTime":"2021-03-05T20:18:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ed19508a-9438-4007-960a-7f8018e168d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4aa5cc2d-89d5-4e87-8920-457f8b4a7e75')
  .query(true)
  .reply(200, {"jobId":"4aa5cc2d-89d5-4e87-8920-457f8b4a7e75","lastUpdateDateTime":"2021-03-04T20:18:37Z","createdDateTime":"2021-03-04T20:18:37Z","expirationDateTime":"2021-03-05T20:18:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '6cab85ec-a553-4c4e-9b67-6489cc3a07f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4aa5cc2d-89d5-4e87-8920-457f8b4a7e75')
  .query(true)
  .reply(200, {"jobId":"4aa5cc2d-89d5-4e87-8920-457f8b4a7e75","lastUpdateDateTime":"2021-03-04T20:18:39Z","createdDateTime":"2021-03-04T20:18:37Z","expirationDateTime":"2021-03-05T20:18:37Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  'a3076aac-dc03-45f9-93a6-b4673c074e74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:39 GMT'
]);

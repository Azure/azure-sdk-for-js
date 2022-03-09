let nock = require('nock');

module.exports.hash = "1e575b94347ebbe18d25ab65a2be1654";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/79780370-a5df-4b55-9acc-c6d5228777da',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '43033769-e11a-466c-8d12-21cdac63cb6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/79780370-a5df-4b55-9acc-c6d5228777da')
  .query(true)
  .reply(200, {"jobId":"79780370-a5df-4b55-9acc-c6d5228777da","lastUpdateDateTime":"2021-10-23T00:42:41Z","createdDateTime":"2021-10-23T00:42:40Z","expirationDateTime":"2021-10-24T00:42:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '60d805b3-8ce4-4510-bdee-182b49c7b189',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/79780370-a5df-4b55-9acc-c6d5228777da')
  .query(true)
  .reply(200, {"jobId":"79780370-a5df-4b55-9acc-c6d5228777da","lastUpdateDateTime":"2021-10-23T00:42:41Z","createdDateTime":"2021-10-23T00:42:40Z","expirationDateTime":"2021-10-24T00:42:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'd2ac1d0a-c0fc-4be4-98e8-9b52f3c20b7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/79780370-a5df-4b55-9acc-c6d5228777da')
  .query(true)
  .reply(200, {"jobId":"79780370-a5df-4b55-9acc-c6d5228777da","lastUpdateDateTime":"2021-10-23T00:42:42Z","createdDateTime":"2021-10-23T00:42:40Z","expirationDateTime":"2021-10-24T00:42:40Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '1e9eae95-5677-488d-8fc4-a2de3d572213',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:42 GMT'
]);

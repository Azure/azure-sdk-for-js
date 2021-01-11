let nock = require('nock');

module.exports.hash = "518dfc7b35fe3d17f9b6f1f480b45471";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648',
  'x-envoy-upstream-service-time',
  '589',
  'apim-request-id',
  'b1e84c51-880d-4dbf-8694-70dc4a2826ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648')
  .query(true)
  .reply(200, {"jobId":"a981a087-ebcb-4297-b4b0-09f4055b3648","lastUpdateDateTime":"2021-01-11T18:58:37Z","createdDateTime":"2021-01-11T18:58:36Z","expirationDateTime":"2021-01-12T18:58:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '388',
  'apim-request-id',
  '299f7112-9b95-4843-a2ab-2ceb88bcf524',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648')
  .query(true)
  .reply(200, {"jobId":"a981a087-ebcb-4297-b4b0-09f4055b3648","lastUpdateDateTime":"2021-01-11T18:58:37Z","createdDateTime":"2021-01-11T18:58:36Z","expirationDateTime":"2021-01-12T18:58:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '213',
  'apim-request-id',
  '0c47d4eb-7eb8-4e1c-9831-94f0d11e11dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648')
  .query(true)
  .reply(200, {"jobId":"a981a087-ebcb-4297-b4b0-09f4055b3648","lastUpdateDateTime":"2021-01-11T18:58:37Z","createdDateTime":"2021-01-11T18:58:36Z","expirationDateTime":"2021-01-12T18:58:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  '18c04975-2687-46ef-958d-a379a090cbab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648')
  .query(true)
  .reply(200, {"jobId":"a981a087-ebcb-4297-b4b0-09f4055b3648","lastUpdateDateTime":"2021-01-11T18:58:37Z","createdDateTime":"2021-01-11T18:58:36Z","expirationDateTime":"2021-01-12T18:58:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '1e6a47d5-53f9-44cf-8cee-5f16b794a92b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648')
  .query(true)
  .reply(200, {"jobId":"a981a087-ebcb-4297-b4b0-09f4055b3648","lastUpdateDateTime":"2021-01-11T18:58:37Z","createdDateTime":"2021-01-11T18:58:36Z","expirationDateTime":"2021-01-12T18:58:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '571921fb-9b83-4a5e-adbf-167bce7dd763',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648')
  .query(true)
  .reply(200, {"jobId":"a981a087-ebcb-4297-b4b0-09f4055b3648","lastUpdateDateTime":"2021-01-11T18:58:37Z","createdDateTime":"2021-01-11T18:58:36Z","expirationDateTime":"2021-01-12T18:58:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '0387d283-80c0-46e2-baaa-8de78a964749',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648')
  .query(true)
  .reply(200, {"jobId":"a981a087-ebcb-4297-b4b0-09f4055b3648","lastUpdateDateTime":"2021-01-11T18:58:37Z","createdDateTime":"2021-01-11T18:58:36Z","expirationDateTime":"2021-01-12T18:58:36Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '17492bc0-d92b-4c74-baa1-8f6460637ed7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/a981a087-ebcb-4297-b4b0-09f4055b3648')
  .query(true)
  .reply(200, {"jobId":"a981a087-ebcb-4297-b4b0-09f4055b3648","lastUpdateDateTime":"2021-01-11T18:58:49Z","createdDateTime":"2021-01-11T18:58:36Z","expirationDateTime":"2021-01-12T18:58:36Z","status":"succeeded","errors":[],"results":{"statistics":{"documentsCount":5,"validDocumentsCount":4,"erroneousDocumentsCount":1,"transactionsCount":4},"documents":[{"id":"56","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"0","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"19","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]},{"id":"1","statistics":{"charactersCount":2,"transactionsCount":1},"entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '8f4944c1-efdd-4639-b2ab-92e63caa39f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 11 Jan 2021 18:58:50 GMT'
]);

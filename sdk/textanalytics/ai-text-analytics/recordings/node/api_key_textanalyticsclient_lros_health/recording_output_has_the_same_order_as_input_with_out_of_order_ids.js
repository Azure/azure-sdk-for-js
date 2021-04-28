let nock = require('nock');

module.exports.hash = "29d09cad09699f8d65a8066b64223a17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/b9521107-f43e-4e0d-849c-2543ab1acabf',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '600c8e7a-cad6-4ab3-b7df-1dbf8d83792b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b9521107-f43e-4e0d-849c-2543ab1acabf')
  .query(true)
  .reply(200, {"jobId":"b9521107-f43e-4e0d-849c-2543ab1acabf","lastUpdateDateTime":"2021-04-28T20:14:20Z","createdDateTime":"2021-04-28T20:14:20Z","expirationDateTime":"2021-04-29T20:14:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '68d1bc16-acc1-4684-9062-05a5068408b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b9521107-f43e-4e0d-849c-2543ab1acabf')
  .query(true)
  .reply(200, {"jobId":"b9521107-f43e-4e0d-849c-2543ab1acabf","lastUpdateDateTime":"2021-04-28T20:14:20Z","createdDateTime":"2021-04-28T20:14:20Z","expirationDateTime":"2021-04-29T20:14:20Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'dc4f79f3-65e0-4fd8-bb8b-adf728657f7c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b9521107-f43e-4e0d-849c-2543ab1acabf')
  .query(true)
  .reply(200, {"jobId":"b9521107-f43e-4e0d-849c-2543ab1acabf","lastUpdateDateTime":"2021-04-28T20:14:21Z","createdDateTime":"2021-04-28T20:14:20Z","expirationDateTime":"2021-04-29T20:14:20Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '8c6ec29d-ba46-497b-b293-259a64b4e6bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/b9521107-f43e-4e0d-849c-2543ab1acabf')
  .query(true)
  .reply(200, {"jobId":"b9521107-f43e-4e0d-849c-2543ab1acabf","lastUpdateDateTime":"2021-04-28T20:14:21Z","createdDateTime":"2021-04-28T20:14:20Z","expirationDateTime":"2021-04-29T20:14:20Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '9b305874-f14b-43fd-bec9-1a623eab1e40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:22 GMT'
]);

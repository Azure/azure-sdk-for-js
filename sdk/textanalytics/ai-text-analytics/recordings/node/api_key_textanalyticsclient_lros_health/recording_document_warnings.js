let nock = require('nock');

module.exports.hash = "f8a5f7ad0b9546a9cbb856f66ab9f72e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/79493bb2-3ac2-4758-ab81-8bdc86873569',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '4c786d6c-343a-4ceb-8410-799a8377b766',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/79493bb2-3ac2-4758-ab81-8bdc86873569')
  .query(true)
  .reply(200, {"jobId":"79493bb2-3ac2-4758-ab81-8bdc86873569","lastUpdateDateTime":"2021-03-04T20:18:25Z","createdDateTime":"2021-03-04T20:18:25Z","expirationDateTime":"2021-03-05T20:18:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'bdfc1670-1fb2-48a0-a27e-ebd6fd98d2a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/79493bb2-3ac2-4758-ab81-8bdc86873569')
  .query(true)
  .reply(200, {"jobId":"79493bb2-3ac2-4758-ab81-8bdc86873569","lastUpdateDateTime":"2021-03-04T20:18:25Z","createdDateTime":"2021-03-04T20:18:25Z","expirationDateTime":"2021-03-05T20:18:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '23',
  'apim-request-id',
  '4f5072a1-1094-478d-82a7-7c6fcdc2833f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/79493bb2-3ac2-4758-ab81-8bdc86873569')
  .query(true)
  .reply(200, {"jobId":"79493bb2-3ac2-4758-ab81-8bdc86873569","lastUpdateDateTime":"2021-03-04T20:18:25Z","createdDateTime":"2021-03-04T20:18:25Z","expirationDateTime":"2021-03-05T20:18:25Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'd925b500-dfe8-4039-bc3d-b3497af12fac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/79493bb2-3ac2-4758-ab81-8bdc86873569')
  .query(true)
  .reply(200, {"jobId":"79493bb2-3ac2-4758-ab81-8bdc86873569","lastUpdateDateTime":"2021-03-04T20:18:28Z","createdDateTime":"2021-03-04T20:18:25Z","expirationDateTime":"2021-03-05T20:18:25Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  '66a9fa1a-1d15-4e50-ac0e-a10f96cda018',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/79493bb2-3ac2-4758-ab81-8bdc86873569')
  .query(true)
  .reply(200, {"jobId":"79493bb2-3ac2-4758-ab81-8bdc86873569","lastUpdateDateTime":"2021-03-04T20:18:28Z","createdDateTime":"2021-03-04T20:18:25Z","expirationDateTime":"2021-03-05T20:18:25Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '0a55bf39-2e82-4e32-869b-727ce5034668',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:29 GMT'
]);

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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/183fdeec-ccdb-43ee-a696-d27357d85c84',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'bfa46472-962c-4d17-95c8-e8f64867cedc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/183fdeec-ccdb-43ee-a696-d27357d85c84')
  .query(true)
  .reply(200, {"jobId":"183fdeec-ccdb-43ee-a696-d27357d85c84","lastUpdateDateTime":"2021-03-04T20:18:30Z","createdDateTime":"2021-03-04T20:18:30Z","expirationDateTime":"2021-03-05T20:18:30Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '68bc8121-6188-4e16-8cd7-a605eb37c973',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/183fdeec-ccdb-43ee-a696-d27357d85c84')
  .query(true)
  .reply(200, {"jobId":"183fdeec-ccdb-43ee-a696-d27357d85c84","lastUpdateDateTime":"2021-03-04T20:18:30Z","createdDateTime":"2021-03-04T20:18:30Z","expirationDateTime":"2021-03-05T20:18:30Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'fb3248e9-c799-42c0-9279-92e1e1c2babb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/183fdeec-ccdb-43ee-a696-d27357d85c84')
  .query(true)
  .reply(200, {"jobId":"183fdeec-ccdb-43ee-a696-d27357d85c84","lastUpdateDateTime":"2021-03-04T20:18:32Z","createdDateTime":"2021-03-04T20:18:30Z","expirationDateTime":"2021-03-05T20:18:30Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2a7cd2dd-9128-4316-8265-5ac979e5a43e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/183fdeec-ccdb-43ee-a696-d27357d85c84')
  .query(true)
  .reply(200, {"jobId":"183fdeec-ccdb-43ee-a696-d27357d85c84","lastUpdateDateTime":"2021-03-04T20:18:33Z","createdDateTime":"2021-03-04T20:18:30Z","expirationDateTime":"2021-03-05T20:18:30Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  'adad7146-7553-4ce8-8d81-c8545b9ef119',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/183fdeec-ccdb-43ee-a696-d27357d85c84')
  .query(true)
  .reply(200, {"jobId":"183fdeec-ccdb-43ee-a696-d27357d85c84","lastUpdateDateTime":"2021-03-04T20:18:33Z","createdDateTime":"2021-03-04T20:18:30Z","expirationDateTime":"2021-03-05T20:18:30Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '90797a0e-ed9e-4991-8842-4c8eb703c8be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:34 GMT'
]);

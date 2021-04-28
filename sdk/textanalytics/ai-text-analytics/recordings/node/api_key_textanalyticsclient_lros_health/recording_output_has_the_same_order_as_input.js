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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/84d915c4-fecb-411f-accd-3e50b0519417',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'e9906294-c2f9-491d-bfd1-36de495cba6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/84d915c4-fecb-411f-accd-3e50b0519417')
  .query(true)
  .reply(200, {"jobId":"84d915c4-fecb-411f-accd-3e50b0519417","lastUpdateDateTime":"2021-04-28T20:14:18Z","createdDateTime":"2021-04-28T20:14:18Z","expirationDateTime":"2021-04-29T20:14:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '05961363-2ab8-4cdb-8265-c8f1a4a2f99d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/84d915c4-fecb-411f-accd-3e50b0519417')
  .query(true)
  .reply(200, {"jobId":"84d915c4-fecb-411f-accd-3e50b0519417","lastUpdateDateTime":"2021-04-28T20:14:18Z","createdDateTime":"2021-04-28T20:14:18Z","expirationDateTime":"2021-04-29T20:14:18Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '12e773a3-27ff-42de-a166-d1756002bea4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/84d915c4-fecb-411f-accd-3e50b0519417')
  .query(true)
  .reply(200, {"jobId":"84d915c4-fecb-411f-accd-3e50b0519417","lastUpdateDateTime":"2021-04-28T20:14:18Z","createdDateTime":"2021-04-28T20:14:18Z","expirationDateTime":"2021-04-29T20:14:18Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'd76b2e0e-f097-4ff8-bbb7-cd575f45a706',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/84d915c4-fecb-411f-accd-3e50b0519417')
  .query(true)
  .reply(200, {"jobId":"84d915c4-fecb-411f-accd-3e50b0519417","lastUpdateDateTime":"2021-04-28T20:14:18Z","createdDateTime":"2021-04-28T20:14:18Z","expirationDateTime":"2021-04-29T20:14:18Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '319ab2ab-535f-4460-9e4f-dc3a290aa74e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:20 GMT'
]);

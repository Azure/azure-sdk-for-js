let nock = require('nock');

module.exports.hash = "b5f82998ec382ffdc25c0a92c73703fd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/70b60cac-6f9e-418b-a5d3-b884f9614898',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '8b6cc977-6ecb-4f3a-ad93-4676e839652d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/70b60cac-6f9e-418b-a5d3-b884f9614898')
  .query(true)
  .reply(200, {"jobId":"70b60cac-6f9e-418b-a5d3-b884f9614898","lastUpdateDateTime":"2021-05-12T19:04:53Z","createdDateTime":"2021-05-12T19:04:52Z","expirationDateTime":"2021-05-13T19:04:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ec74e72d-b5ae-49e9-a4b2-f043c5640a57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/70b60cac-6f9e-418b-a5d3-b884f9614898')
  .query(true)
  .reply(200, {"jobId":"70b60cac-6f9e-418b-a5d3-b884f9614898","lastUpdateDateTime":"2021-05-12T19:04:53Z","createdDateTime":"2021-05-12T19:04:52Z","expirationDateTime":"2021-05-13T19:04:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '579b64a6-d5c2-4dcb-a0c8-c2fd3fde720f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/70b60cac-6f9e-418b-a5d3-b884f9614898')
  .query(true)
  .reply(200, {"jobId":"70b60cac-6f9e-418b-a5d3-b884f9614898","lastUpdateDateTime":"2021-05-12T19:04:53Z","createdDateTime":"2021-05-12T19:04:52Z","expirationDateTime":"2021-05-13T19:04:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'fc8af890-c3d5-4ed2-9a20-164f3f3cf6fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/70b60cac-6f9e-418b-a5d3-b884f9614898')
  .query(true)
  .reply(200, {"jobId":"70b60cac-6f9e-418b-a5d3-b884f9614898","lastUpdateDateTime":"2021-05-12T19:04:57Z","createdDateTime":"2021-05-12T19:04:52Z","expirationDateTime":"2021-05-13T19:04:52Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '6302e167-7168-48af-b24e-fe40ae7a86f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/70b60cac-6f9e-418b-a5d3-b884f9614898')
  .query(true)
  .reply(200, {"jobId":"70b60cac-6f9e-418b-a5d3-b884f9614898","lastUpdateDateTime":"2021-05-12T19:04:57Z","createdDateTime":"2021-05-12T19:04:52Z","expirationDateTime":"2021-05-13T19:04:52Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '59c6b192-688c-44fd-af68-9626122245aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:57 GMT'
]);

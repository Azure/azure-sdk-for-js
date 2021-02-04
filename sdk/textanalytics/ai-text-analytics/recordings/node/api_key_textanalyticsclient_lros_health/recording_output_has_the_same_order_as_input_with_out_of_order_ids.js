let nock = require('nock');

module.exports.hash = "0469d482822a5ca4c213fcc8899245d2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/37671b7e-ba3e-4764-a290-911b79da9f63',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'e4232abf-6b3f-4e57-b8cb-d74b9c2ac87f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/37671b7e-ba3e-4764-a290-911b79da9f63')
  .query(true)
  .reply(200, {"jobId":"37671b7e-ba3e-4764-a290-911b79da9f63","lastUpdateDateTime":"2020-12-30T17:28:27Z","createdDateTime":"2020-12-30T17:28:27Z","expirationDateTime":"2020-12-31T17:28:27Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7e63efef-3110-4c12-a47f-ff4acb7bb3a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/37671b7e-ba3e-4764-a290-911b79da9f63')
  .query(true)
  .reply(200, {"jobId":"37671b7e-ba3e-4764-a290-911b79da9f63","lastUpdateDateTime":"2020-12-30T17:28:27Z","createdDateTime":"2020-12-30T17:28:27Z","expirationDateTime":"2020-12-31T17:28:27Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'b18ac205-0bdd-424d-a9cd-cf2db1ae25d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/37671b7e-ba3e-4764-a290-911b79da9f63')
  .query(true)
  .reply(200, {"jobId":"37671b7e-ba3e-4764-a290-911b79da9f63","lastUpdateDateTime":"2020-12-30T17:28:27Z","createdDateTime":"2020-12-30T17:28:27Z","expirationDateTime":"2020-12-31T17:28:27Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ee31b7a1-032e-4ec7-93b8-25c8b44b689b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/37671b7e-ba3e-4764-a290-911b79da9f63')
  .query(true)
  .reply(200, {"jobId":"37671b7e-ba3e-4764-a290-911b79da9f63","lastUpdateDateTime":"2020-12-30T17:28:30Z","createdDateTime":"2020-12-30T17:28:27Z","expirationDateTime":"2020-12-31T17:28:27Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '0e3aadd5-bc0f-4385-97ad-48f678426205',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:31 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/37671b7e-ba3e-4764-a290-911b79da9f63')
  .query(true)
  .reply(200, {"jobId":"37671b7e-ba3e-4764-a290-911b79da9f63","lastUpdateDateTime":"2020-12-30T17:28:30Z","createdDateTime":"2020-12-30T17:28:27Z","expirationDateTime":"2020-12-31T17:28:27Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '8096a1be-fd64-4d4f-bd13-7d217b2c9faa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:31 GMT'
]);

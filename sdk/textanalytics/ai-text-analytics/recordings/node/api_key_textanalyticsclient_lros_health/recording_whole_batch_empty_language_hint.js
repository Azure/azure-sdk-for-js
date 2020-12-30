let nock = require('nock');

module.exports.hash = "e264e0fc9ff5c1aaf3105167b584129c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '2145b91e-c807-44ee-9637-e2c9a43366af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2')
  .query(true)
  .reply(200, {"jobId":"cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2","lastUpdateDateTime":"2020-12-30T17:28:41Z","createdDateTime":"2020-12-30T17:28:41Z","expirationDateTime":"2020-12-31T17:28:41Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b2507e47-4669-4551-9cd6-8b7e9c724ed9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2')
  .query(true)
  .reply(200, {"jobId":"cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2","lastUpdateDateTime":"2020-12-30T17:28:41Z","createdDateTime":"2020-12-30T17:28:41Z","expirationDateTime":"2020-12-31T17:28:41Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '0b0ae5f5-acda-47d0-9f28-3c66cbb943e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2')
  .query(true)
  .reply(200, {"jobId":"cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2","lastUpdateDateTime":"2020-12-30T17:28:41Z","createdDateTime":"2020-12-30T17:28:41Z","expirationDateTime":"2020-12-31T17:28:41Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  'e6df2fb3-3acd-4515-8711-d0cee7823023',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2')
  .query(true)
  .reply(200, {"jobId":"cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2","lastUpdateDateTime":"2020-12-30T17:28:45Z","createdDateTime":"2020-12-30T17:28:41Z","expirationDateTime":"2020-12-31T17:28:41Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '132412bb-3c8c-4344-ad77-91b832ed7ee9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2')
  .query(true)
  .reply(200, {"jobId":"cf4f7c93-b664-4b91-84f4-c8b7a3d25cb2","lastUpdateDateTime":"2020-12-30T17:28:45Z","createdDateTime":"2020-12-30T17:28:41Z","expirationDateTime":"2020-12-31T17:28:41Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'e6c2d756-497e-441c-9378-e4d4f809e256',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:46 GMT'
]);

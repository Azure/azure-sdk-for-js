let nock = require('nock');

module.exports.hash = "5dea8be51a7238be8740869cc957463d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/be578033-4e89-43b3-b1cd-22bcf5365ade',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'c05ef16d-48f3-4b89-ae1b-5b7917ca6716',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/be578033-4e89-43b3-b1cd-22bcf5365ade')
  .query(true)
  .reply(200, {"jobId":"be578033-4e89-43b3-b1cd-22bcf5365ade","lastUpdateDateTime":"2020-12-22T20:08:12Z","createdDateTime":"2020-12-22T20:08:12Z","expirationDateTime":"2020-12-23T20:08:12Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '3302e9fb-abff-417a-91f9-540a3e5e2800',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/be578033-4e89-43b3-b1cd-22bcf5365ade')
  .query(true)
  .reply(200, {"jobId":"be578033-4e89-43b3-b1cd-22bcf5365ade","lastUpdateDateTime":"2020-12-22T20:08:12Z","createdDateTime":"2020-12-22T20:08:12Z","expirationDateTime":"2020-12-23T20:08:12Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ed3913dd-8a4d-4113-ac48-d8b211a43097',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/be578033-4e89-43b3-b1cd-22bcf5365ade')
  .query(true)
  .reply(200, {"jobId":"be578033-4e89-43b3-b1cd-22bcf5365ade","lastUpdateDateTime":"2020-12-22T20:08:13Z","createdDateTime":"2020-12-22T20:08:12Z","expirationDateTime":"2020-12-23T20:08:12Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  'a221c4c7-8cd2-42bc-bfd8-24cebdb14be0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/be578033-4e89-43b3-b1cd-22bcf5365ade')
  .query(true)
  .reply(200, {"jobId":"be578033-4e89-43b3-b1cd-22bcf5365ade","lastUpdateDateTime":"2020-12-22T20:08:13Z","createdDateTime":"2020-12-22T20:08:12Z","expirationDateTime":"2020-12-23T20:08:12Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '23af3ad1-d3ea-427c-b16f-9db5675f70c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 22 Dec 2020 20:08:14 GMT'
]);

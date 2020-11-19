let nock = require('nock');

module.exports.hash = "d6b123381d1423feac1a05f2866a6de8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/b734da0c-e563-48c8-84b0-ec3047d1ce86',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '3e6f5f01-a7ae-4afd-8dce-01397949b3de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b734da0c-e563-48c8-84b0-ec3047d1ce86')
  .query(true)
  .reply(200, {"jobId":"b734da0c-e563-48c8-84b0-ec3047d1ce86","lastUpdateDateTime":"2020-11-20T00:13:21Z","createdDateTime":"2020-11-20T00:13:21Z","expirationDateTime":"2020-11-21T00:13:21Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bb641b33-e930-42a6-bedd-dc9d4262e2d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b734da0c-e563-48c8-84b0-ec3047d1ce86')
  .query(true)
  .reply(200, {"jobId":"b734da0c-e563-48c8-84b0-ec3047d1ce86","lastUpdateDateTime":"2020-11-20T00:13:21Z","createdDateTime":"2020-11-20T00:13:21Z","expirationDateTime":"2020-11-21T00:13:21Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'b72c1f47-e37c-48b3-9f96-23989e6459e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b734da0c-e563-48c8-84b0-ec3047d1ce86')
  .query(true)
  .reply(200, {"jobId":"b734da0c-e563-48c8-84b0-ec3047d1ce86","lastUpdateDateTime":"2020-11-20T00:13:22Z","createdDateTime":"2020-11-20T00:13:21Z","expirationDateTime":"2020-11-21T00:13:21Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'f767b0c2-fb37-479d-9487-50f5ef518304',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/b734da0c-e563-48c8-84b0-ec3047d1ce86')
  .query(true)
  .reply(200, {"jobId":"b734da0c-e563-48c8-84b0-ec3047d1ce86","lastUpdateDateTime":"2020-11-20T00:13:22Z","createdDateTime":"2020-11-20T00:13:21Z","expirationDateTime":"2020-11-21T00:13:21Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'd9ddbc5a-4b4b-44c3-be12-8f5de86c76e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:23 GMT'
]);

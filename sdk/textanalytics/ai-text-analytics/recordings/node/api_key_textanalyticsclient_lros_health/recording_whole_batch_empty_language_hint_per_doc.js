let nock = require('nock');

module.exports.hash = "b3ad7c6bd1c67bae64359f501d8d1c4d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"I will go to the park.","language":""},{"id":"2","text":"I did not like the hotel we stayed at.","language":""},{"id":"3","text":"The restaurant had really good food."}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '5370c67b-76b1-4c43-a1ea-bfc623fd0d2a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08')
  .query(true)
  .reply(200, {"jobId":"ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08","lastUpdateDateTime":"2021-04-28T20:14:35Z","createdDateTime":"2021-04-28T20:14:35Z","expirationDateTime":"2021-04-29T20:14:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '456e5919-cf19-4b81-a9f8-b73fe61153c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08')
  .query(true)
  .reply(200, {"jobId":"ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08","lastUpdateDateTime":"2021-04-28T20:14:35Z","createdDateTime":"2021-04-28T20:14:35Z","expirationDateTime":"2021-04-29T20:14:35Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ece32932-403b-4dec-a610-f99c300882da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08')
  .query(true)
  .reply(200, {"jobId":"ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08","lastUpdateDateTime":"2021-04-28T20:14:36Z","createdDateTime":"2021-04-28T20:14:35Z","expirationDateTime":"2021-04-29T20:14:35Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '214ef683-2a95-45cf-ab0f-185b5ff1fc79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08')
  .query(true)
  .reply(200, {"jobId":"ab419d92-5e8b-4cf5-9efb-7a5dc3dbff08","lastUpdateDateTime":"2021-04-28T20:14:36Z","createdDateTime":"2021-04-28T20:14:35Z","expirationDateTime":"2021-04-29T20:14:35Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '2269ef18-baef-4d1a-ad77-eb4a2383feb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:37 GMT'
]);

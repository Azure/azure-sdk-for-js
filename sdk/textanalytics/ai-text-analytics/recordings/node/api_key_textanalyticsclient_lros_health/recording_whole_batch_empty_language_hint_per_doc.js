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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/579cf112-417b-4c3e-80d1-7c984013a9d0',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  '6e245baf-03f6-4fd9-9a7f-d5a286bcd6b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/579cf112-417b-4c3e-80d1-7c984013a9d0')
  .query(true)
  .reply(200, {"jobId":"579cf112-417b-4c3e-80d1-7c984013a9d0","lastUpdateDateTime":"2021-02-23T02:42:37Z","createdDateTime":"2021-02-23T02:42:37Z","expirationDateTime":"2021-02-24T02:42:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '0a05d404-339d-4279-84e4-56e366fed647',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/579cf112-417b-4c3e-80d1-7c984013a9d0')
  .query(true)
  .reply(200, {"jobId":"579cf112-417b-4c3e-80d1-7c984013a9d0","lastUpdateDateTime":"2021-02-23T02:42:37Z","createdDateTime":"2021-02-23T02:42:37Z","expirationDateTime":"2021-02-24T02:42:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'f52a419b-d4a6-4af9-9454-def7f9bd4036',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/579cf112-417b-4c3e-80d1-7c984013a9d0')
  .query(true)
  .reply(200, {"jobId":"579cf112-417b-4c3e-80d1-7c984013a9d0","lastUpdateDateTime":"2021-02-23T02:42:37Z","createdDateTime":"2021-02-23T02:42:37Z","expirationDateTime":"2021-02-24T02:42:37Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '89bf644d-8145-403d-b220-e85052abf855',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/579cf112-417b-4c3e-80d1-7c984013a9d0')
  .query(true)
  .reply(200, {"jobId":"579cf112-417b-4c3e-80d1-7c984013a9d0","lastUpdateDateTime":"2021-02-23T02:42:41Z","createdDateTime":"2021-02-23T02:42:37Z","expirationDateTime":"2021-02-24T02:42:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '98703e09-38ab-4022-a5cf-0c4bb02aa1ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/579cf112-417b-4c3e-80d1-7c984013a9d0')
  .query(true)
  .reply(200, {"jobId":"579cf112-417b-4c3e-80d1-7c984013a9d0","lastUpdateDateTime":"2021-02-23T02:42:41Z","createdDateTime":"2021-02-23T02:42:37Z","expirationDateTime":"2021-02-24T02:42:37Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  'ea43c48d-8be4-4eae-a81c-6592e10c6744',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:41 GMT'
]);

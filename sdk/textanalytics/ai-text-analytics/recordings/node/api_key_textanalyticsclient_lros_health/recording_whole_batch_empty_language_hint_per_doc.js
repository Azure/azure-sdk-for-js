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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/651e7de0-86eb-4714-9ef6-9cbd1a885d92',
  'x-envoy-upstream-service-time',
  '915',
  'apim-request-id',
  '3094e3d3-90a1-4abe-9644-0de2b128c16c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/651e7de0-86eb-4714-9ef6-9cbd1a885d92')
  .query(true)
  .reply(200, {"jobId":"651e7de0-86eb-4714-9ef6-9cbd1a885d92","lastUpdateDateTime":"2021-03-04T20:18:45Z","createdDateTime":"2021-03-04T20:18:44Z","expirationDateTime":"2021-03-05T20:18:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '337cb0ef-b506-479a-925e-81e035eb6cb5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/651e7de0-86eb-4714-9ef6-9cbd1a885d92')
  .query(true)
  .reply(200, {"jobId":"651e7de0-86eb-4714-9ef6-9cbd1a885d92","lastUpdateDateTime":"2021-03-04T20:18:45Z","createdDateTime":"2021-03-04T20:18:44Z","expirationDateTime":"2021-03-05T20:18:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c9baf6a7-8ba2-4189-94b5-d8c5ec130b69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:45 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/651e7de0-86eb-4714-9ef6-9cbd1a885d92')
  .query(true)
  .reply(200, {"jobId":"651e7de0-86eb-4714-9ef6-9cbd1a885d92","lastUpdateDateTime":"2021-03-04T20:18:45Z","createdDateTime":"2021-03-04T20:18:44Z","expirationDateTime":"2021-03-05T20:18:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '1479c961-7948-4b9c-8a81-961393753ac2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:47 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/651e7de0-86eb-4714-9ef6-9cbd1a885d92')
  .query(true)
  .reply(200, {"jobId":"651e7de0-86eb-4714-9ef6-9cbd1a885d92","lastUpdateDateTime":"2021-03-04T20:18:49Z","createdDateTime":"2021-03-04T20:18:44Z","expirationDateTime":"2021-03-05T20:18:44Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  'cbf34437-2429-47a4-a585-c0ee8a8c84ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/651e7de0-86eb-4714-9ef6-9cbd1a885d92')
  .query(true)
  .reply(200, {"jobId":"651e7de0-86eb-4714-9ef6-9cbd1a885d92","lastUpdateDateTime":"2021-03-04T20:18:49Z","createdDateTime":"2021-03-04T20:18:44Z","expirationDateTime":"2021-03-05T20:18:44Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  '8a9331bf-c7d1-41d9-acce-19d06154a12d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:49 GMT'
]);

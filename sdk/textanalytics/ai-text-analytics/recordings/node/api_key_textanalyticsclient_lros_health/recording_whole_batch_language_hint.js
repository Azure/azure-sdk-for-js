let nock = require('nock');

module.exports.hash = "2b9b98c8788204bf3d0a1f4758dc43e5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/d11c908a-bba9-488c-8905-86fb33bdc91d',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '730d5675-2f39-4c9a-95f5-e7e31673486d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d11c908a-bba9-488c-8905-86fb33bdc91d')
  .query(true)
  .reply(200, {"jobId":"d11c908a-bba9-488c-8905-86fb33bdc91d","lastUpdateDateTime":"2021-02-23T19:35:13Z","createdDateTime":"2021-02-23T19:35:13Z","expirationDateTime":"2021-02-24T19:35:13Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '3eef5088-059f-4264-a1b7-18c9cd56e684',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d11c908a-bba9-488c-8905-86fb33bdc91d')
  .query(true)
  .reply(200, {"jobId":"d11c908a-bba9-488c-8905-86fb33bdc91d","lastUpdateDateTime":"2021-02-23T19:35:13Z","createdDateTime":"2021-02-23T19:35:13Z","expirationDateTime":"2021-02-24T19:35:13Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '3c5a3537-02e9-4dc0-b96e-d085216fc954',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d11c908a-bba9-488c-8905-86fb33bdc91d')
  .query(true)
  .reply(200, {"jobId":"d11c908a-bba9-488c-8905-86fb33bdc91d","lastUpdateDateTime":"2021-02-23T19:35:13Z","createdDateTime":"2021-02-23T19:35:13Z","expirationDateTime":"2021-02-24T19:35:13Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'eff846b8-2e3d-42eb-8c24-f8ff12f4c30a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d11c908a-bba9-488c-8905-86fb33bdc91d')
  .query(true)
  .reply(200, {"jobId":"d11c908a-bba9-488c-8905-86fb33bdc91d","lastUpdateDateTime":"2021-02-23T19:35:16Z","createdDateTime":"2021-02-23T19:35:13Z","expirationDateTime":"2021-02-24T19:35:13Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":18,"length":14,"text":"day of my life","category":"Age","confidenceScore":0.82}],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  'e3308522-fe9e-43b5-aaa8-1273196f6adc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/d11c908a-bba9-488c-8905-86fb33bdc91d')
  .query(true)
  .reply(200, {"jobId":"d11c908a-bba9-488c-8905-86fb33bdc91d","lastUpdateDateTime":"2021-02-23T19:35:16Z","createdDateTime":"2021-02-23T19:35:13Z","expirationDateTime":"2021-02-24T19:35:13Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":18,"length":14,"text":"day of my life","category":"Age","confidenceScore":0.82}],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '54c8140f-d087-4395-8d0f-7250aae62d38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:17 GMT'
]);

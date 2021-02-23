let nock = require('nock');

module.exports.hash = "53b8cbb2f8b9222a4857fd83eee00a3a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/f767b622-847d-4d72-890d-32ac43188ce9',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'e6afb8cf-b4cb-4f87-8de1-972035043ecf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f767b622-847d-4d72-890d-32ac43188ce9')
  .query(true)
  .reply(200, {"jobId":"f767b622-847d-4d72-890d-32ac43188ce9","lastUpdateDateTime":"2021-02-23T02:42:33Z","createdDateTime":"2021-02-23T02:42:33Z","expirationDateTime":"2021-02-24T02:42:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '70acdcdb-8948-41b2-b808-341c6ed25883',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f767b622-847d-4d72-890d-32ac43188ce9')
  .query(true)
  .reply(200, {"jobId":"f767b622-847d-4d72-890d-32ac43188ce9","lastUpdateDateTime":"2021-02-23T02:42:33Z","createdDateTime":"2021-02-23T02:42:33Z","expirationDateTime":"2021-02-24T02:42:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '43bb760f-00b5-46a8-a669-cbd29c1ae6d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:33 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f767b622-847d-4d72-890d-32ac43188ce9')
  .query(true)
  .reply(200, {"jobId":"f767b622-847d-4d72-890d-32ac43188ce9","lastUpdateDateTime":"2021-02-23T02:42:33Z","createdDateTime":"2021-02-23T02:42:33Z","expirationDateTime":"2021-02-24T02:42:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4f230296-05b3-4a3d-bb56-267d2973dc13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f767b622-847d-4d72-890d-32ac43188ce9')
  .query(true)
  .reply(200, {"jobId":"f767b622-847d-4d72-890d-32ac43188ce9","lastUpdateDateTime":"2021-02-23T02:42:36Z","createdDateTime":"2021-02-23T02:42:33Z","expirationDateTime":"2021-02-24T02:42:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":18,"length":14,"text":"day of my life","category":"Age","confidenceScore":0.82}],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'd457621e-f384-4797-8225-39f550355d79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f767b622-847d-4d72-890d-32ac43188ce9')
  .query(true)
  .reply(200, {"jobId":"f767b622-847d-4d72-890d-32ac43188ce9","lastUpdateDateTime":"2021-02-23T02:42:36Z","createdDateTime":"2021-02-23T02:42:33Z","expirationDateTime":"2021-02-24T02:42:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":18,"length":14,"text":"day of my life","category":"Age","confidenceScore":0.82}],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '57',
  'apim-request-id',
  'e62da2a2-de8c-4a88-9ce2-dcbc6173b2e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:37 GMT'
]);

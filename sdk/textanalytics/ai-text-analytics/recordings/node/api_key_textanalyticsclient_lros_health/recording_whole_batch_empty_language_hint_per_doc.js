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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/a2a369b1-f784-4872-8805-ca062fa492a2',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  '1e46e3b6-a5ae-4b76-b220-e4284886d0bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a2a369b1-f784-4872-8805-ca062fa492a2')
  .query(true)
  .reply(200, {"jobId":"a2a369b1-f784-4872-8805-ca062fa492a2","lastUpdateDateTime":"2021-02-23T19:35:22Z","createdDateTime":"2021-02-23T19:35:22Z","expirationDateTime":"2021-02-24T19:35:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '4e75dd43-1874-4625-8467-691d4145d5b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a2a369b1-f784-4872-8805-ca062fa492a2')
  .query(true)
  .reply(200, {"jobId":"a2a369b1-f784-4872-8805-ca062fa492a2","lastUpdateDateTime":"2021-02-23T19:35:22Z","createdDateTime":"2021-02-23T19:35:22Z","expirationDateTime":"2021-02-24T19:35:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '115463d2-9121-47e5-97c0-19646c1159f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a2a369b1-f784-4872-8805-ca062fa492a2')
  .query(true)
  .reply(200, {"jobId":"a2a369b1-f784-4872-8805-ca062fa492a2","lastUpdateDateTime":"2021-02-23T19:35:22Z","createdDateTime":"2021-02-23T19:35:22Z","expirationDateTime":"2021-02-24T19:35:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '02aee49e-afb0-4df0-917b-6aa4a26b00e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a2a369b1-f784-4872-8805-ca062fa492a2')
  .query(true)
  .reply(200, {"jobId":"a2a369b1-f784-4872-8805-ca062fa492a2","lastUpdateDateTime":"2021-02-23T19:35:22Z","createdDateTime":"2021-02-23T19:35:22Z","expirationDateTime":"2021-02-24T19:35:22Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '138a0fc5-d95c-4581-9089-44409fc9c672',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a2a369b1-f784-4872-8805-ca062fa492a2')
  .query(true)
  .reply(200, {"jobId":"a2a369b1-f784-4872-8805-ca062fa492a2","lastUpdateDateTime":"2021-02-23T19:35:26Z","createdDateTime":"2021-02-23T19:35:22Z","expirationDateTime":"2021-02-24T19:35:22Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  '300a517b-8ad6-4395-b065-16e097e14822',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a2a369b1-f784-4872-8805-ca062fa492a2')
  .query(true)
  .reply(200, {"jobId":"a2a369b1-f784-4872-8805-ca062fa492a2","lastUpdateDateTime":"2021-02-23T19:35:26Z","createdDateTime":"2021-02-23T19:35:22Z","expirationDateTime":"2021-02-24T19:35:22Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '1ea17358-8522-4af8-9cc9-42d068eea001',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:35:28 GMT'
]);

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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/4f27838f-c190-4895-9aa2-0d37f26543fc',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '5a01a227-c0a0-4c67-b076-bf86a3b9cf8e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4f27838f-c190-4895-9aa2-0d37f26543fc')
  .query(true)
  .reply(200, {"jobId":"4f27838f-c190-4895-9aa2-0d37f26543fc","lastUpdateDateTime":"2021-02-23T02:42:28Z","createdDateTime":"2021-02-23T02:42:28Z","expirationDateTime":"2021-02-24T02:42:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '7d81ab34-8925-4a5a-8746-96a9b289041d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4f27838f-c190-4895-9aa2-0d37f26543fc')
  .query(true)
  .reply(200, {"jobId":"4f27838f-c190-4895-9aa2-0d37f26543fc","lastUpdateDateTime":"2021-02-23T02:42:28Z","createdDateTime":"2021-02-23T02:42:28Z","expirationDateTime":"2021-02-24T02:42:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'fb75ce62-7028-4bdb-9f09-30556889b56e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4f27838f-c190-4895-9aa2-0d37f26543fc')
  .query(true)
  .reply(200, {"jobId":"4f27838f-c190-4895-9aa2-0d37f26543fc","lastUpdateDateTime":"2021-02-23T02:42:28Z","createdDateTime":"2021-02-23T02:42:28Z","expirationDateTime":"2021-02-24T02:42:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '00ff72cb-e14f-4f96-8020-61507c6244af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4f27838f-c190-4895-9aa2-0d37f26543fc')
  .query(true)
  .reply(200, {"jobId":"4f27838f-c190-4895-9aa2-0d37f26543fc","lastUpdateDateTime":"2021-02-23T02:42:31Z","createdDateTime":"2021-02-23T02:42:28Z","expirationDateTime":"2021-02-24T02:42:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":18,"length":14,"text":"day of my life","category":"Age","confidenceScore":0.82}],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '76d81caf-bf3e-4212-a92b-162e17abfb82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/4f27838f-c190-4895-9aa2-0d37f26543fc')
  .query(true)
  .reply(200, {"jobId":"4f27838f-c190-4895-9aa2-0d37f26543fc","lastUpdateDateTime":"2021-02-23T02:42:31Z","createdDateTime":"2021-02-23T02:42:28Z","expirationDateTime":"2021-02-24T02:42:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":18,"length":14,"text":"day of my life","category":"Age","confidenceScore":0.82}],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '5ab310da-e1bd-4326-8819-90fef23ab6e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 02:42:32 GMT'
]);

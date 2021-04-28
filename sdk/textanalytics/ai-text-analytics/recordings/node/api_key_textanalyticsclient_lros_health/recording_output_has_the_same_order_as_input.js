let nock = require('nock');

module.exports.hash = "b5f82998ec382ffdc25c0a92c73703fd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/2a103664-12a6-402c-a78d-139ed2bfa3aa',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  'ccd1760d-bb46-424f-8a1f-493ba459cccc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2a103664-12a6-402c-a78d-139ed2bfa3aa')
  .query(true)
  .reply(200, {"jobId":"2a103664-12a6-402c-a78d-139ed2bfa3aa","lastUpdateDateTime":"2021-04-28T21:04:56Z","createdDateTime":"2021-04-28T21:04:56Z","expirationDateTime":"2021-04-29T21:04:56Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'bafeb9ce-dcd2-4713-8aae-b281419282c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2a103664-12a6-402c-a78d-139ed2bfa3aa')
  .query(true)
  .reply(200, {"jobId":"2a103664-12a6-402c-a78d-139ed2bfa3aa","lastUpdateDateTime":"2021-04-28T21:04:56Z","createdDateTime":"2021-04-28T21:04:56Z","expirationDateTime":"2021-04-29T21:04:56Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '166ef113-8232-4e5b-9c57-24ed36d684ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2a103664-12a6-402c-a78d-139ed2bfa3aa')
  .query(true)
  .reply(200, {"jobId":"2a103664-12a6-402c-a78d-139ed2bfa3aa","lastUpdateDateTime":"2021-04-28T21:04:56Z","createdDateTime":"2021-04-28T21:04:56Z","expirationDateTime":"2021-04-29T21:04:56Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c829f84a-9590-425e-b092-bb6c0b24d000',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2a103664-12a6-402c-a78d-139ed2bfa3aa')
  .query(true)
  .reply(200, {"jobId":"2a103664-12a6-402c-a78d-139ed2bfa3aa","lastUpdateDateTime":"2021-04-28T21:04:59Z","createdDateTime":"2021-04-28T21:04:56Z","expirationDateTime":"2021-04-29T21:04:56Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '13543dec-1f9e-4703-9285-c098dbad9592',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/2a103664-12a6-402c-a78d-139ed2bfa3aa')
  .query(true)
  .reply(200, {"jobId":"2a103664-12a6-402c-a78d-139ed2bfa3aa","lastUpdateDateTime":"2021-04-28T21:04:59Z","createdDateTime":"2021-04-28T21:04:56Z","expirationDateTime":"2021-04-29T21:04:56Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]},{"id":"3","entities":[],"relations":[],"warnings":[]},{"id":"4","entities":[],"relations":[],"warnings":[]},{"id":"5","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '28778756-127a-4068-89da-7fd9459ef29b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:00 GMT'
]);

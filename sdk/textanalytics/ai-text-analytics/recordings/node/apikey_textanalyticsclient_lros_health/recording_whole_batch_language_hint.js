let nock = require('nock');

module.exports.hash = "d196642a2f9b21cd2d043bb992f60916";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/3f20185a-7c7b-492c-9cb0-82365247c879',
  'x-envoy-upstream-service-time',
  '324',
  'apim-request-id',
  '0b51abf2-2c15-4fd1-a971-171b2e16f6f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3f20185a-7c7b-492c-9cb0-82365247c879')
  .query(true)
  .reply(200, {"jobId":"3f20185a-7c7b-492c-9cb0-82365247c879","lastUpdateDateTime":"2021-10-23T00:42:43Z","createdDateTime":"2021-10-23T00:42:43Z","expirationDateTime":"2021-10-24T00:42:43Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'ee074954-6860-4914-b33b-360c67d80268',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3f20185a-7c7b-492c-9cb0-82365247c879')
  .query(true)
  .reply(200, {"jobId":"3f20185a-7c7b-492c-9cb0-82365247c879","lastUpdateDateTime":"2021-10-23T00:42:43Z","createdDateTime":"2021-10-23T00:42:43Z","expirationDateTime":"2021-10-24T00:42:43Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '7999a0f1-ee63-4d5b-a1bb-877e229b1e89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3f20185a-7c7b-492c-9cb0-82365247c879')
  .query(true)
  .reply(200, {"jobId":"3f20185a-7c7b-492c-9cb0-82365247c879","lastUpdateDateTime":"2021-10-23T00:42:44Z","createdDateTime":"2021-10-23T00:42:43Z","expirationDateTime":"2021-10-24T00:42:43Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  'ef5162e0-0a22-4184-9eba-cb479306d9ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/3f20185a-7c7b-492c-9cb0-82365247c879')
  .query(true)
  .reply(200, {"jobId":"3f20185a-7c7b-492c-9cb0-82365247c879","lastUpdateDateTime":"2021-10-23T00:42:44Z","createdDateTime":"2021-10-23T00:42:43Z","expirationDateTime":"2021-10-24T00:42:43Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '4252084f-c1e5-44b4-bbb4-fcf77323549e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:46 GMT'
]);

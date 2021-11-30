let nock = require('nock');

module.exports.hash = "a96bcc371f39bc4524aa6f00daa000fe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/05a5bfbc-ed6d-4938-8869-d54c05b07c7c',
  'x-envoy-upstream-service-time',
  '358',
  'apim-request-id',
  '5ae109be-cb1a-4b9a-937e-285677912b1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/05a5bfbc-ed6d-4938-8869-d54c05b07c7c')
  .query(true)
  .reply(200, {"jobId":"05a5bfbc-ed6d-4938-8869-d54c05b07c7c","lastUpdateDateTime":"2021-10-23T00:42:46Z","createdDateTime":"2021-10-23T00:42:46Z","expirationDateTime":"2021-10-24T00:42:46Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a5ea2863-7f3a-43e6-8c40-0da8851199cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/05a5bfbc-ed6d-4938-8869-d54c05b07c7c')
  .query(true)
  .reply(200, {"jobId":"05a5bfbc-ed6d-4938-8869-d54c05b07c7c","lastUpdateDateTime":"2021-10-23T00:42:46Z","createdDateTime":"2021-10-23T00:42:46Z","expirationDateTime":"2021-10-24T00:42:46Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '831e4159-7d60-49d6-874f-e3a36cd5dc46',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/05a5bfbc-ed6d-4938-8869-d54c05b07c7c')
  .query(true)
  .reply(200, {"jobId":"05a5bfbc-ed6d-4938-8869-d54c05b07c7c","lastUpdateDateTime":"2021-10-23T00:42:47Z","createdDateTime":"2021-10-23T00:42:46Z","expirationDateTime":"2021-10-24T00:42:46Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '9b538e5b-a368-4d7e-ad46-1864d25c3ec3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/05a5bfbc-ed6d-4938-8869-d54c05b07c7c')
  .query(true)
  .reply(200, {"jobId":"05a5bfbc-ed6d-4938-8869-d54c05b07c7c","lastUpdateDateTime":"2021-10-23T00:42:47Z","createdDateTime":"2021-10-23T00:42:46Z","expirationDateTime":"2021-10-24T00:42:46Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '62aaeabe-efeb-4023-a6d5-52e5fab9cf13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:48 GMT'
]);

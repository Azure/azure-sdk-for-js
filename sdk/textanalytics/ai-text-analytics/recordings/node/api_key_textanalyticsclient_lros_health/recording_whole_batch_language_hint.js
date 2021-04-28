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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/426a9555-de86-4d73-b4b4-e80931de55f1',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  'c3c52bf1-7dda-4296-af67-c578f450f697',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/426a9555-de86-4d73-b4b4-e80931de55f1')
  .query(true)
  .reply(200, {"jobId":"426a9555-de86-4d73-b4b4-e80931de55f1","lastUpdateDateTime":"2021-04-28T21:05:12Z","createdDateTime":"2021-04-28T21:05:12Z","expirationDateTime":"2021-04-29T21:05:12Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '2145cf47-9b93-4a6d-a3a0-9c0fabe537df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/426a9555-de86-4d73-b4b4-e80931de55f1')
  .query(true)
  .reply(200, {"jobId":"426a9555-de86-4d73-b4b4-e80931de55f1","lastUpdateDateTime":"2021-04-28T21:05:12Z","createdDateTime":"2021-04-28T21:05:12Z","expirationDateTime":"2021-04-29T21:05:12Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '044f3d88-8423-43a2-8086-6d693bc7a0dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/426a9555-de86-4d73-b4b4-e80931de55f1')
  .query(true)
  .reply(200, {"jobId":"426a9555-de86-4d73-b4b4-e80931de55f1","lastUpdateDateTime":"2021-04-28T21:05:14Z","createdDateTime":"2021-04-28T21:05:12Z","expirationDateTime":"2021-04-29T21:05:12Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '4b79894a-cdd3-4f2f-b506-feb5135b4369',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/426a9555-de86-4d73-b4b4-e80931de55f1')
  .query(true)
  .reply(200, {"jobId":"426a9555-de86-4d73-b4b4-e80931de55f1","lastUpdateDateTime":"2021-04-28T21:05:14Z","createdDateTime":"2021-04-28T21:05:12Z","expirationDateTime":"2021-04-29T21:05:12Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  '8f3a90c7-5c74-429d-aa5c-eb345b91543f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:15 GMT'
]);

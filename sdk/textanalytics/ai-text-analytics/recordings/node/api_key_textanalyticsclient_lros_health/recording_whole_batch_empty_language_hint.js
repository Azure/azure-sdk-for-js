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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/ab6f20cd-4dc5-46b0-9c32-3a7a50517558',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  'a2bd7edb-dcb8-4a69-8707-415483940d5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ab6f20cd-4dc5-46b0-9c32-3a7a50517558')
  .query(true)
  .reply(200, {"jobId":"ab6f20cd-4dc5-46b0-9c32-3a7a50517558","lastUpdateDateTime":"2021-04-28T20:14:33Z","createdDateTime":"2021-04-28T20:14:33Z","expirationDateTime":"2021-04-29T20:14:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'dc84d3f5-401f-493b-8787-ee00c0c22578',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ab6f20cd-4dc5-46b0-9c32-3a7a50517558')
  .query(true)
  .reply(200, {"jobId":"ab6f20cd-4dc5-46b0-9c32-3a7a50517558","lastUpdateDateTime":"2021-04-28T20:14:33Z","createdDateTime":"2021-04-28T20:14:33Z","expirationDateTime":"2021-04-29T20:14:33Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  '69108bf1-7314-42a1-8d0a-886961cdd0bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ab6f20cd-4dc5-46b0-9c32-3a7a50517558')
  .query(true)
  .reply(200, {"jobId":"ab6f20cd-4dc5-46b0-9c32-3a7a50517558","lastUpdateDateTime":"2021-04-28T20:14:33Z","createdDateTime":"2021-04-28T20:14:33Z","expirationDateTime":"2021-04-29T20:14:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '03d1fa8d-e2aa-4783-92b6-88d69dd46144',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ab6f20cd-4dc5-46b0-9c32-3a7a50517558')
  .query(true)
  .reply(200, {"jobId":"ab6f20cd-4dc5-46b0-9c32-3a7a50517558","lastUpdateDateTime":"2021-04-28T20:14:33Z","createdDateTime":"2021-04-28T20:14:33Z","expirationDateTime":"2021-04-29T20:14:33Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '55eb94b3-eb88-49a9-ae3e-5f609bcddc55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:34 GMT'
]);

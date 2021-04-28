let nock = require('nock');

module.exports.hash = "29d09cad09699f8d65a8066b64223a17";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"56","text":":)"},{"id":"0","text":":("},{"id":"22","text":""},{"id":"19","text":":P"},{"id":"1","text":":D"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/7116a9eb-f822-4a59-8527-c99100db426d',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  'cf37eb2d-424e-4f7c-853a-dc83188fa4a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7116a9eb-f822-4a59-8527-c99100db426d')
  .query(true)
  .reply(200, {"jobId":"7116a9eb-f822-4a59-8527-c99100db426d","lastUpdateDateTime":"2021-04-28T21:05:00Z","createdDateTime":"2021-04-28T21:05:00Z","expirationDateTime":"2021-04-29T21:05:00Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '02d08802-02d7-4d44-8413-2052f98fa3e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7116a9eb-f822-4a59-8527-c99100db426d')
  .query(true)
  .reply(200, {"jobId":"7116a9eb-f822-4a59-8527-c99100db426d","lastUpdateDateTime":"2021-04-28T21:05:00Z","createdDateTime":"2021-04-28T21:05:00Z","expirationDateTime":"2021-04-29T21:05:00Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '7c50d906-777a-4648-ba0e-25f43575ef72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:00 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7116a9eb-f822-4a59-8527-c99100db426d')
  .query(true)
  .reply(200, {"jobId":"7116a9eb-f822-4a59-8527-c99100db426d","lastUpdateDateTime":"2021-04-28T21:05:00Z","createdDateTime":"2021-04-28T21:05:00Z","expirationDateTime":"2021-04-29T21:05:00Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3bedc514-1b56-4a14-b636-84fe60bb1bfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:02 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7116a9eb-f822-4a59-8527-c99100db426d')
  .query(true)
  .reply(200, {"jobId":"7116a9eb-f822-4a59-8527-c99100db426d","lastUpdateDateTime":"2021-04-28T21:05:04Z","createdDateTime":"2021-04-28T21:05:00Z","expirationDateTime":"2021-04-29T21:05:00Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5141',
  'apim-request-id',
  'eb3ad37c-83be-42c5-a2a5-297df5784340',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/7116a9eb-f822-4a59-8527-c99100db426d')
  .query(true)
  .reply(200, {"jobId":"7116a9eb-f822-4a59-8527-c99100db426d","lastUpdateDateTime":"2021-04-28T21:05:04Z","createdDateTime":"2021-04-28T21:05:00Z","expirationDateTime":"2021-04-29T21:05:00Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"56","entities":[],"relations":[],"warnings":[]},{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"19","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[{"id":"22","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  '79bb076a-50dd-44d5-85d7-6f1596d1af09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:05:09 GMT'
]);

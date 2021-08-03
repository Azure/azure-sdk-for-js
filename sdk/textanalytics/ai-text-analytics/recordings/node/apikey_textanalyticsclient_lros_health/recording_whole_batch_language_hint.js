let nock = require('nock');

module.exports.hash = "cea98c2dd11df24fd03a475a71bfaad5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/bc91d0b0-f436-4b37-ab81-850679a037b4',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  'fece6e24-53b6-4728-9ef6-ca7e1fdaa0db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:27 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bc91d0b0-f436-4b37-ab81-850679a037b4')
  .query(true)
  .reply(200, {"jobId":"bc91d0b0-f436-4b37-ab81-850679a037b4","lastUpdateDateTime":"2021-08-03T03:16:28Z","createdDateTime":"2021-08-03T03:16:28Z","expirationDateTime":"2021-08-04T03:16:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5b092ed3-cfbf-48c7-96fb-46e98289eb9c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:27 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bc91d0b0-f436-4b37-ab81-850679a037b4')
  .query(true)
  .reply(200, {"jobId":"bc91d0b0-f436-4b37-ab81-850679a037b4","lastUpdateDateTime":"2021-08-03T03:16:28Z","createdDateTime":"2021-08-03T03:16:28Z","expirationDateTime":"2021-08-04T03:16:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '5852aada-c093-4b77-a29e-6282b6e6b54f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:27 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bc91d0b0-f436-4b37-ab81-850679a037b4')
  .query(true)
  .reply(200, {"jobId":"bc91d0b0-f436-4b37-ab81-850679a037b4","lastUpdateDateTime":"2021-08-03T03:16:28Z","createdDateTime":"2021-08-03T03:16:28Z","expirationDateTime":"2021-08-04T03:16:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '60e90381-7c39-4b39-908a-c7515c8963bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:30 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/bc91d0b0-f436-4b37-ab81-850679a037b4')
  .query(true)
  .reply(200, {"jobId":"bc91d0b0-f436-4b37-ab81-850679a037b4","lastUpdateDateTime":"2021-08-03T03:16:28Z","createdDateTime":"2021-08-03T03:16:28Z","expirationDateTime":"2021-08-04T03:16:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'f856e704-1770-4b03-9973-d7cddcc5e6c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:16:30 GMT'
]);

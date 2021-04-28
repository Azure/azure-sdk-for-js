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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/96c37836-b4e7-4449-8f85-9471e607cdc5',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '32ec22b1-5ceb-40dc-a9fd-2dc915c81ce1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/96c37836-b4e7-4449-8f85-9471e607cdc5')
  .query(true)
  .reply(200, {"jobId":"96c37836-b4e7-4449-8f85-9471e607cdc5","lastUpdateDateTime":"2021-04-28T20:14:30Z","createdDateTime":"2021-04-28T20:14:30Z","expirationDateTime":"2021-04-29T20:14:30Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '5a2ede23-5e99-4ee3-889a-3ca890f38de0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/96c37836-b4e7-4449-8f85-9471e607cdc5')
  .query(true)
  .reply(200, {"jobId":"96c37836-b4e7-4449-8f85-9471e607cdc5","lastUpdateDateTime":"2021-04-28T20:14:30Z","createdDateTime":"2021-04-28T20:14:30Z","expirationDateTime":"2021-04-29T20:14:30Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'd7b42792-3a9c-43d2-909e-d2421144eeb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/96c37836-b4e7-4449-8f85-9471e607cdc5')
  .query(true)
  .reply(200, {"jobId":"96c37836-b4e7-4449-8f85-9471e607cdc5","lastUpdateDateTime":"2021-04-28T20:14:31Z","createdDateTime":"2021-04-28T20:14:30Z","expirationDateTime":"2021-04-29T20:14:30Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '48',
  'apim-request-id',
  'ab783c96-1b96-4d85-a0ae-64707b8689ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/96c37836-b4e7-4449-8f85-9471e607cdc5')
  .query(true)
  .reply(200, {"jobId":"96c37836-b4e7-4449-8f85-9471e607cdc5","lastUpdateDateTime":"2021-04-28T20:14:31Z","createdDateTime":"2021-04-28T20:14:30Z","expirationDateTime":"2021-04-29T20:14:30Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  'c315c299-2177-4f61-9cda-a2c746d4c0b1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:32 GMT'
]);

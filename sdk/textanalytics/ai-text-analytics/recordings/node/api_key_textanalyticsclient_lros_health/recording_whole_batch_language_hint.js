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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/f3db23c2-a4dc-4da8-b190-f0b9b511a953',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '248f2131-afa2-4155-b8e4-50266a7ab128',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f3db23c2-a4dc-4da8-b190-f0b9b511a953')
  .query(true)
  .reply(200, {"jobId":"f3db23c2-a4dc-4da8-b190-f0b9b511a953","lastUpdateDateTime":"2021-03-04T20:18:39Z","createdDateTime":"2021-03-04T20:18:39Z","expirationDateTime":"2021-03-05T20:18:39Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '3629894a-ef76-4730-9938-54c648624038',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f3db23c2-a4dc-4da8-b190-f0b9b511a953')
  .query(true)
  .reply(200, {"jobId":"f3db23c2-a4dc-4da8-b190-f0b9b511a953","lastUpdateDateTime":"2021-03-04T20:18:39Z","createdDateTime":"2021-03-04T20:18:39Z","expirationDateTime":"2021-03-05T20:18:39Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd598b4f5-9b95-4499-903f-a19292417433',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f3db23c2-a4dc-4da8-b190-f0b9b511a953')
  .query(true)
  .reply(200, {"jobId":"f3db23c2-a4dc-4da8-b190-f0b9b511a953","lastUpdateDateTime":"2021-03-04T20:18:40Z","createdDateTime":"2021-03-04T20:18:39Z","expirationDateTime":"2021-03-05T20:18:39Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'ef700c5c-3c26-4ec7-9086-6ff2ed253d96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/f3db23c2-a4dc-4da8-b190-f0b9b511a953')
  .query(true)
  .reply(200, {"jobId":"f3db23c2-a4dc-4da8-b190-f0b9b511a953","lastUpdateDateTime":"2021-03-04T20:18:40Z","createdDateTime":"2021-03-04T20:18:39Z","expirationDateTime":"2021-03-05T20:18:39Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '984a76fe-b996-4dce-a204-78a9e329f6c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 04 Mar 2021 20:18:41 GMT'
]);

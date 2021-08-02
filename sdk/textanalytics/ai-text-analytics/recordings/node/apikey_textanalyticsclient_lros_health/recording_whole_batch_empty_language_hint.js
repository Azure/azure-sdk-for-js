let nock = require('nock');

module.exports.hash = "38c89bab41a80575c79a37ce18c38ae0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/1313fc00-4a95-4d02-9e1e-73920aa2821f',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '9cd6befb-5c53-42ce-90c9-3eac571468ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/1313fc00-4a95-4d02-9e1e-73920aa2821f')
  .query(true)
  .reply(200, {"jobId":"1313fc00-4a95-4d02-9e1e-73920aa2821f","lastUpdateDateTime":"2021-06-25T19:56:40Z","createdDateTime":"2021-06-25T19:56:40Z","expirationDateTime":"2021-06-26T19:56:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'ec9bc65d-f4a1-4291-9188-45ecbd86160c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/1313fc00-4a95-4d02-9e1e-73920aa2821f')
  .query(true)
  .reply(200, {"jobId":"1313fc00-4a95-4d02-9e1e-73920aa2821f","lastUpdateDateTime":"2021-06-25T19:56:40Z","createdDateTime":"2021-06-25T19:56:40Z","expirationDateTime":"2021-06-26T19:56:40Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '230de852-e11a-46a8-903d-f3fab7905b1c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/1313fc00-4a95-4d02-9e1e-73920aa2821f')
  .query(true)
  .reply(200, {"jobId":"1313fc00-4a95-4d02-9e1e-73920aa2821f","lastUpdateDateTime":"2021-06-25T19:56:41Z","createdDateTime":"2021-06-25T19:56:40Z","expirationDateTime":"2021-06-26T19:56:40Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '0d951842-8334-4822-9f00-c93e2cf49e4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/1313fc00-4a95-4d02-9e1e-73920aa2821f')
  .query(true)
  .reply(200, {"jobId":"1313fc00-4a95-4d02-9e1e-73920aa2821f","lastUpdateDateTime":"2021-06-25T19:56:41Z","createdDateTime":"2021-06-25T19:56:40Z","expirationDateTime":"2021-06-26T19:56:40Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[],"relations":[],"warnings":[]},{"id":"1","entities":[],"relations":[],"warnings":[]},{"id":"2","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '359f80ed-2b31-4e54-95bc-e506d9d3f5c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:42 GMT'
]);

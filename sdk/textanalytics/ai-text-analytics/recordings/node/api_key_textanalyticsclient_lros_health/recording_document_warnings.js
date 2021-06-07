let nock = require('nock');

module.exports.hash = "f8a5f7ad0b9546a9cbb856f66ab9f72e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1-preview.5/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.5/entities/health/jobs/763d1b09-7957-4e46-824d-58a0411f7d3b',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '0f7df88c-07a6-47f7-b78c-062fc200eb50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/763d1b09-7957-4e46-824d-58a0411f7d3b')
  .query(true)
  .reply(200, {"jobId":"763d1b09-7957-4e46-824d-58a0411f7d3b","lastUpdateDateTime":"2021-05-12T19:04:50Z","createdDateTime":"2021-05-12T19:04:50Z","expirationDateTime":"2021-05-13T19:04:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '7a992fd1-96f7-413b-a154-bb254eabbcf6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/763d1b09-7957-4e46-824d-58a0411f7d3b')
  .query(true)
  .reply(200, {"jobId":"763d1b09-7957-4e46-824d-58a0411f7d3b","lastUpdateDateTime":"2021-05-12T19:04:50Z","createdDateTime":"2021-05-12T19:04:50Z","expirationDateTime":"2021-05-13T19:04:50Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '3aeecffc-9871-4c82-a10e-f7eb5bd92a77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:49 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/763d1b09-7957-4e46-824d-58a0411f7d3b')
  .query(true)
  .reply(200, {"jobId":"763d1b09-7957-4e46-824d-58a0411f7d3b","lastUpdateDateTime":"2021-05-12T19:04:51Z","createdDateTime":"2021-05-12T19:04:50Z","expirationDateTime":"2021-05-13T19:04:50Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '34',
  'apim-request-id',
  'ff82c641-f9e2-458d-a482-17f72072658e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:51 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1-preview.5/entities/health/jobs/763d1b09-7957-4e46-824d-58a0411f7d3b')
  .query(true)
  .reply(200, {"jobId":"763d1b09-7957-4e46-824d-58a0411f7d3b","lastUpdateDateTime":"2021-05-12T19:04:51Z","createdDateTime":"2021-05-12T19:04:50Z","expirationDateTime":"2021-05-13T19:04:50Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  '81fe95a3-4e6c-495a-bfa5-aaa1e75ab034',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 12 May 2021 19:04:52 GMT'
]);

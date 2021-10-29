let nock = require('nock');

module.exports.hash = "692c28f4e7d96a9f71e04224dcbab4ad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/ebfb6ad0-1bdd-4eb5-b486-056be2c49d55',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'e683901e-bb10-4539-93d1-8831cee7ecf1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/ebfb6ad0-1bdd-4eb5-b486-056be2c49d55')
  .query(true)
  .reply(200, {"jobId":"ebfb6ad0-1bdd-4eb5-b486-056be2c49d55","lastUpdateDateTime":"2021-10-23T00:42:32Z","createdDateTime":"2021-10-23T00:42:32Z","expirationDateTime":"2021-10-24T00:42:32Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '32',
  'apim-request-id',
  'bbfd3f08-e9ea-42b1-bacc-029392c2fe0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/ebfb6ad0-1bdd-4eb5-b486-056be2c49d55')
  .query(true)
  .reply(200, {"jobId":"ebfb6ad0-1bdd-4eb5-b486-056be2c49d55","lastUpdateDateTime":"2021-10-23T00:42:32Z","createdDateTime":"2021-10-23T00:42:32Z","expirationDateTime":"2021-10-24T00:42:32Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'a4786757-ba6f-490e-a0ec-7c43d16cd473',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/ebfb6ad0-1bdd-4eb5-b486-056be2c49d55')
  .query(true)
  .reply(200, {"jobId":"ebfb6ad0-1bdd-4eb5-b486-056be2c49d55","lastUpdateDateTime":"2021-10-23T00:42:33Z","createdDateTime":"2021-10-23T00:42:32Z","expirationDateTime":"2021-10-24T00:42:32Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '921b866b-ccfb-41e2-8194-449c0cd57f58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/ebfb6ad0-1bdd-4eb5-b486-056be2c49d55')
  .query(true)
  .reply(200, {"jobId":"ebfb6ad0-1bdd-4eb5-b486-056be2c49d55","lastUpdateDateTime":"2021-10-23T00:42:33Z","createdDateTime":"2021-10-23T00:42:32Z","expirationDateTime":"2021-10-24T00:42:32Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '7ee2fab4-4a25-4e7c-94fc-2cc63da1fde6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:42:34 GMT'
]);

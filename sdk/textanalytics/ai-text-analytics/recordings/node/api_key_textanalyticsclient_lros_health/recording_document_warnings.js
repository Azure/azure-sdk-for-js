let nock = require('nock');

module.exports.hash = "f8a5f7ad0b9546a9cbb856f66ab9f72e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.4/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/38a8c4a2-8423-485d-b48b-10c6ea61186b',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '6c7d3c57-4131-4ad9-bb94-50983cbffe19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/38a8c4a2-8423-485d-b48b-10c6ea61186b')
  .query(true)
  .reply(200, {"jobId":"38a8c4a2-8423-485d-b48b-10c6ea61186b","lastUpdateDateTime":"2021-04-28T21:04:53Z","createdDateTime":"2021-04-28T21:04:53Z","expirationDateTime":"2021-04-29T21:04:53Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '6edd2428-291c-4dd9-babe-1daaece48724',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/38a8c4a2-8423-485d-b48b-10c6ea61186b')
  .query(true)
  .reply(200, {"jobId":"38a8c4a2-8423-485d-b48b-10c6ea61186b","lastUpdateDateTime":"2021-04-28T21:04:54Z","createdDateTime":"2021-04-28T21:04:53Z","expirationDateTime":"2021-04-29T21:04:53Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f3800445-238f-435f-8f08-ea9e69283ec0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/38a8c4a2-8423-485d-b48b-10c6ea61186b')
  .query(true)
  .reply(200, {"jobId":"38a8c4a2-8423-485d-b48b-10c6ea61186b","lastUpdateDateTime":"2021-04-28T21:04:54Z","createdDateTime":"2021-04-28T21:04:53Z","expirationDateTime":"2021-04-29T21:04:53Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '31',
  'apim-request-id',
  'be1c2f7e-4983-43d1-a3e5-f356abdeb8e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/38a8c4a2-8423-485d-b48b-10c6ea61186b')
  .query(true)
  .reply(200, {"jobId":"38a8c4a2-8423-485d-b48b-10c6ea61186b","lastUpdateDateTime":"2021-04-28T21:04:54Z","createdDateTime":"2021-04-28T21:04:53Z","expirationDateTime":"2021-04-29T21:04:53Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'ce7040f3-b8b0-4854-8d28-fd4d634b9ee0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 21:04:55 GMT'
]);

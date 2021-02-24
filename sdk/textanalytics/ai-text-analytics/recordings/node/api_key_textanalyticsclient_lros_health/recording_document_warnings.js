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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/a0ab67f3-457a-47bd-8d59-5df62cb41d17',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '4fe86f0f-a230-4945-bf7b-65ad6a8d0c62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a0ab67f3-457a-47bd-8d59-5df62cb41d17')
  .query(true)
  .reply(200, {"jobId":"a0ab67f3-457a-47bd-8d59-5df62cb41d17","lastUpdateDateTime":"2021-02-23T19:34:52Z","createdDateTime":"2021-02-23T19:34:52Z","expirationDateTime":"2021-02-24T19:34:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bf607b36-3367-4896-a2f4-6903fc5f4f9f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a0ab67f3-457a-47bd-8d59-5df62cb41d17')
  .query(true)
  .reply(200, {"jobId":"a0ab67f3-457a-47bd-8d59-5df62cb41d17","lastUpdateDateTime":"2021-02-23T19:34:52Z","createdDateTime":"2021-02-23T19:34:52Z","expirationDateTime":"2021-02-24T19:34:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'ca8f2299-4675-4f79-9c2c-9058e8eeb153',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a0ab67f3-457a-47bd-8d59-5df62cb41d17')
  .query(true)
  .reply(200, {"jobId":"a0ab67f3-457a-47bd-8d59-5df62cb41d17","lastUpdateDateTime":"2021-02-23T19:34:52Z","createdDateTime":"2021-02-23T19:34:52Z","expirationDateTime":"2021-02-24T19:34:52Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1bf153a4-ad11-4d96-8d3e-cf175d6e1866',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a0ab67f3-457a-47bd-8d59-5df62cb41d17')
  .query(true)
  .reply(200, {"jobId":"a0ab67f3-457a-47bd-8d59-5df62cb41d17","lastUpdateDateTime":"2021-02-23T19:34:56Z","createdDateTime":"2021-02-23T19:34:52Z","expirationDateTime":"2021-02-24T19:34:52Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'ac627c48-9130-490f-b420-d7cef030baa4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:56 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/a0ab67f3-457a-47bd-8d59-5df62cb41d17')
  .query(true)
  .reply(200, {"jobId":"a0ab67f3-457a-47bd-8d59-5df62cb41d17","lastUpdateDateTime":"2021-02-23T19:34:56Z","createdDateTime":"2021-02-23T19:34:52Z","expirationDateTime":"2021-02-24T19:34:52Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-11"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '0211ddc1-3bdb-42a5-8e8e-6ae0d00d2ade',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 23 Feb 2021 19:34:56 GMT'
]);

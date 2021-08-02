let nock = require('nock');

module.exports.hash = "fcf7c06497229418e8940596f0f9de59";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"This won't actually create a warning :'("}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/fb29d471-cec9-4687-9a6d-d79ab08caa16',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '8a74d81a-30c8-4012-b1a7-e325538f78f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/fb29d471-cec9-4687-9a6d-d79ab08caa16')
  .query(true)
  .reply(200, {"jobId":"fb29d471-cec9-4687-9a6d-d79ab08caa16","lastUpdateDateTime":"2021-06-25T19:56:26Z","createdDateTime":"2021-06-25T19:56:26Z","expirationDateTime":"2021-06-26T19:56:26Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'f3d7105e-3b30-468d-9767-f62442431b28',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/fb29d471-cec9-4687-9a6d-d79ab08caa16')
  .query(true)
  .reply(200, {"jobId":"fb29d471-cec9-4687-9a6d-d79ab08caa16","lastUpdateDateTime":"2021-06-25T19:56:26Z","createdDateTime":"2021-06-25T19:56:26Z","expirationDateTime":"2021-06-26T19:56:26Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'bbdfd4a4-8e6c-42c8-a447-a4b139595669',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/fb29d471-cec9-4687-9a6d-d79ab08caa16')
  .query(true)
  .reply(200, {"jobId":"fb29d471-cec9-4687-9a6d-d79ab08caa16","lastUpdateDateTime":"2021-06-25T19:56:29Z","createdDateTime":"2021-06-25T19:56:26Z","expirationDateTime":"2021-06-26T19:56:26Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '54',
  'apim-request-id',
  'c1bc58db-dc3c-48f7-be5b-742b952af9b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:29 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/fb29d471-cec9-4687-9a6d-d79ab08caa16')
  .query(true)
  .reply(200, {"jobId":"fb29d471-cec9-4687-9a6d-d79ab08caa16","lastUpdateDateTime":"2021-06-25T19:56:29Z","createdDateTime":"2021-06-25T19:56:26Z","expirationDateTime":"2021-06-26T19:56:26Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '7d0449d2-4c77-4682-9980-0c84c782bc07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:29 GMT'
]);

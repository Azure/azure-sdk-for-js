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
  'https://endpoint/text/analytics/v3.1-preview.4/entities/health/jobs/ec481c90-f460-45bf-b419-8d57ec32d1a8',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '193bdf88-6556-4f01-ac96-101dedf1176e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ec481c90-f460-45bf-b419-8d57ec32d1a8')
  .query(true)
  .reply(200, {"jobId":"ec481c90-f460-45bf-b419-8d57ec32d1a8","lastUpdateDateTime":"2021-04-28T20:14:15Z","createdDateTime":"2021-04-28T20:14:15Z","expirationDateTime":"2021-04-29T20:14:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '0d67e5b1-0fd4-493f-969b-77f54b882c85',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ec481c90-f460-45bf-b419-8d57ec32d1a8')
  .query(true)
  .reply(200, {"jobId":"ec481c90-f460-45bf-b419-8d57ec32d1a8","lastUpdateDateTime":"2021-04-28T20:14:15Z","createdDateTime":"2021-04-28T20:14:15Z","expirationDateTime":"2021-04-29T20:14:15Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a15413f2-3d54-4e5c-98ba-4c813edfded0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ec481c90-f460-45bf-b419-8d57ec32d1a8')
  .query(true)
  .reply(200, {"jobId":"ec481c90-f460-45bf-b419-8d57ec32d1a8","lastUpdateDateTime":"2021-04-28T20:14:16Z","createdDateTime":"2021-04-28T20:14:15Z","expirationDateTime":"2021-04-29T20:14:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '35',
  'apim-request-id',
  'e6fd6196-fd9f-4a68-b4da-5189b16c38ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.4/entities/health/jobs/ec481c90-f460-45bf-b419-8d57ec32d1a8')
  .query(true)
  .reply(200, {"jobId":"ec481c90-f460-45bf-b419-8d57ec32d1a8","lastUpdateDateTime":"2021-04-28T20:14:16Z","createdDateTime":"2021-04-28T20:14:15Z","expirationDateTime":"2021-04-29T20:14:15Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"1","entities":[],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-03-01"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '33',
  'apim-request-id',
  'f7aa1794-5e84-4712-b7ab-47f7b228ed5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:14:17 GMT'
]);

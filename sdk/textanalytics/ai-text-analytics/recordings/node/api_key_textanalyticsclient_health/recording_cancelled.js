let nock = require('nock');

module.exports.hash = "a96b92d5720c315db493d9918f41abb9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/e84e01a7-9452-404a-b5ba-f4d6351606da',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  'dccb9a8f-e4dd-4f90-bb2b-b5770355883a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/e84e01a7-9452-404a-b5ba-f4d6351606da')
  .query(true)
  .reply(200, {"jobId":"e84e01a7-9452-404a-b5ba-f4d6351606da","lastUpdateDateTime":"2020-11-20T00:13:44Z","createdDateTime":"2020-11-20T00:13:44Z","expirationDateTime":"2020-11-21T00:13:44Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'f430e27b-e88e-4c61-81a9-7804ee52ff7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:43 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1-preview.3/entities/health/jobs/e84e01a7-9452-404a-b5ba-f4d6351606da')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/e84e01a7-9452-404a-b5ba-f4d6351606da',
  'x-envoy-upstream-service-time',
  '21',
  'apim-request-id',
  'd7a6d1d5-eee1-46e3-b811-5285995a789e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 20 Nov 2020 00:13:43 GMT'
]);

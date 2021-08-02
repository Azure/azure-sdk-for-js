let nock = require('nock');

module.exports.hash = "d0dea63ab7cc530d4397e7208f975080";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/f80e12eb-e715-4e61-9ebd-fbdc971af35a',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '4567ecab-6b9f-4fd7-a19a-fc3eb59209aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/f80e12eb-e715-4e61-9ebd-fbdc971af35a')
  .query(true)
  .reply(200, {"jobId":"f80e12eb-e715-4e61-9ebd-fbdc971af35a","lastUpdateDateTime":"2021-06-25T19:56:56Z","createdDateTime":"2021-06-25T19:56:56Z","expirationDateTime":"2021-06-26T19:56:56Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'c2f098df-6ae5-451d-8491-d3adb49b7dce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:55 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/text/analytics/v3.1/entities/health/jobs/f80e12eb-e715-4e61-9ebd-fbdc971af35a')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/f80e12eb-e715-4e61-9ebd-fbdc971af35a',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'c49477af-8175-4683-8658-5831b781b6f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:56:55 GMT'
]);

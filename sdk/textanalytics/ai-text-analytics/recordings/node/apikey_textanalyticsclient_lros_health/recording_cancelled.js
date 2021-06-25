let nock = require('nock');

module.exports.hash = "d0dea63ab7cc530d4397e7208f975080";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"1","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"2","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/126e74d6-2b71-45cc-a303-8b6adc759cc1',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '02b2ad44-7e83-469d-8c42-3605dc4a2899',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/entities/health/jobs/126e74d6-2b71-45cc-a303-8b6adc759cc1')
  .query(true)
  .reply(200, {"jobId":"126e74d6-2b71-45cc-a303-8b6adc759cc1","lastUpdateDateTime":"2021-06-25T05:11:28Z","createdDateTime":"2021-06-25T05:11:27Z","expirationDateTime":"2021-06-26T05:11:27Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '1f570b2c-94db-46a0-abd9-e8e6b534d11b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('//text/analytics/v3.1/entities/health/jobs/126e74d6-2b71-45cc-a303-8b6adc759cc1')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/126e74d6-2b71-45cc-a303-8b6adc759cc1',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '1247c00a-e15e-4d6c-8b16-59002ea47390',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 05:11:28 GMT'
]);

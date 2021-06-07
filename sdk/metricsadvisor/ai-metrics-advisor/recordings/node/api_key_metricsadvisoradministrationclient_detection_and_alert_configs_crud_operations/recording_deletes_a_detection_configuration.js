let nock = require('nock');

module.exports.hash = "14054da5863782c4fc6a8a675748b72d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a7cc6dda-d4e7-447d-aa57-3fc3395d5516')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e3f70da9-9f7b-48a1-91fe-c29ffbf8d6dc',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  'e3f70da9-9f7b-48a1-91fe-c29ffbf8d6dc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a7cc6dda-d4e7-447d-aa57-3fc3395d5516')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 9a0637da-d009-4ce8-9736-0ed4a568cc2d"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6cee0b27-b784-494a-b547-35abf14555ea',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '6cee0b27-b784-494a-b547-35abf14555ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:53 GMT'
]);

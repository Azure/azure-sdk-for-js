let nock = require('nock');

module.exports.hash = "245355127474a82348bfd6e169bccfd4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/c4ea04e0-2626-41f3-acc7-31c85df331c2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f79b803b-1d1b-4fef-ba8b-5cebac087374',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  'f79b803b-1d1b-4fef-ba8b-5cebac087374',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/c4ea04e0-2626-41f3-acc7-31c85df331c2')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 1c35c629-18d4-450f-92fc-d39cb7123619"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1c35c629-18d4-450f-92fc-d39cb7123619',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '1c35c629-18d4-450f-92fc-d39cb7123619',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:21 GMT'
]);

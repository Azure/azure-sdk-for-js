let nock = require('nock');

module.exports.hash = "245355127474a82348bfd6e169bccfd4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/101f1f1d-203a-4a25-83e3-d0258aff44d1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '98f7a449-aec3-46f5-baa2-7554a2138fd9',
  'x-envoy-upstream-service-time',
  '122',
  'apim-request-id',
  '98f7a449-aec3-46f5-baa2-7554a2138fd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:02:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/101f1f1d-203a-4a25-83e3-d0258aff44d1')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: b8e7b952-ac9b-4d47-baa7-3e78087f0b74"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b8e7b952-ac9b-4d47-baa7-3e78087f0b74',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'b8e7b952-ac9b-4d47-baa7-3e78087f0b74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:02:00 GMT'
]);

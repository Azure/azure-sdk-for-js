let nock = require('nock');

module.exports.hash = "245355127474a82348bfd6e169bccfd4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/52eba2dd-87a2-44d7-b4f2-3510e7df5647')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bbcce9ae-b749-417d-a67b-603a048fd5d3',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'bbcce9ae-b749-417d-a67b-603a048fd5d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/52eba2dd-87a2-44d7-b4f2-3510e7df5647')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 1033bcf2-0615-45b2-a4f3-3d60844e0d6a"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1033bcf2-0615-45b2-a4f3-3d60844e0d6a',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '1033bcf2-0615-45b2-a4f3-3d60844e0d6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:15 GMT'
]);

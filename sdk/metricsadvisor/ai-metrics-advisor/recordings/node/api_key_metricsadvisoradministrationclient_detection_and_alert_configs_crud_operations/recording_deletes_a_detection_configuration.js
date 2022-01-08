let nock = require('nock');

module.exports.hash = "245355127474a82348bfd6e169bccfd4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/359d1bf9-0c6a-4063-bd2d-64b80f65253b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'be54936f-a1dd-4009-833a-f4ccc0761ea3',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'be54936f-a1dd-4009-833a-f4ccc0761ea3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/359d1bf9-0c6a-4063-bd2d-64b80f65253b')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: aa7d59d6-d1a6-477f-bd28-05ee0d93d294"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'aa7d59d6-d1a6-477f-bd28-05ee0d93d294',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  'aa7d59d6-d1a6-477f-bd28-05ee0d93d294',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:03 GMT'
]);

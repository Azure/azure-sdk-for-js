let nock = require('nock');

module.exports.hash = "5349a68c0261fcac86d6839b6fdcbd32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/e3ab2e89-d596-47aa-8ea8-5bd724f3b827')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3b339bb5-f140-49a7-84b5-12bb2aca4f4b',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '3b339bb5-f140-49a7-84b5-12bb2aca4f4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/e3ab2e89-d596-47aa-8ea8-5bd724f3b827')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: f7d199a0-13c8-446f-8349-14dbd006ae4f"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fb48d2e6-3712-476e-aed9-f42eea285dbe',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  'fb48d2e6-3712-476e-aed9-f42eea285dbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:43 GMT'
]);

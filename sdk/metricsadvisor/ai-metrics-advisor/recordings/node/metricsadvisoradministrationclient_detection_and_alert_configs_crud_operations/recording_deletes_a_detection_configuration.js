let nock = require('nock');

module.exports.hash = "5349a68c0261fcac86d6839b6fdcbd32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/140d75a6-c547-43fb-9254-a7ba9093e5e4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a9e827ae-4687-4153-ac5c-fb8743564f87',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  'a9e827ae-4687-4153-ac5c-fb8743564f87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/140d75a6-c547-43fb-9254-a7ba9093e5e4')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: d180622c-2bd1-458f-8139-cd523ff82076"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1c3c5ee2-e1c2-44a7-bd4c-bc217654e8f5',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '1c3c5ee2-e1c2-44a7-bd4c-bc217654e8f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:26 GMT'
]);

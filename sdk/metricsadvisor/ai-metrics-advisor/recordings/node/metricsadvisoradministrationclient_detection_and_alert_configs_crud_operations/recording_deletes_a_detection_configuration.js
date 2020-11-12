let nock = require('nock');

module.exports.hash = "5349a68c0261fcac86d6839b6fdcbd32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/8f867116-8170-4273-90a9-9ecb10e1f57e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '7e7ccde8-be20-46ba-a2b8-a4ee533787b3',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '7e7ccde8-be20-46ba-a2b8-a4ee533787b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/8f867116-8170-4273-90a9-9ecb10e1f57e')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 83889a35-443d-44e9-98ad-ed5074a867aa"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fed17923-2c5f-494f-8747-275cd682430e',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'fed17923-2c5f-494f-8747-275cd682430e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:34 GMT'
]);

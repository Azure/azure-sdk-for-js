let nock = require('nock');

module.exports.hash = "5349a68c0261fcac86d6839b6fdcbd32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/45e4fefe-51b9-4efd-9981-594c1ef0d129')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1f65d08a-645b-46d8-b187-4d2e42ae4b0f',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '1f65d08a-645b-46d8-b187-4d2e42ae4b0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/45e4fefe-51b9-4efd-9981-594c1ef0d129')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 6f5b9f0a-8c40-46d5-8a64-7d3f1a309467"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5bcf6c2d-6ffa-480b-91a7-9c0f6bd9aa15',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '5bcf6c2d-6ffa-480b-91a7-9c0f6bd9aa15',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:13 GMT'
]);

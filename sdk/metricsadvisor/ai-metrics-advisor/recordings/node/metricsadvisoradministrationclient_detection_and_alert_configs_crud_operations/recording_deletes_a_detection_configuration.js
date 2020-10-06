let nock = require('nock');

module.exports.hash = "5bafa7f0b31b621537c9ea4b442bba98";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'acce692e-1896-47dc-a049-985c8df8e7c0',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  'acce692e-1896-47dc-a049-985c8df8e7c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:22 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: c08e65a0-48db-47c5-abf7-4896f77ac63c"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '320f5f29-ed69-4d3f-a045-3932726e03cb',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '320f5f29-ed69-4d3f-a045-3932726e03cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:23 GMT',
  'Connection',
  'close'
]);

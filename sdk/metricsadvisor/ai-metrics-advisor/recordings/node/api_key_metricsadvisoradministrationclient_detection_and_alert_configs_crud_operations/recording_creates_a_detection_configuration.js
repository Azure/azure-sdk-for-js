let nock = require('nock');

module.exports.hash = "604c444121fe9b7e17ed24f2f1fa23ce";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-162261479537204972"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-162261479537204972","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":200,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":20,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(400, {"code":"Bad Request","message":"Invalid parameter. config count should be less than or equal to 10. TraceId: 0cb34d17-3d2b-4566-9307-a289d3be45d1"}, [
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '158cb65e-bdf3-49a2-95e4-35b0b8d84385',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '158cb65e-bdf3-49a2-95e4-35b0b8d84385',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 06:19:54 GMT',
  'Connection',
  'close'
]);

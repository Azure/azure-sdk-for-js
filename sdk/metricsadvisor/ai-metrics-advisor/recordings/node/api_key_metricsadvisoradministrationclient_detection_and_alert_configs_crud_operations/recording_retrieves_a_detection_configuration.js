let nock = require('nock');

module.exports.hash = "aa742447367ad6adc2b1fa3f71e305ff";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/d0d157b8-8b45-4f84-9129-fda310802e17')
  .reply(200, {"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","name":"js-detection-config-162105174986805284","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '26a3b8e1-a12a-4475-a9ff-c6d424280de6',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '26a3b8e1-a12a-4475-a9ff-c6d424280de6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:15 GMT'
]);

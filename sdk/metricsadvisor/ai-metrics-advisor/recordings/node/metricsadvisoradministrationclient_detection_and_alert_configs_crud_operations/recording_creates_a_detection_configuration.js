let nock = require('nock');

module.exports.hash = "cd97535d75923024eaf0deda7c055a75";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-160523005328008226"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-160523005328008226","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/140d75a6-c547-43fb-9254-a7ba9093e5e4',
  'x-request-id',
  '43cb404d-9cc6-4ea1-9cb9-61faba04945c',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '43cb404d-9cc6-4ea1-9cb9-61faba04945c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/140d75a6-c547-43fb-9254-a7ba9093e5e4')
  .reply(200, {"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","name":"js-detection-config-160523005328008226","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fd4d7bdd-a0e4-4646-9513-4692cf12cfce',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'fd4d7bdd-a0e4-4646-9513-4692cf12cfce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:12 GMT'
]);

let nock = require('nock');

module.exports.hash = "cdc8e8cfa2fd3c54c01057e330680c55";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-164160816011102241"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-164160816011102241","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/359d1bf9-0c6a-4063-bd2d-64b80f65253b',
  'x-request-id',
  '7c932f48-645a-4e80-aefc-ab9f4218fd62',
  'x-envoy-upstream-service-time',
  '219',
  'apim-request-id',
  '7c932f48-645a-4e80-aefc-ab9f4218fd62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:15:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/359d1bf9-0c6a-4063-bd2d-64b80f65253b')
  .reply(200, {"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","name":"js-detection-config-164160816011102241","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fdd6ce66-7990-4def-9062-905aca2cefcb',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  'fdd6ce66-7990-4def-9062-905aca2cefcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:15:59 GMT'
]);

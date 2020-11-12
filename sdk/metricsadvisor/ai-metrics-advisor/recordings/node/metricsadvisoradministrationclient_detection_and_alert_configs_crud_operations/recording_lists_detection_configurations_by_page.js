let nock = require('nock');

module.exports.hash = "0acbbdcc06fe619851f0dc8fdf92388c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/enrichment/anomalyDetection/configurations')
  .reply(200, {"value":[{"anomalyDetectionConfigurationId":"e17f32d4-3ddf-4dc7-84ee-b4130c7e1777","name":"detection-config","description":"","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"smartDetectionCondition":{"sensitivity":100,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":1,"minRatio":100}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"10240200-6f3a-4783-b8e4-e7b34a3973d6","name":"my_detection_config","description":"anomaly detection config for metric","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"conditionOperator":"OR","smartDetectionCondition":{"sensitivity":10,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"hardThresholdCondition":{"upperBound":100,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":20,"shiftPoint":10,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":5,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"5d50b465-7565-4167-b33b-b92eb3199254","name":"test_detection_configuration1605051259010","description":"Detection configuration description","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"smartDetectionCondition":{"sensitivity":100,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":1,"minRatio":1}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"5c54b62e-6be7-4d64-b085-60e9bd59fa79","name":"Default","description":"","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"smartDetectionCondition":{"sensitivity":100,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":1,"minRatio":100}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}]}, [
  'Content-Length',
  '2052',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '38795da2-303a-40f9-bf01-cc4dbcff63fc',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '38795da2-303a-40f9-bf01-cc4dbcff63fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 21:11:44 GMT'
]);

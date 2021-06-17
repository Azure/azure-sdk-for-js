let nock = require('nock');

module.exports.hash = "8300939e1687bf8e27dd3a19a7f48f5c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/enrichment/anomalyDetection/configurations')
  .reply(200, {"value":[{"anomalyDetectionConfigurationId":"10240200-6f3a-4783-b8e4-e7b34a3973d6","name":"my_detection_config","description":"anomaly detection config for metric","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","smartDetectionCondition":{"sensitivity":10,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"hardThresholdCondition":{"upperBound":100,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":20,"shiftPoint":10,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":5,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"35c5ee94-8512-4cdc-afc0-fdbb36e38569","name":"NET_SAMPLE_DONT_DELETE","description":"","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","smartDetectionCondition":{"sensitivity":10,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":4,"minRatio":50}},"hardThresholdCondition":{"lowerBound":5,"anomalyDetectorDirection":"Down","suppressCondition":{"minNumber":1,"minRatio":100}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"5c471d57-6218-46e1-b096-660d715f1834","name":"Sample anomaly detection configuration","description":"","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","smartDetectionCondition":{"sensitivity":10,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":4,"minRatio":50}},"hardThresholdCondition":{"lowerBound":5,"anomalyDetectorDirection":"Down","suppressCondition":{"minNumber":1,"minRatio":100}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"5d50b465-7565-4167-b33b-b92eb3199254","name":"test_detection_configuration1605051259010","description":"Detection configuration description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"smartDetectionCondition":{"sensitivity":100,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":1,"minRatio":1}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","name":"new Name","description":"new description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"city":"Mumbai"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"dimension":{"city":"Kolkata","category":"Handmade"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}}]},{"anomalyDetectionConfigurationId":"e17f32d4-3ddf-4dc7-84ee-b4130c7e1777","name":"detection-config","description":"","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"smartDetectionCondition":{"sensitivity":100,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":1,"minRatio":100}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}]}, [
  'Content-Length',
  '3814',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c02f6a3e-9ef2-42ca-9248-2d4f29f67147',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  'c02f6a3e-9ef2-42ca-9248-2d4f29f67147',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:51 GMT'
]);

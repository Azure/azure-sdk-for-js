let nock = require('nock');

module.exports.hash = "cd97535d75923024eaf0deda7c055a75";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-160521950750209992"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-160521950750209992","description":"fresh detection","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/0491bfd7-b80a-4c2b-a32b-009e355a6cf5',
  'x-request-id',
  'b0a25dd9-089c-4460-b39f-375fcff731bb',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'b0a25dd9-089c-4460-b39f-375fcff731bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 22:18:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/0491bfd7-b80a-4c2b-a32b-009e355a6cf5')
  .reply(200, {"anomalyDetectionConfigurationId":"0491bfd7-b80a-4c2b-a32b-009e355a6cf5","name":"js-detection-config-160521950750209992","description":"fresh detection","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0ac64dac-6a9c-4245-b76c-6e88564f6db0',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '0ac64dac-6a9c-4245-b76c-6e88564f6db0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 22:18:27 GMT'
]);

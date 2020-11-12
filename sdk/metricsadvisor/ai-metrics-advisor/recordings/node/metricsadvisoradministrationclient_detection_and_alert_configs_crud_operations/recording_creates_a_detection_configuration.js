let nock = require('nock');

module.exports.hash = "cd97535d75923024eaf0deda7c055a75";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-160522263154006265"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-160522263154006265","description":"fresh detection","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/8f867116-8170-4273-90a9-9ecb10e1f57e',
  'x-request-id',
  'efa21a0f-6203-47c3-aa48-36dcdc491147',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'efa21a0f-6203-47c3-aa48-36dcdc491147',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/8f867116-8170-4273-90a9-9ecb10e1f57e')
  .reply(200, {"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","name":"js-detection-config-160522263154006265","description":"fresh detection","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '556cf97c-e004-45eb-9897-8d8483801aa5',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '556cf97c-e004-45eb-9897-8d8483801aa5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:31 GMT'
]);

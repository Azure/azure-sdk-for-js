let nock = require('nock');

module.exports.hash = "1d5b97b2dbdaaceb3676d152989ef74c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/8f867116-8170-4273-90a9-9ecb10e1f57e')
  .reply(200, {"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","name":"js-detection-config-160522263154006265","description":"fresh detection","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fd85739a-b4bc-47d2-8557-4dacfaf3d883',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'fd85739a-b4bc-47d2-8557-4dacfaf3d883',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:31 GMT'
]);

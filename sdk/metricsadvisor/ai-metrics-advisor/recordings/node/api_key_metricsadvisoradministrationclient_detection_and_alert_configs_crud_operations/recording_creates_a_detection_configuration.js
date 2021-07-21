let nock = require('nock');

module.exports.hash = "eee7de2a9d43a2fc2b145a8342b1ecd6";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-162265511020900070"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-162265511020900070","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a7cc6dda-d4e7-447d-aa57-3fc3395d5516',
  'x-request-id',
  'fe7eaceb-b41c-4f6b-9e01-470b5b0f294a',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  'fe7eaceb-b41c-4f6b-9e01-470b5b0f294a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a7cc6dda-d4e7-447d-aa57-3fc3395d5516')
  .reply(200, {"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","name":"js-detection-config-162265511020900070","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f37d2e1f-de7d-4f37-b013-d1a5e3b02978',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  'f37d2e1f-de7d-4f37-b013-d1a5e3b02978',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:50 GMT'
]);

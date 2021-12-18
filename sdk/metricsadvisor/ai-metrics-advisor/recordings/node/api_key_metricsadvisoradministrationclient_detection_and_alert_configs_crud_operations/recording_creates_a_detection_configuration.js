let nock = require('nock');

module.exports.hash = "addb2ff5eea0615566b179f26867e9e0";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-163978571732605353"},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-163978571732605353","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint//metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/101f1f1d-203a-4a25-83e3-d0258aff44d1',
  'x-request-id',
  '8fee087e-e5cc-4222-ba55-2021b2f88397',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  '8fee087e-e5cc-4222-ba55-2021b2f88397',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:57 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/101f1f1d-203a-4a25-83e3-d0258aff44d1')
  .reply(200, {"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","name":"js-detection-config-163978571732605353","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8cd65c8f-408f-47e3-8ade-1b1bc5a29e0d',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '8cd65c8f-408f-47e3-8ade-1b1bc5a29e0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:57 GMT'
]);

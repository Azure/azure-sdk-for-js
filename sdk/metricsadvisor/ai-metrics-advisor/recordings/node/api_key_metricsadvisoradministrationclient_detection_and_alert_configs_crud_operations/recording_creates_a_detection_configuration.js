let nock = require('nock');

module.exports.hash = "addb2ff5eea0615566b179f26867e9e0";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-163702273300403092"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-163702273300403092","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/52eba2dd-87a2-44d7-b4f2-3510e7df5647',
  'x-request-id',
  'f0b3da1f-6fa1-4e13-b609-67a0388cb4f5',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'f0b3da1f-6fa1-4e13-b609-67a0388cb4f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/52eba2dd-87a2-44d7-b4f2-3510e7df5647')
  .reply(200, {"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","name":"js-detection-config-163702273300403092","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b5d0898a-359e-4279-ab4f-f7b4dc7e8176',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'b5d0898a-359e-4279-ab4f-f7b4dc7e8176',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:12 GMT'
]);

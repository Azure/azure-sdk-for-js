let nock = require('nock');

module.exports.hash = "aa742447367ad6adc2b1fa3f71e305ff";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a7cc6dda-d4e7-447d-aa57-3fc3395d5516')
  .reply(200, {"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","name":"new Name","description":"new description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"city":"Mumbai"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"dimension":{"city":"Kolkata","category":"Handmade"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}}]}, [
  'Content-Length',
  '1012',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f79f2f7b-976d-4d66-b751-040eaba3b736',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  'f79f2f7b-976d-4d66-b751-040eaba3b736',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:50 GMT'
]);

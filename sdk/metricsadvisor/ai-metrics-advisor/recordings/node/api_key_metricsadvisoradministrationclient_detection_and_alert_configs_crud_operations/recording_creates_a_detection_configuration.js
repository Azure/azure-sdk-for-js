let nock = require('nock');

module.exports.hash = "cdc8e8cfa2fd3c54c01057e330680c55";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-164264029702703365"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-164264029702703365","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/c4ea04e0-2626-41f3-acc7-31c85df331c2',
  'x-request-id',
  '884d8f1e-1e2f-4661-b7e2-fe49060db52a',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  '884d8f1e-1e2f-4661-b7e2-fe49060db52a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/c4ea04e0-2626-41f3-acc7-31c85df331c2')
  .reply(200, {"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","name":"js-detection-config-164264029702703365","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '062ab820-7bce-4719-84ec-05cadb20c962',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '062ab820-7bce-4719-84ec-05cadb20c962',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:16 GMT'
]);

let nock = require('nock');

module.exports.hash = "cd97535d75923024eaf0deda7c055a75";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-160530495417501641"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-160530495417501641","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/e3ab2e89-d596-47aa-8ea8-5bd724f3b827',
  'x-request-id',
  '8388de9c-4228-42d9-9bd0-a95577b9187e',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '8388de9c-4228-42d9-9bd0-a95577b9187e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/e3ab2e89-d596-47aa-8ea8-5bd724f3b827')
  .reply(200, {"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","name":"js-detection-config-160530495417501641","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c5bd451a-4bfd-449a-9d24-d671c946b938',
  'x-envoy-upstream-service-time',
  '5299',
  'apim-request-id',
  'c5bd451a-4bfd-449a-9d24-d671c946b938',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:39 GMT'
]);

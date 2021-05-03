let nock = require('nock');

module.exports.hash = "eee7de2a9d43a2fc2b145a8342b1ecd6";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-162007832830609538"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-162007832830609538","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af',
  'x-request-id',
  'dbad6d33-90d9-44e1-98c7-780b5dafe2e5',
  'x-envoy-upstream-service-time',
  '5184',
  'apim-request-id',
  'dbad6d33-90d9-44e1-98c7-780b5dafe2e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af')
  .reply(200, {"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","name":"js-detection-config-162007832830609538","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '18a0bfb3-eaad-4aa9-9786-3577bd1dc5e8',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  '18a0bfb3-eaad-4aa9-9786-3577bd1dc5e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:33 GMT'
]);

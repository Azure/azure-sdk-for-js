let nock = require('nock');

module.exports.hash = "51cb1b87711e64f14cbfb435c7008003";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-160106250013102692"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-160106250013102692","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61',
  'x-request-id',
  '877bb9d3-734b-4823-a37c-109276aa54d8',
  'x-envoy-upstream-service-time',
  '5208',
  'apim-request-id',
  '877bb9d3-734b-4823-a37c-109276aa54d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:04 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61')
  .reply(200, {"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","name":"js-detection-config-160106250013102692","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd3129044-9d87-445e-8096-ade9f7b83d9a',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'd3129044-9d87-445e-8096-ade9f7b83d9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:05 GMT',
  'Connection',
  'close'
]);

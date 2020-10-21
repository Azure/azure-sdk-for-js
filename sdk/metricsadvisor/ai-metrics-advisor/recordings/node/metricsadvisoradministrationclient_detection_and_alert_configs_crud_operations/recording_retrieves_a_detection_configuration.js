let nock = require('nock');

module.exports.hash = "dab8e1c662e1a89de5f8a4ea535370b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61')
  .reply(200, {"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","name":"new Name","description":"new description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"Dim1":"Common Lime"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"seriesId":"bae8a0802cd62e56bf26613b08ab901f","dimension":{"Dim1":"Common Beech","Dim2":"Ant"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}}]}, [
  'Content-Length',
  '1059',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '254f7f40-b4f4-489b-b1a1-6dc8a5a87348',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '254f7f40-b4f4-489b-b1a1-6dc8a5a87348',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:07 GMT',
  'Connection',
  'close'
]);

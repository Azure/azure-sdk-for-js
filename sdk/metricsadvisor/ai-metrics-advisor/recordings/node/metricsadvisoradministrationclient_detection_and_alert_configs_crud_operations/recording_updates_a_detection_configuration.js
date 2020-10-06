let nock = require('nock');

module.exports.hash = "6880ad9f35a560d08f7f4e19527c95fb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61', {"name":"new Name","description":"new description","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"Dim1":"Common Lime"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"dimension":{"Dim1":"Common Beech","Dim2":"Ant"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3688e36d-f0a6-4798-9970-c097cb67ad57',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  '3688e36d-f0a6-4798-9970-c097cb67ad57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:05 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61')
  .reply(200, {"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","name":"new Name","description":"new description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"Dim1":"Common Lime"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"seriesId":"bae8a0802cd62e56bf26613b08ab901f","dimension":{"Dim1":"Common Beech","Dim2":"Ant"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}}]}, [
  'Content-Length',
  '1059',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f52c1651-aed8-4b7b-9fd8-5468394377e8',
  'x-envoy-upstream-service-time',
  '187',
  'apim-request-id',
  'f52c1651-aed8-4b7b-9fd8-5468394377e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:06 GMT',
  'Connection',
  'close'
]);

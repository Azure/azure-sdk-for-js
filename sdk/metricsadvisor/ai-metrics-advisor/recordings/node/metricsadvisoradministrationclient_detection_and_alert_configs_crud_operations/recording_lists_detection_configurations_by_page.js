let nock = require('nock');

module.exports.hash = "7fcffd323178ab3cdd09f2d0f26a487b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/enrichment/anomalyDetection/configurations')
  .reply(200, {"value":[{"anomalyDetectionConfigurationId":"2fe9e687-4c9e-4e1b-8ec8-6541553db969","name":"new Name","description":"new description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"Dim1":"Common Lime"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"seriesId":"54bdef99c03c71c764fd3ea671cd1260","dimension":{"Dim1":"Common Beech","Dim2":"Ant"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}}]},{"anomalyDetectionConfigurationId":"bd309211-64b5-4a7a-bb81-a2789599c526","name":"js-all-as-anomaly","description":"","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"hardThresholdCondition":{"upperBound":0,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":1,"minRatio":100}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"a420626b-b09b-4938-9bd3-91f263f50612","name":"test_detection_configuration_java","description":"","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","smartDetectionCondition":{"sensitivity":68,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":1,"minRatio":100}},"changeThresholdCondition":{"changePercentage":5,"shiftPoint":1,"anomalyDetectorDirection":"Up","withinRange":false,"suppressCondition":{"minNumber":1,"minRatio":100}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"Dim1":"Common Alder"}},"smartDetectionCondition":{"sensitivity":80,"anomalyDetectorDirection":"Down","suppressCondition":{"minNumber":1,"minRatio":100}}}],"seriesOverrideConfigurations":[{"series":{"seriesId":"8f0847fcd60e1002241f4da0f02b6d57","dimension":{"Dim1":"Common Alder","Dim2":"American robin"}},"smartDetectionCondition":{"sensitivity":68,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":1,"minRatio":100}}}]},{"anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","name":"Default","description":"","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"smartDetectionCondition":{"sensitivity":60,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":1,"minRatio":100}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]},{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","name":"new Name","description":"new description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"Dim1":"Common Lime"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"seriesId":"bae8a0802cd62e56bf26613b08ab901f","dimension":{"Dim1":"Common Beech","Dim2":"Ant"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}}]}]}, [
  'Content-Length',
  '3985',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5e8172a6-dcf4-4444-93f5-666d5be58a76',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  '5e8172a6-dcf4-4444-93f5-666d5be58a76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:08 GMT',
  'Connection',
  'close'
]);

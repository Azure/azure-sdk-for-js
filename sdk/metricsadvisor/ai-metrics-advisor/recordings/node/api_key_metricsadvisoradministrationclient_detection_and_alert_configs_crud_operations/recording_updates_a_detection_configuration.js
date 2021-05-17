let nock = require('nock');

module.exports.hash = "b5f8b7d46a64fc163c13c34c2aa41245";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/d0d157b8-8b45-4f84-9129-fda310802e17', {"name":"new Name","description":"new description","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"city":"Mumbai"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"dimension":{"city":"Kolkata","category":"Handmade"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}}]})
  .reply(400, {"code":"Bad Request","message":"Invalid parameter. smartDetectionCondition is required. TraceId: 3945b990-cbf6-4bb2-aaab-dec84546aeb8"}, [
  'Content-Length',
  '136',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4860ea9e-7539-4106-a57b-bfd3d5ac1059',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '4860ea9e-7539-4106-a57b-bfd3d5ac1059',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:15 GMT'
]);

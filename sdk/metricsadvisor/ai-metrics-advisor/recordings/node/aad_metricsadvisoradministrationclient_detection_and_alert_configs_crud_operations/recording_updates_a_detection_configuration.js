let nock = require('nock');

module.exports.hash = "b5f8b7d46a64fc163c13c34c2aa41245";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '781aeb1c-5fa8-4c71-97c8-6ac552f90c00',
  'x-ms-ests-server',
  '2.1.11654.25 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnlkyI3_Sw5Cu2-AqfSONJTGLH8mAgAAAKBlItgOAAAA; expires=Wed, 02-Jun-2021 21:44:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 21:44:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/edb91803-d3ef-4209-85d8-e880b13f7587', {"name":"new Name","description":"new description","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"city":"Mumbai"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"dimension":{"city":"Kolkata","category":"Handmade"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2a421f62-1ebb-4e22-b899-d013bf2d61d5',
  'x-envoy-upstream-service-time',
  '5638',
  'apim-request-id',
  '2a421f62-1ebb-4e22-b899-d013bf2d61d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:44:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/edb91803-d3ef-4209-85d8-e880b13f7587')
  .reply(200, {"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","name":"new Name","description":"new description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"city":"Mumbai"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"dimension":{"city":"Kolkata","category":"Handmade"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}}]}, [
  'Content-Length',
  '1012',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9b02923e-3738-4ed4-883d-675607088085',
  'x-envoy-upstream-service-time',
  '514',
  'apim-request-id',
  '9b02923e-3738-4ed4-883d-675607088085',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:44:14 GMT'
]);

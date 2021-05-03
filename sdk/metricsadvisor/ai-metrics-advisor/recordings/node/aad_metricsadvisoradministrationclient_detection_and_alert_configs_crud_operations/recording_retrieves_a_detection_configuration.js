let nock = require('nock');

module.exports.hash = "aa742447367ad6adc2b1fa3f71e305ff";

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
  '49e83246-baaf-43da-a733-1aeb2a37c400',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnlkyI3_Sw5Cu2-AqfSONJTGLH8mAwAAAKBlItgOAAAA; expires=Wed, 02-Jun-2021 21:44:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 21:44:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/edb91803-d3ef-4209-85d8-e880b13f7587')
  .reply(200, {"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","name":"new Name","description":"new description","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"OR","hardThresholdCondition":{"upperBound":500,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":5,"minRatio":5}},"changeThresholdCondition":{"changePercentage":44,"shiftPoint":2,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":4,"minRatio":4}}},"dimensionGroupOverrideConfigurations":[{"group":{"dimension":{"city":"Mumbai"}},"hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}}}],"seriesOverrideConfigurations":[{"series":{"dimension":{"city":"Kolkata","category":"Handmade"}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}}]}, [
  'Content-Length',
  '1012',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4a0145e4-11f1-446a-8ac2-1f58ee871ae3',
  'x-envoy-upstream-service-time',
  '5299',
  'apim-request-id',
  '4a0145e4-11f1-446a-8ac2-1f58ee871ae3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:44:19 GMT'
]);

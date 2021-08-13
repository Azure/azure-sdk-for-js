let nock = require('nock');

module.exports.hash = "eee7de2a9d43a2fc2b145a8342b1ecd6";

module.exports.testInfo = {"uniqueName":{"js-detection-config-":"js-detection-config-162265509950201585"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
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
  '6f3ae5b2-455f-4cc1-9751-9eb8b7ffa600',
  'x-ms-ests-server',
  '2.1.11722.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhDmgzXYAD1Lu7GFYxxGYOLGLH8mBgAAAHi3SdgOAAAA; expires=Fri, 02-Jul-2021 17:31:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 17:31:39 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations', {"name":"js-detection-config-162265509950201585","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"withinRange":true,"anomalyDetectorDirection":"Both","suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/3eb1771b-7943-4ce4-8a99-54f102d244de',
  'x-request-id',
  '369be11c-e164-4256-ba90-64b0f3845bd4',
  'x-envoy-upstream-service-time',
  '55',
  'apim-request-id',
  '369be11c-e164-4256-ba90-64b0f3845bd4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/3eb1771b-7943-4ce4-8a99-54f102d244de')
  .reply(200, {"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","name":"js-detection-config-162265509950201585","description":"fresh detection","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","wholeMetricConfiguration":{"conditionOperator":"AND","hardThresholdCondition":{"upperBound":400,"anomalyDetectorDirection":"Up","suppressCondition":{"minNumber":2,"minRatio":2}},"changeThresholdCondition":{"changePercentage":33,"shiftPoint":1,"anomalyDetectorDirection":"Both","withinRange":true,"suppressCondition":{"minNumber":2,"minRatio":2}}},"dimensionGroupOverrideConfigurations":[],"seriesOverrideConfigurations":[]}, [
  'Content-Length',
  '636',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '861799f4-3db5-4eed-b9ff-4e9f8e8bc73f',
  'x-envoy-upstream-service-time',
  '5087',
  'apim-request-id',
  '861799f4-3db5-4eed-b9ff-4e9f8e8bc73f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:44 GMT'
]);

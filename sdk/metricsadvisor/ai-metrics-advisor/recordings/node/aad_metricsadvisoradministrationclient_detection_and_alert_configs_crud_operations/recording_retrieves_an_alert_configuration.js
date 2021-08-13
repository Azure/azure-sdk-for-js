let nock = require('nock');

module.exports.hash = "5dbdfe151332be07ac7ca8f49083072a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  '0af13beb-b404-47f5-b161-ea1aaa780100',
  'x-ms-ests-server',
  '2.1.11787.14 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhDmgzXYAD1Lu7GFYxxGYOLGLH8mCgAAAHi3SdgOAAAA; expires=Fri, 02-Jul-2021 17:31:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 17:31:46 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/2532f996-2583-419c-a18d-fe79cf0d5a4c')
  .reply(200, {"anomalyAlertingConfigurationId":"2532f996-2583-419c-a18d-fe79cf0d5a4c","name":"js-alert-config-162265510617402460","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0585c348-22fe-4199-b318-1b3420f96689',
  'x-envoy-upstream-service-time',
  '38',
  'apim-request-id',
  '0585c348-22fe-4199-b318-1b3420f96689',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:46 GMT'
]);

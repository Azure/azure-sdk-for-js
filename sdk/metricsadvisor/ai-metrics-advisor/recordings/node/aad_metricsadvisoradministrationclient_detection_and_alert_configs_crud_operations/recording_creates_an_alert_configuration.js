let nock = require('nock');

module.exports.hash = "34a663342626a27ed3ca5ca1624020d2";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-161069991699507990"},"newDate":{}}

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
  'd8ec575f-3842-4551-9e83-483676754500',
  'x-ms-ests-server',
  '2.1.11397.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mCAAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:38:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:38:36 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-161069991699507990","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/83ea6a49-e437-413a-8088-8103f5e0c686',
  'x-request-id',
  '546a5696-49bd-44cc-9b95-5bb0bf99a268',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '546a5696-49bd-44cc-9b95-5bb0bf99a268',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:38:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/83ea6a49-e437-413a-8088-8103f5e0c686')
  .reply(200, {"anomalyAlertingConfigurationId":"83ea6a49-e437-413a-8088-8103f5e0c686","name":"js-alert-config-161069991699507990","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cc53c294-533c-4221-9bba-d5d26457a944',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  'cc53c294-533c-4221-9bba-d5d26457a944',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:38:37 GMT'
]);

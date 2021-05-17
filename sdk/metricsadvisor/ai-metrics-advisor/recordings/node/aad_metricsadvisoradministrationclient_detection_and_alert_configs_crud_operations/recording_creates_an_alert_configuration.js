let nock = require('nock');

module.exports.hash = "34a663342626a27ed3ca5ca1624020d2";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-162105169067506698"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'a64bd16b-9227-4b1e-ab2d-878e1097e400',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mBgAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:08:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:08:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-162105169067506698","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/e7d268eb-1487-4f00-9ec3-cb3f59bdc70c',
  'x-request-id',
  '96f6dd9d-4d60-4698-a28c-9c3c1e2f644a',
  'x-envoy-upstream-service-time',
  '5560',
  'apim-request-id',
  '96f6dd9d-4d60-4698-a28c-9c3c1e2f644a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/e7d268eb-1487-4f00-9ec3-cb3f59bdc70c')
  .reply(200, {"anomalyAlertingConfigurationId":"e7d268eb-1487-4f00-9ec3-cb3f59bdc70c","name":"js-alert-config-162105169067506698","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5c984f37-07e9-411a-8d5f-aba6a35abd5d',
  'x-envoy-upstream-service-time',
  '5387',
  'apim-request-id',
  '5c984f37-07e9-411a-8d5f-aba6a35abd5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:21 GMT'
]);

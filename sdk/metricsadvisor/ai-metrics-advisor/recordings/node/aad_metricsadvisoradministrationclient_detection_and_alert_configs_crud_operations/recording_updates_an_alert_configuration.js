let nock = require('nock');

module.exports.hash = "4fd2f3ea3d1316034d6e8e303244337a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '321b2d4a-2d80-4c57-a5b4-22fc2f4ac900',
  'x-ms-ests-server',
  '2.1.11722.21 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mBgAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:08:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:08:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/e7d268eb-1487-4f00-9ec3-cb3f59bdc70c', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '91532c8f-bb8d-4eca-ae51-d74a57da3949',
  'x-envoy-upstream-service-time',
  '5424',
  'apim-request-id',
  '91532c8f-bb8d-4eca-ae51-d74a57da3949',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/e7d268eb-1487-4f00-9ec3-cb3f59bdc70c')
  .reply(200, {"anomalyAlertingConfigurationId":"e7d268eb-1487-4f00-9ec3-cb3f59bdc70c","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cbaead3a-7a21-49fc-ad1e-33fdf4c9ce4a',
  'x-envoy-upstream-service-time',
  '5235',
  'apim-request-id',
  'cbaead3a-7a21-49fc-ad1e-33fdf4c9ce4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:33 GMT'
]);

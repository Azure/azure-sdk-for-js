let nock = require('nock');

module.exports.hash = "3fb525a663ff304a4d258ad0b67570b8";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-162105171350709562"},"newDate":{}}

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
  '305aa68c-32ec-4040-8392-ba0b5784c700',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mBwAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:08:33 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:08:33 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-162105171350709562","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/f409016c-d059-44d9-9843-4c484d0a3557',
  'x-request-id',
  '0bc33d4c-48fc-40d2-a4c2-2f517c996144',
  'x-envoy-upstream-service-time',
  '279',
  'apim-request-id',
  '0bc33d4c-48fc-40d2-a4c2-2f517c996144',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/f409016c-d059-44d9-9843-4c484d0a3557')
  .reply(200, {"anomalyAlertingConfigurationId":"f409016c-d059-44d9-9843-4c484d0a3557","name":"js-alert-config2-162105171350709562","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f48251eb-858b-4227-aa8f-17ee35989211',
  'x-envoy-upstream-service-time',
  '5146',
  'apim-request-id',
  'f48251eb-858b-4227-aa8f-17ee35989211',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/761ed532-039d-447a-967f-3885c070ae32/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"e7d268eb-1487-4f00-9ec3-cb3f59bdc70c","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"f409016c-d059-44d9-9843-4c484d0a3557","name":"js-alert-config2-162105171350709562","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '69975a7a-ca2e-4ce4-8bfd-97baacb040f1',
  'x-envoy-upstream-service-time',
  '537',
  'apim-request-id',
  '69975a7a-ca2e-4ce4-8bfd-97baacb040f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/761ed532-039d-447a-967f-3885c070ae32/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"e7d268eb-1487-4f00-9ec3-cb3f59bdc70c","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"f409016c-d059-44d9-9843-4c484d0a3557","name":"js-alert-config2-162105171350709562","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"761ed532-039d-447a-967f-3885c070ae32","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7e0f7329-8011-4a62-b75c-9c306c2d4366',
  'x-envoy-upstream-service-time',
  '441',
  'apim-request-id',
  '7e0f7329-8011-4a62-b75c-9c306c2d4366',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/f409016c-d059-44d9-9843-4c484d0a3557')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd8a8646a-abea-4d34-8a6d-b72c425c9b6d',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  'd8a8646a-abea-4d34-8a6d-b72c425c9b6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:40 GMT'
]);

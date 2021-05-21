let nock = require('nock');

module.exports.hash = "3fb525a663ff304a4d258ad0b67570b8";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-162007828860107188"},"newDate":{}}

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
  '781aeb1c-5fa8-4c71-97c8-6ac5effe0c00',
  'x-ms-ests-server',
  '2.1.11654.25 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnlkyI3_Sw5Cu2-AqfSONJTGLH8mBgAAAKBlItgOAAAA; expires=Wed, 02-Jun-2021 21:44:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 21:44:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-162007828860107188","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/b4cd1b8b-4717-4a1e-adf8-b321a2f4bb0c',
  'x-request-id',
  'a299c1c3-be9e-4d54-97c7-ce30c877bd68',
  'x-envoy-upstream-service-time',
  '5545',
  'apim-request-id',
  'a299c1c3-be9e-4d54-97c7-ce30c877bd68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:44:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/b4cd1b8b-4717-4a1e-adf8-b321a2f4bb0c')
  .reply(200, {"anomalyAlertingConfigurationId":"b4cd1b8b-4717-4a1e-adf8-b321a2f4bb0c","name":"js-alert-config2-162007828860107188","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4ec5cf33-1175-4de5-ae85-7c7eab18667c',
  'x-envoy-upstream-service-time',
  '539',
  'apim-request-id',
  '4ec5cf33-1175-4de5-ae85-7c7eab18667c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:44:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/edb91803-d3ef-4209-85d8-e880b13f7587/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"b16d24b8-16fa-458e-8289-4c40f29af1d4","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"b4cd1b8b-4717-4a1e-adf8-b321a2f4bb0c","name":"js-alert-config2-162007828860107188","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fcf6631c-561d-4791-977b-8f73d79eea21',
  'x-envoy-upstream-service-time',
  '5451',
  'apim-request-id',
  'fcf6631c-561d-4791-977b-8f73d79eea21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:44:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/edb91803-d3ef-4209-85d8-e880b13f7587/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"b16d24b8-16fa-458e-8289-4c40f29af1d4","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"b4cd1b8b-4717-4a1e-adf8-b321a2f4bb0c","name":"js-alert-config2-162007828860107188","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e18db4ba-1717-4d98-8482-7193546b6dbb',
  'x-envoy-upstream-service-time',
  '5581',
  'apim-request-id',
  'e18db4ba-1717-4d98-8482-7193546b6dbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/b4cd1b8b-4717-4a1e-adf8-b321a2f4bb0c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5e430df4-d266-4795-98ee-394cf5a91990',
  'x-envoy-upstream-service-time',
  '5292',
  'apim-request-id',
  '5e430df4-d266-4795-98ee-394cf5a91990',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:11 GMT'
]);

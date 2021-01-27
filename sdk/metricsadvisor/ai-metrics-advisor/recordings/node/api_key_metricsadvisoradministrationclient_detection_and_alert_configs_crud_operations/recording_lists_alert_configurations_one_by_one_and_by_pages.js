let nock = require('nock');

module.exports.hash = "3fb525a663ff304a4d258ad0b67570b8";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-161069996354400838"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-161069996354400838","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/f0de8f11-f1ca-465b-9dd8-37a364acc93c',
  'x-request-id',
  'f403d9bd-edec-482a-83ef-cf4e9ba51922',
  'x-envoy-upstream-service-time',
  '247',
  'apim-request-id',
  'f403d9bd-edec-482a-83ef-cf4e9ba51922',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/f0de8f11-f1ca-465b-9dd8-37a364acc93c')
  .reply(200, {"anomalyAlertingConfigurationId":"f0de8f11-f1ca-465b-9dd8-37a364acc93c","name":"js-alert-config2-161069996354400838","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '307',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ed63378b-d457-435c-8e6d-4c8891fef03d',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  'ed63378b-d457-435c-8e6d-4c8891fef03d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/854f1125-f1f7-44fa-ba16-8c5be659b8b9/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"75343ada-1714-4218-86b1-c6ee26d11567","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"f0de8f11-f1ca-465b-9dd8-37a364acc93c","name":"js-alert-config2-161069996354400838","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '09359ec7-db77-4dac-a84a-1d1b1d3e1e39',
  'x-envoy-upstream-service-time',
  '229',
  'apim-request-id',
  '09359ec7-db77-4dac-a84a-1d1b1d3e1e39',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/854f1125-f1f7-44fa-ba16-8c5be659b8b9/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"75343ada-1714-4218-86b1-c6ee26d11567","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"f0de8f11-f1ca-465b-9dd8-37a364acc93c","name":"js-alert-config2-161069996354400838","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0cffdf23-89c1-475c-996e-c8f580222ed2',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  '0cffdf23-89c1-475c-996e-c8f580222ed2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/f0de8f11-f1ca-465b-9dd8-37a364acc93c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ee1d9213-c7e9-4685-b75c-2ebbde4c2d0e',
  'x-envoy-upstream-service-time',
  '261',
  'apim-request-id',
  'ee1d9213-c7e9-4685-b75c-2ebbde4c2d0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:25 GMT'
]);

let nock = require('nock');

module.exports.hash = "8e11f10139199a6e1c9a18956ada78c6";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-163978571913403844"},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-163978571913403844","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint//metricsadvisor/v1.0/alert/anomaly/configurations/647c1fb2-dadd-48b6-819a-fbcf2cfbf11f',
  'x-request-id',
  'ed5dd6a9-c1c2-4c10-9690-d330d89719ca',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  'ed5dd6a9-c1c2-4c10-9690-d330d89719ca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/647c1fb2-dadd-48b6-819a-fbcf2cfbf11f')
  .reply(200, {"anomalyAlertingConfigurationId":"647c1fb2-dadd-48b6-819a-fbcf2cfbf11f","name":"js-alert-config2-163978571913403844","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'beb5cf31-86b7-42ae-a62e-23a7d8e6b092',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'beb5cf31-86b7-42ae-a62e-23a7d8e6b092',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/101f1f1d-203a-4a25-83e3-d0258aff44d1/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"647c1fb2-dadd-48b6-819a-fbcf2cfbf11f","name":"js-alert-config2-163978571913403844","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"7b07c399-db39-4c99-b1b1-62b5ff9aac49","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6712acb9-7e91-4484-91ee-aad93aca0390',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '6712acb9-7e91-4484-91ee-aad93aca0390',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/101f1f1d-203a-4a25-83e3-d0258aff44d1/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"647c1fb2-dadd-48b6-819a-fbcf2cfbf11f","name":"js-alert-config2-163978571913403844","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"7b07c399-db39-4c99-b1b1-62b5ff9aac49","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3bd5400e-f532-4827-beef-a5144bf8896e',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '3bd5400e-f532-4827-beef-a5144bf8896e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/647c1fb2-dadd-48b6-819a-fbcf2cfbf11f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd4163a51-da68-487c-be9f-3b89d539729e',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  'd4163a51-da68-487c-be9f-3b89d539729e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:59 GMT'
]);

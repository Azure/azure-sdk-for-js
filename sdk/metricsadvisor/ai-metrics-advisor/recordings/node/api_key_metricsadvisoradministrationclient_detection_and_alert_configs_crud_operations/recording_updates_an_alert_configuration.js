let nock = require('nock');

module.exports.hash = "a434bd37c15051ae55343d266c1ee449";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/7b07c399-db39-4c99-b1b1-62b5ff9aac49', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(200, {"anomalyAlertingConfigurationId":"7b07c399-db39-4c99-b1b1-62b5ff9aac49","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '48321225-a642-4c10-8e7f-acbf183134d8',
  'x-envoy-upstream-service-time',
  '177',
  'apim-request-id',
  '48321225-a642-4c10-8e7f-acbf183134d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:58 GMT'
]);

let nock = require('nock');

module.exports.hash = "a434bd37c15051ae55343d266c1ee449";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/49dcf7e4-7f5b-4a80-9926-18b157405904', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(200, {"anomalyAlertingConfigurationId":"49dcf7e4-7f5b-4a80-9926-18b157405904","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e14b6b51-2962-4e07-a025-7ffd8f8f4d3e',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  'e14b6b51-2962-4e07-a025-7ffd8f8f4d3e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:58 GMT'
]);

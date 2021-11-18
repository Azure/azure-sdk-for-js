let nock = require('nock');

module.exports.hash = "a434bd37c15051ae55343d266c1ee449";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/dc77a835-8161-416a-bd73-035d5e49b69d', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(200, {"anomalyAlertingConfigurationId":"dc77a835-8161-416a-bd73-035d5e49b69d","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ece44c3e-cfa6-460d-a064-900d07cd10c5',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  'ece44c3e-cfa6-460d-a064-900d07cd10c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:14 GMT'
]);

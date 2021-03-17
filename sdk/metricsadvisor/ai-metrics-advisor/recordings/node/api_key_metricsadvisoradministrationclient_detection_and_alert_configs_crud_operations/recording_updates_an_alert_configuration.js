let nock = require('nock');

module.exports.hash = "7716d1f562ecbd9031e3a5f721c3a92b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/75343ada-1714-4218-86b1-c6ee26d11567', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2f7af6c3-a541-4ae3-9df7-4a5f06cad753',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  '2f7af6c3-a541-4ae3-9df7-4a5f06cad753',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/75343ada-1714-4218-86b1-c6ee26d11567')
  .reply(200, {"anomalyAlertingConfigurationId":"75343ada-1714-4218-86b1-c6ee26d11567","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '589',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6e93601a-21ba-4b85-bd15-b50871eedf9d',
  'x-envoy-upstream-service-time',
  '237',
  'apim-request-id',
  '6e93601a-21ba-4b85-bd15-b50871eedf9d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:22 GMT'
]);

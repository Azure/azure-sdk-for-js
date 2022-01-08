let nock = require('nock');

module.exports.hash = "8f3a8b13339eddc773537fbf1b4bd56e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/c2338a32-2941-4718-8eac-468cc77ee2a5', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(200, {"anomalyAlertingConfigurationId":"c2338a32-2941-4718-8eac-468cc77ee2a5","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd4eea173-ac60-4814-9e43-2190719b5755',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  'd4eea173-ac60-4814-9e43-2190719b5755',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:02 GMT'
]);

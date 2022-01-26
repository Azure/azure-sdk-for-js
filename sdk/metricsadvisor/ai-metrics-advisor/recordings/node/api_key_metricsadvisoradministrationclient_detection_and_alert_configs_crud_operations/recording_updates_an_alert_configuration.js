let nock = require('nock');

module.exports.hash = "8f3a8b13339eddc773537fbf1b4bd56e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/b13d420d-c738-4c44-845e-8922cb2e2476', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(200, {"anomalyAlertingConfigurationId":"b13d420d-c738-4c44-845e-8922cb2e2476","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '271d3839-d38c-494c-b043-6cd609f10cbd',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  '271d3839-d38c-494c-b043-6cd609f10cbd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:19 GMT'
]);

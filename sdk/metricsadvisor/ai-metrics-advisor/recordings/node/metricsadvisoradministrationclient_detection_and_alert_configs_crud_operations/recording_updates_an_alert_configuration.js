let nock = require('nock');

module.exports.hash = "61963e2df32473755b6e3f385d362485";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/8c6f9e00-1168-45fc-af60-926124f33085', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b4f02873-f949-47c6-95d2-92533e07c97c',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  'b4f02873-f949-47c6-95d2-92533e07c97c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/8c6f9e00-1168-45fc-af60-926124f33085')
  .reply(200, {"anomalyAlertingConfigurationId":"8c6f9e00-1168-45fc-af60-926124f33085","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '589',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '85caf577-3df1-481a-87a1-79c3ab35d1c7',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '85caf577-3df1-481a-87a1-79c3ab35d1c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:13 GMT'
]);

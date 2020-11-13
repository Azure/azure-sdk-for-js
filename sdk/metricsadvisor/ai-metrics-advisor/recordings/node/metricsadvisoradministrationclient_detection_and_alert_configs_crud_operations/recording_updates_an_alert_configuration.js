let nock = require('nock');

module.exports.hash = "61963e2df32473755b6e3f385d362485";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/d3b7d80f-da42-464d-bfad-3304da188a9f', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5ebbd7e1-7838-46ee-b566-882610140bbe',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '5ebbd7e1-7838-46ee-b566-882610140bbe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/d3b7d80f-da42-464d-bfad-3304da188a9f')
  .reply(200, {"anomalyAlertingConfigurationId":"d3b7d80f-da42-464d-bfad-3304da188a9f","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '589',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3dbf1dab-1ca1-4eea-b6e2-0b6431144672',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '3dbf1dab-1ca1-4eea-b6e2-0b6431144672',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:15 GMT'
]);

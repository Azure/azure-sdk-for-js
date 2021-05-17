let nock = require('nock');

module.exports.hash = "4fd2f3ea3d1316034d6e8e303244337a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/3722e939-b1ba-4142-885c-cf8d0d1eb68a', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd8d51714-444d-412f-ac27-ea9f7b9dc727',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  'd8d51714-444d-412f-ac27-ea9f7b9dc727',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/3722e939-b1ba-4142-885c-cf8d0d1eb68a')
  .reply(200, {"anomalyAlertingConfigurationId":"3722e939-b1ba-4142-885c-cf8d0d1eb68a","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6f6590fc-5bcd-49f7-933b-7ffe2ce02e61',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '6f6590fc-5bcd-49f7-933b-7ffe2ce02e61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:16 GMT'
]);

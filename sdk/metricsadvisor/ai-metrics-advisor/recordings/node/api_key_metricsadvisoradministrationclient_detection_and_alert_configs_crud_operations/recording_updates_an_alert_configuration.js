let nock = require('nock');

module.exports.hash = "4fd2f3ea3d1316034d6e8e303244337a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/5130d48a-0b41-4838-b589-d72178f20554', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(200, {"anomalyAlertingConfigurationId":"5130d48a-0b41-4838-b589-d72178f20554","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd0657eca-9dd6-4963-ab41-4e8a70f61779',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  'd0657eca-9dd6-4963-ab41-4e8a70f61779',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/5130d48a-0b41-4838-b589-d72178f20554')
  .reply(200, {"anomalyAlertingConfigurationId":"5130d48a-0b41-4838-b589-d72178f20554","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bf68d8e8-35b5-41b4-af35-a5e119a07838',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'bf68d8e8-35b5-41b4-af35-a5e119a07838',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:52 GMT'
]);

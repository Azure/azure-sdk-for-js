let nock = require('nock');

module.exports.hash = "4fd2f3ea3d1316034d6e8e303244337a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/349b1b8c-06e1-459b-8a6b-7c8ffca526b6', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'da3bf66b-6493-481e-aa07-59158ae0143b',
  'x-envoy-upstream-service-time',
  '5222',
  'apim-request-id',
  'da3bf66b-6493-481e-aa07-59158ae0143b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/349b1b8c-06e1-459b-8a6b-7c8ffca526b6')
  .reply(200, {"anomalyAlertingConfigurationId":"349b1b8c-06e1-459b-8a6b-7c8ffca526b6","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '617',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3411c956-3d9c-4104-bf7f-e5f3f035149e',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  '3411c956-3d9c-4104-bf7f-e5f3f035149e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:56 GMT'
]);

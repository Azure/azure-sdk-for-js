let nock = require('nock');

module.exports.hash = "9a167e1d3a8f7daa9e04b712eb461a61";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-160523005530201505"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-160523005530201505","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/755f77fa-f971-42cd-9367-1ec0a7e2761e',
  'x-request-id',
  '596f0f9e-1543-42a3-9656-d0ff74e2f364',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '596f0f9e-1543-42a3-9656-d0ff74e2f364',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/755f77fa-f971-42cd-9367-1ec0a7e2761e')
  .reply(200, {"anomalyAlertingConfigurationId":"755f77fa-f971-42cd-9367-1ec0a7e2761e","name":"js-alert-config2-160523005530201505","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '307',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '891a8b4f-d699-44dd-84e0-efd10b35141b',
  'x-envoy-upstream-service-time',
  '5215',
  'apim-request-id',
  '891a8b4f-d699-44dd-84e0-efd10b35141b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/140d75a6-c547-43fb-9254-a7ba9093e5e4/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"d3b7d80f-da42-464d-bfad-3304da188a9f","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"755f77fa-f971-42cd-9367-1ec0a7e2761e","name":"js-alert-config2-160523005530201505","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6ed56a4b-5f16-4315-8163-416f014499aa',
  'x-envoy-upstream-service-time',
  '5178',
  'apim-request-id',
  '6ed56a4b-5f16-4315-8163-416f014499aa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/140d75a6-c547-43fb-9254-a7ba9093e5e4/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"d3b7d80f-da42-464d-bfad-3304da188a9f","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"755f77fa-f971-42cd-9367-1ec0a7e2761e","name":"js-alert-config2-160523005530201505","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c3742ddf-55de-4fb7-839a-45f8d2d28d5e',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'c3742ddf-55de-4fb7-839a-45f8d2d28d5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/755f77fa-f971-42cd-9367-1ec0a7e2761e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '23b9dbc2-ecf1-4ab8-9662-80ddeadc727f',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  '23b9dbc2-ecf1-4ab8-9662-80ddeadc727f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:26 GMT'
]);

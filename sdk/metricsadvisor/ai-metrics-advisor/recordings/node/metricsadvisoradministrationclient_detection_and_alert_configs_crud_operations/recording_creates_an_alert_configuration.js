let nock = require('nock');

module.exports.hash = "a28017928fcc0fb92ddd008609c727ac";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-160523005444600456"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-160523005444600456","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/d3b7d80f-da42-464d-bfad-3304da188a9f',
  'x-request-id',
  '6d682fbc-68ae-4147-92a5-0c9b571f2f98',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '6d682fbc-68ae-4147-92a5-0c9b571f2f98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/d3b7d80f-da42-464d-bfad-3304da188a9f')
  .reply(200, {"anomalyAlertingConfigurationId":"d3b7d80f-da42-464d-bfad-3304da188a9f","name":"js-alert-config-160523005444600456","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e44e8643-6ef0-4564-8086-ab7c5ad18626',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'e44e8643-6ef0-4564-8086-ab7c5ad18626',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:14 GMT'
]);

let nock = require('nock');

module.exports.hash = "af6de22e82adc649e157b2f5f3895416";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/d3b7d80f-da42-464d-bfad-3304da188a9f')
  .reply(200, {"anomalyAlertingConfigurationId":"d3b7d80f-da42-464d-bfad-3304da188a9f","name":"js-alert-config-160523005444600456","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"140d75a6-c547-43fb-9254-a7ba9093e5e4","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b93cdf7f-04b9-4b8c-94ed-7ad521777d0c',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'b93cdf7f-04b9-4b8c-94ed-7ad521777d0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:14 GMT'
]);

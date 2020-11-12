let nock = require('nock');

module.exports.hash = "af6de22e82adc649e157b2f5f3895416";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/e4c85a26-8954-460e-b102-60023d51fd58')
  .reply(200, {"anomalyAlertingConfigurationId":"e4c85a26-8954-460e-b102-60023d51fd58","name":"js-alert-config-160522263296907498","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cc845486-92de-41a3-a223-6aa28074c179',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  'cc845486-92de-41a3-a223-6aa28074c179',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:33 GMT'
]);

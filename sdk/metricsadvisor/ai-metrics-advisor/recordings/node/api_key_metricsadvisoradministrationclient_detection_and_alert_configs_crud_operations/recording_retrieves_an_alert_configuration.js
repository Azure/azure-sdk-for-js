let nock = require('nock');

module.exports.hash = "5dbdfe151332be07ac7ca8f49083072a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/5130d48a-0b41-4838-b589-d72178f20554')
  .reply(200, {"anomalyAlertingConfigurationId":"5130d48a-0b41-4838-b589-d72178f20554","name":"js-alert-config-162265511166506350","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0594cdf5-0a9a-4e12-9b8f-3a4160bf14a6',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '0594cdf5-0a9a-4e12-9b8f-3a4160bf14a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:51 GMT'
]);

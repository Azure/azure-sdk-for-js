let nock = require('nock');

module.exports.hash = "5dbdfe151332be07ac7ca8f49083072a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/3722e939-b1ba-4142-885c-cf8d0d1eb68a')
  .reply(200, {"anomalyAlertingConfigurationId":"3722e939-b1ba-4142-885c-cf8d0d1eb68a","name":"js-alert-config-162105175596003620","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '50fbcb28-36d4-436d-9b31-79f10b387580',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '50fbcb28-36d4-436d-9b31-79f10b387580',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:15 GMT'
]);

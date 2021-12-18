let nock = require('nock');

module.exports.hash = "8fba37cabe88b5d1094adf895e044d73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7b07c399-db39-4c99-b1b1-62b5ff9aac49')
  .reply(200, {"anomalyAlertingConfigurationId":"7b07c399-db39-4c99-b1b1-62b5ff9aac49","name":"js-alert-config-163978571845003060","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '05cdc742-f215-47b6-9e98-e207fa92c0e8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '05cdc742-f215-47b6-9e98-e207fa92c0e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:58 GMT'
]);

let nock = require('nock');

module.exports.hash = "8fba37cabe88b5d1094adf895e044d73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/b13d420d-c738-4c44-845e-8922cb2e2476')
  .reply(200, {"anomalyAlertingConfigurationId":"b13d420d-c738-4c44-845e-8922cb2e2476","name":"js-alert-config-164264029838308489","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fb07d834-9774-4d2a-87ac-135086a64ca4',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'fb07d834-9774-4d2a-87ac-135086a64ca4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:18 GMT'
]);

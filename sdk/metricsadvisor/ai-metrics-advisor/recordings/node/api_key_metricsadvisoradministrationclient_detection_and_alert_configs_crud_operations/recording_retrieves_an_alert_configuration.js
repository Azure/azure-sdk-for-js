let nock = require('nock');

module.exports.hash = "8fba37cabe88b5d1094adf895e044d73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/49dcf7e4-7f5b-4a80-9926-18b157405904')
  .reply(200, {"anomalyAlertingConfigurationId":"49dcf7e4-7f5b-4a80-9926-18b157405904","name":"js-alert-config-163636427742103582","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '518dab1c-5740-4944-a3ba-c6c723d8fead',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '518dab1c-5740-4944-a3ba-c6c723d8fead',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:57 GMT'
]);

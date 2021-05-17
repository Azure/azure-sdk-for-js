let nock = require('nock');

module.exports.hash = "34a663342626a27ed3ca5ca1624020d2";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-162105175596003620"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-162105175596003620","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/3722e939-b1ba-4142-885c-cf8d0d1eb68a',
  'x-request-id',
  'eef0fb06-3546-4895-add7-1f1ec98d2047',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'eef0fb06-3546-4895-add7-1f1ec98d2047',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/3722e939-b1ba-4142-885c-cf8d0d1eb68a')
  .reply(200, {"anomalyAlertingConfigurationId":"3722e939-b1ba-4142-885c-cf8d0d1eb68a","name":"js-alert-config-162105175596003620","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f82018b9-22ea-4a3b-b040-bd609dbadc4d',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'f82018b9-22ea-4a3b-b040-bd609dbadc4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:15 GMT'
]);

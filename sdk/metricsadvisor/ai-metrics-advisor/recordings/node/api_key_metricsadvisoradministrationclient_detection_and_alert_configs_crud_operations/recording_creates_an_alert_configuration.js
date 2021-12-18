let nock = require('nock');

module.exports.hash = "5259dd1945f72341676b3c0de1514ada";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-163978571845003060"},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-163978571845003060","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint//metricsadvisor/v1.0/alert/anomaly/configurations/7b07c399-db39-4c99-b1b1-62b5ff9aac49',
  'x-request-id',
  '08ffbaba-f3c4-49f5-b78a-eb1187f3fb5f',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '08ffbaba-f3c4-49f5-b78a-eb1187f3fb5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7b07c399-db39-4c99-b1b1-62b5ff9aac49')
  .reply(200, {"anomalyAlertingConfigurationId":"7b07c399-db39-4c99-b1b1-62b5ff9aac49","name":"js-alert-config-163978571845003060","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"101f1f1d-203a-4a25-83e3-d0258aff44d1","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '85cffe7a-83b0-43fc-9086-3447e51a19fe',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '85cffe7a-83b0-43fc-9086-3447e51a19fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:58 GMT'
]);

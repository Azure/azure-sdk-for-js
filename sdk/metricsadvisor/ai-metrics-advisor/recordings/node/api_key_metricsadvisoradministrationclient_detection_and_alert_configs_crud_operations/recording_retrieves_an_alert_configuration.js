let nock = require('nock');

module.exports.hash = "5dbdfe151332be07ac7ca8f49083072a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/349b1b8c-06e1-459b-8a6b-7c8ffca526b6')
  .reply(200, {"anomalyAlertingConfigurationId":"349b1b8c-06e1-459b-8a6b-7c8ffca526b6","name":"js-alert-config-162007834523206193","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '26990fb5-0b3d-4b89-939e-71e6eeb9ae6c',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  '26990fb5-0b3d-4b89-939e-71e6eeb9ae6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:50 GMT'
]);

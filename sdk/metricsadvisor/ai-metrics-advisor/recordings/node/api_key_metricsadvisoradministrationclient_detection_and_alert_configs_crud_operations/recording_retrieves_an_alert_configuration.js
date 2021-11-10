let nock = require('nock');

module.exports.hash = "8fba37cabe88b5d1094adf895e044d73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/647939f7-78d7-4818-8c26-a67bb2d7e260')
  .reply(200, {"anomalyAlertingConfigurationId":"647939f7-78d7-4818-8c26-a67bb2d7e260","name":"js-alert-config-163650909471507220","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6e9e6414-6f1a-4cdf-91a3-b2143d6a017f',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '6e9e6414-6f1a-4cdf-91a3-b2143d6a017f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:34 GMT'
]);

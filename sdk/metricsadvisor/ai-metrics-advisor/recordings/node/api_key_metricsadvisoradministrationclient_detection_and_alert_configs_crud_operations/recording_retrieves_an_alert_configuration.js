let nock = require('nock');

module.exports.hash = "8fba37cabe88b5d1094adf895e044d73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/dc77a835-8161-416a-bd73-035d5e49b69d')
  .reply(200, {"anomalyAlertingConfigurationId":"dc77a835-8161-416a-bd73-035d5e49b69d","name":"js-alert-config-163702273436603397","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e956e3cc-b64c-47ab-acaf-226fa9a86c6a',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'e956e3cc-b64c-47ab-acaf-226fa9a86c6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:14 GMT'
]);

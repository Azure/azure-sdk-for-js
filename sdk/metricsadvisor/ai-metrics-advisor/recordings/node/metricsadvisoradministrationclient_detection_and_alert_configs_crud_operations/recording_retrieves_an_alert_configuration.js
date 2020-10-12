let nock = require('nock');

module.exports.hash = "2f3122519858bb65542b1fef5c5b3e1e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/28e85c5b-cbb5-480b-be46-05b7a6cfcc8e')
  .reply(200, {"anomalyAlertingConfigurationId":"28e85c5b-cbb5-480b-be46-05b7a6cfcc8e","name":"js-alert-config-160106251052701821","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'eb3147d1-aa11-4a68-8801-e28bc203eb3a',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  'eb3147d1-aa11-4a68-8801-e28bc203eb3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:15 GMT',
  'Connection',
  'close'
]);

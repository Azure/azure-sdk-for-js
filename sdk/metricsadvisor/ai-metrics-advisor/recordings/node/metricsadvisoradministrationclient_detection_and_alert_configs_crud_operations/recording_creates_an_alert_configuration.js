let nock = require('nock');

module.exports.hash = "56700c8282e35f1f2021badd4ec65e61";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-160106251052701821"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-160106251052701821","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/28e85c5b-cbb5-480b-be46-05b7a6cfcc8e',
  'x-request-id',
  'b2dc0559-4e37-4872-9e71-27cee2a7c61b',
  'x-envoy-upstream-service-time',
  '5232',
  'apim-request-id',
  'b2dc0559-4e37-4872-9e71-27cee2a7c61b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:14 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/28e85c5b-cbb5-480b-be46-05b7a6cfcc8e')
  .reply(200, {"anomalyAlertingConfigurationId":"28e85c5b-cbb5-480b-be46-05b7a6cfcc8e","name":"js-alert-config-160106251052701821","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a14db16a-373a-4e7a-a23e-fb8952c5dcba',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'a14db16a-373a-4e7a-a23e-fb8952c5dcba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:15 GMT',
  'Connection',
  'close'
]);

let nock = require('nock');

module.exports.hash = "19ec4c0ee7f71f9d8dc767b8ee8928f9";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-164264029838308489"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-164264029838308489","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/b13d420d-c738-4c44-845e-8922cb2e2476',
  'x-request-id',
  '97c2fae4-44ab-4b17-9388-9159385eb653',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '97c2fae4-44ab-4b17-9388-9159385eb653',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/b13d420d-c738-4c44-845e-8922cb2e2476')
  .reply(200, {"anomalyAlertingConfigurationId":"b13d420d-c738-4c44-845e-8922cb2e2476","name":"js-alert-config-164264029838308489","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f566573f-2fae-43c1-a7e4-bddc3a93cc0f',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'f566573f-2fae-43c1-a7e4-bddc3a93cc0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:18 GMT'
]);

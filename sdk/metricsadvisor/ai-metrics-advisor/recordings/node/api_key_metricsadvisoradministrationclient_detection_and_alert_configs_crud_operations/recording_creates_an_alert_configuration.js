let nock = require('nock');

module.exports.hash = "5259dd1945f72341676b3c0de1514ada";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-163636427742103582"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-163636427742103582","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/49dcf7e4-7f5b-4a80-9926-18b157405904',
  'x-request-id',
  '7bc05e8c-5d38-4f62-9633-05f80e3015ac',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '7bc05e8c-5d38-4f62-9633-05f80e3015ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/49dcf7e4-7f5b-4a80-9926-18b157405904')
  .reply(200, {"anomalyAlertingConfigurationId":"49dcf7e4-7f5b-4a80-9926-18b157405904","name":"js-alert-config-163636427742103582","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd98c5c76-f357-4fa0-a9e9-e57763808c6e',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'd98c5c76-f357-4fa0-a9e9-e57763808c6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:57 GMT'
]);

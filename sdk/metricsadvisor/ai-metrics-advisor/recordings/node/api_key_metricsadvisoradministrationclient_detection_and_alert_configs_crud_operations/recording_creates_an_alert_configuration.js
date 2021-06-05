let nock = require('nock');

module.exports.hash = "d9b15261bf1beb6aa271dbf56bacf022";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-162265511166506350"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-162265511166506350","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/5130d48a-0b41-4838-b589-d72178f20554',
  'x-request-id',
  '7d3024e3-d900-4a6e-9fc7-f71c4d8ccaed',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '7d3024e3-d900-4a6e-9fc7-f71c4d8ccaed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/5130d48a-0b41-4838-b589-d72178f20554')
  .reply(200, {"anomalyAlertingConfigurationId":"5130d48a-0b41-4838-b589-d72178f20554","name":"js-alert-config-162265511166506350","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '020ece09-1ad4-486c-b6e7-41c9cf0d4449',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '020ece09-1ad4-486c-b6e7-41c9cf0d4449',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:51 GMT'
]);

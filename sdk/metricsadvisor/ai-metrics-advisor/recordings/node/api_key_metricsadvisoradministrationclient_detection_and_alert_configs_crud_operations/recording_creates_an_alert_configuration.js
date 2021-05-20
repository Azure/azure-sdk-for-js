let nock = require('nock');

module.exports.hash = "d9b15261bf1beb6aa271dbf56bacf022";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-162007834523206193"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-162007834523206193","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/349b1b8c-06e1-459b-8a6b-7c8ffca526b6',
  'x-request-id',
  '40f6fc79-b025-4233-ab47-e0bc57cb16a3',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '40f6fc79-b025-4233-ab47-e0bc57cb16a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/349b1b8c-06e1-459b-8a6b-7c8ffca526b6')
  .reply(200, {"anomalyAlertingConfigurationId":"349b1b8c-06e1-459b-8a6b-7c8ffca526b6","name":"js-alert-config-162007834523206193","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '12660843-a6a8-4e0b-bbca-5187975eda8a',
  'x-envoy-upstream-service-time',
  '5176',
  'apim-request-id',
  '12660843-a6a8-4e0b-bbca-5187975eda8a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:45:50 GMT'
]);

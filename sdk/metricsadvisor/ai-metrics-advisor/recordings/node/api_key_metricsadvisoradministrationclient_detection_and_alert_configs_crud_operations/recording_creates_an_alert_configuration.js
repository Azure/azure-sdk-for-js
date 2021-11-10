let nock = require('nock');

module.exports.hash = "5259dd1945f72341676b3c0de1514ada";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-163650909471507220"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-163650909471507220","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/647939f7-78d7-4818-8c26-a67bb2d7e260',
  'x-request-id',
  '5ba902fa-f991-4b8d-af6c-41dbd98a366b',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '5ba902fa-f991-4b8d-af6c-41dbd98a366b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/647939f7-78d7-4818-8c26-a67bb2d7e260')
  .reply(200, {"anomalyAlertingConfigurationId":"647939f7-78d7-4818-8c26-a67bb2d7e260","name":"js-alert-config-163650909471507220","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4ae96f92-a9b4-4c57-8997-2819821d733d',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '4ae96f92-a9b4-4c57-8997-2819821d733d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:34 GMT'
]);

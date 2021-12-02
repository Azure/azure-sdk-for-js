let nock = require('nock');

module.exports.hash = "5259dd1945f72341676b3c0de1514ada";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-163702273436603397"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-163702273436603397","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/dc77a835-8161-416a-bd73-035d5e49b69d',
  'x-request-id',
  '948980c1-70ba-4388-9ade-5745dd6b9a5c',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  '948980c1-70ba-4388-9ade-5745dd6b9a5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/dc77a835-8161-416a-bd73-035d5e49b69d')
  .reply(200, {"anomalyAlertingConfigurationId":"dc77a835-8161-416a-bd73-035d5e49b69d","name":"js-alert-config-163702273436603397","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '956b5fb5-5c81-48f3-87d1-84ad3292bed4',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '956b5fb5-5c81-48f3-87d1-84ad3292bed4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:14 GMT'
]);

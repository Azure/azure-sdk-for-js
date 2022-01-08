let nock = require('nock');

module.exports.hash = "8fba37cabe88b5d1094adf895e044d73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/c2338a32-2941-4718-8eac-468cc77ee2a5')
  .reply(200, {"anomalyAlertingConfigurationId":"c2338a32-2941-4718-8eac-468cc77ee2a5","name":"js-alert-config-164160816145405741","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3f1b457c-3b97-497f-8e03-6fabea1e068a',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '3f1b457c-3b97-497f-8e03-6fabea1e068a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:01 GMT'
]);

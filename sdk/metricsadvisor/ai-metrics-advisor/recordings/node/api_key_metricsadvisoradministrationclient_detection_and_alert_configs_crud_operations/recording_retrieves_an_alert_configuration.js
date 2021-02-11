let nock = require('nock');

module.exports.hash = "5dbdfe151332be07ac7ca8f49083072a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/75343ada-1714-4218-86b1-c6ee26d11567')
  .reply(200, {"anomalyAlertingConfigurationId":"75343ada-1714-4218-86b1-c6ee26d11567","name":"js-alert-config-161069996115201212","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '020082b7-9ea8-4adc-a6b8-879f622a2da9',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '020082b7-9ea8-4adc-a6b8-879f622a2da9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:21 GMT'
]);

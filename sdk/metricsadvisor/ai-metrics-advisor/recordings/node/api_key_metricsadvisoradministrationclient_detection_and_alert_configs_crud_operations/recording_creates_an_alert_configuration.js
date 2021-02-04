let nock = require('nock');

module.exports.hash = "34a663342626a27ed3ca5ca1624020d2";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-161069996115201212"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-161069996115201212","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/75343ada-1714-4218-86b1-c6ee26d11567',
  'x-request-id',
  'c65af1fb-70b7-4140-bdaf-390e1abcd8fc',
  'x-envoy-upstream-service-time',
  '261',
  'apim-request-id',
  'c65af1fb-70b7-4140-bdaf-390e1abcd8fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/75343ada-1714-4218-86b1-c6ee26d11567')
  .reply(200, {"anomalyAlertingConfigurationId":"75343ada-1714-4218-86b1-c6ee26d11567","name":"js-alert-config-161069996115201212","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"854f1125-f1f7-44fa-ba16-8c5be659b8b9","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '94ea8d64-2e87-41d9-9527-f31adb07fce0',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  '94ea8d64-2e87-41d9-9527-f31adb07fce0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:21 GMT'
]);

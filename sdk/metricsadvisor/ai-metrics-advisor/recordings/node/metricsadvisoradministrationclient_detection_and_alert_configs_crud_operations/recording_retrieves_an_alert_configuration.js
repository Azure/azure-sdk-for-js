let nock = require('nock');

module.exports.hash = "af6de22e82adc649e157b2f5f3895416";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/988c6443-ef9c-4c77-b494-75e0a8a6aeb7')
  .reply(200, {"anomalyAlertingConfigurationId":"988c6443-ef9c-4c77-b494-75e0a8a6aeb7","name":"js-alert-config-160530445137604605","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6be52cb3-b68c-42ef-bfac-be90dfdde31f',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '6be52cb3-b68c-42ef-bfac-be90dfdde31f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:11 GMT'
]);

let nock = require('nock');

module.exports.hash = "af6de22e82adc649e157b2f5f3895416";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/8c6f9e00-1168-45fc-af60-926124f33085')
  .reply(200, {"anomalyAlertingConfigurationId":"8c6f9e00-1168-45fc-af60-926124f33085","name":"js-alert-config-160529677301705256","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '63bbb57e-f4aa-45be-96b4-12edfc56f70e',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '63bbb57e-f4aa-45be-96b4-12edfc56f70e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:13 GMT'
]);

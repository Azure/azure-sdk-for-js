let nock = require('nock');

module.exports.hash = "af6de22e82adc649e157b2f5f3895416";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/180377ec-559a-40d1-af6c-2b3d9d5909bf')
  .reply(200, {"anomalyAlertingConfigurationId":"180377ec-559a-40d1-af6c-2b3d9d5909bf","name":"js-alert-config-160530496118804981","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '57b94afa-209d-4318-a288-c3b8779e2f23',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '57b94afa-209d-4318-a288-c3b8779e2f23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:41 GMT'
]);

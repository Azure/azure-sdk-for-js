let nock = require('nock');

module.exports.hash = "a28017928fcc0fb92ddd008609c727ac";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-160530496118804981"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-160530496118804981","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/180377ec-559a-40d1-af6c-2b3d9d5909bf',
  'x-request-id',
  'c63f5d94-96d1-4336-b384-a64b3fbc57da',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  'c63f5d94-96d1-4336-b384-a64b3fbc57da',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/180377ec-559a-40d1-af6c-2b3d9d5909bf')
  .reply(200, {"anomalyAlertingConfigurationId":"180377ec-559a-40d1-af6c-2b3d9d5909bf","name":"js-alert-config-160530496118804981","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '31f812b4-d332-40b8-823e-5af08d192096',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '31f812b4-d332-40b8-823e-5af08d192096',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:40 GMT'
]);

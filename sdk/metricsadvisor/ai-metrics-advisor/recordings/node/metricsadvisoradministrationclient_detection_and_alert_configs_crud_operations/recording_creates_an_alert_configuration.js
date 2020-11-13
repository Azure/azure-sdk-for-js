let nock = require('nock');

module.exports.hash = "a28017928fcc0fb92ddd008609c727ac";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-160530445137604605"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-160530445137604605","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/988c6443-ef9c-4c77-b494-75e0a8a6aeb7',
  'x-request-id',
  'a99bd583-ebfd-4674-bf27-df98561a9cff',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  'a99bd583-ebfd-4674-bf27-df98561a9cff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/988c6443-ef9c-4c77-b494-75e0a8a6aeb7')
  .reply(200, {"anomalyAlertingConfigurationId":"988c6443-ef9c-4c77-b494-75e0a8a6aeb7","name":"js-alert-config-160530445137604605","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9e9befb0-0cff-4e86-a8e8-c9405cf9bbb8',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '9e9befb0-0cff-4e86-a8e8-c9405cf9bbb8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:11 GMT'
]);

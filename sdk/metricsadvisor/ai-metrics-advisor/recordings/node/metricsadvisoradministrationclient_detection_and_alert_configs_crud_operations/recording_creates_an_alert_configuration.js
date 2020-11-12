let nock = require('nock');

module.exports.hash = "a28017928fcc0fb92ddd008609c727ac";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-160522263296907498"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-160522263296907498","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/e4c85a26-8954-460e-b102-60023d51fd58',
  'x-request-id',
  '72984398-b4b8-4ecf-90f7-62553855fc62',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '72984398-b4b8-4ecf-90f7-62553855fc62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/e4c85a26-8954-460e-b102-60023d51fd58')
  .reply(200, {"anomalyAlertingConfigurationId":"e4c85a26-8954-460e-b102-60023d51fd58","name":"js-alert-config-160522263296907498","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '807265a9-d5eb-4571-97b1-5f86311cf1fd',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '807265a9-d5eb-4571-97b1-5f86311cf1fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:32 GMT'
]);

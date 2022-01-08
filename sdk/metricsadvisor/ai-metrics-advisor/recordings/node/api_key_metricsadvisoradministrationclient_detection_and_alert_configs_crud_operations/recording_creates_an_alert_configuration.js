let nock = require('nock');

module.exports.hash = "19ec4c0ee7f71f9d8dc767b8ee8928f9";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-164160816145405741"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-164160816145405741","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/c2338a32-2941-4718-8eac-468cc77ee2a5',
  'x-request-id',
  'd881c798-80bd-4868-807f-1c05e0ce6d30',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'd881c798-80bd-4868-807f-1c05e0ce6d30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/c2338a32-2941-4718-8eac-468cc77ee2a5')
  .reply(200, {"anomalyAlertingConfigurationId":"c2338a32-2941-4718-8eac-468cc77ee2a5","name":"js-alert-config-164160816145405741","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd8058bb0-6a6b-4ef9-9d61-ecd58d8fd41a',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'd8058bb0-6a6b-4ef9-9d61-ecd58d8fd41a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:01 GMT'
]);

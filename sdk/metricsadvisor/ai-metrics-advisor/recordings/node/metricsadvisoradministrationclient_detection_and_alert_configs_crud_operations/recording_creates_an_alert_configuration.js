let nock = require('nock');

module.exports.hash = "a28017928fcc0fb92ddd008609c727ac";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-160529677301705256"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-160529677301705256","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/8c6f9e00-1168-45fc-af60-926124f33085',
  'x-request-id',
  'e649ac22-bd9e-46ae-b103-b0166c968e93',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  'e649ac22-bd9e-46ae-b103-b0166c968e93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/8c6f9e00-1168-45fc-af60-926124f33085')
  .reply(200, {"anomalyAlertingConfigurationId":"8c6f9e00-1168-45fc-af60-926124f33085","name":"js-alert-config-160529677301705256","description":"alerting config description","crossMetricsOperator":"AND","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '488',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cb950a72-639c-42ee-ad1f-89667c86745d',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  'cb950a72-639c-42ee-ad1f-89667c86745d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:12 GMT'
]);

let nock = require('nock');

module.exports.hash = "8e11f10139199a6e1c9a18956ada78c6";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-163650909556101069"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-163650909556101069","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/e0531358-0a1e-4201-a6b9-253bcc7ca75e',
  'x-request-id',
  '03d4ae3e-47b7-4cd3-b299-6e6798d75b13',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '03d4ae3e-47b7-4cd3-b299-6e6798d75b13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/e0531358-0a1e-4201-a6b9-253bcc7ca75e')
  .reply(200, {"anomalyAlertingConfigurationId":"e0531358-0a1e-4201-a6b9-253bcc7ca75e","name":"js-alert-config2-163650909556101069","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '49e771d2-d9e6-4d50-9803-3e0a7cdd048a',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '49e771d2-d9e6-4d50-9803-3e0a7cdd048a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/3475f225-4b50-4a42-a12a-79779cec4abb/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"647939f7-78d7-4818-8c26-a67bb2d7e260","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"e0531358-0a1e-4201-a6b9-253bcc7ca75e","name":"js-alert-config2-163650909556101069","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd65f8508-e89b-48d5-adf5-2daa84fc6348',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  'd65f8508-e89b-48d5-adf5-2daa84fc6348',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/3475f225-4b50-4a42-a12a-79779cec4abb/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"647939f7-78d7-4818-8c26-a67bb2d7e260","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"e0531358-0a1e-4201-a6b9-253bcc7ca75e","name":"js-alert-config2-163650909556101069","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3475f225-4b50-4a42-a12a-79779cec4abb","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a52d1a03-17f0-41f6-8e93-857ee626d564',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  'a52d1a03-17f0-41f6-8e93-857ee626d564',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/e0531358-0a1e-4201-a6b9-253bcc7ca75e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '29b5b6dc-55f2-46f2-8a5a-ffc9c2abcd0a',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '29b5b6dc-55f2-46f2-8a5a-ffc9c2abcd0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:35 GMT'
]);

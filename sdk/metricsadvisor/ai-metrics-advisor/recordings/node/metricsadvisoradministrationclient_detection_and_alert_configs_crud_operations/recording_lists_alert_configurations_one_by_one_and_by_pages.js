let nock = require('nock');

module.exports.hash = "9a167e1d3a8f7daa9e04b712eb461a61";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-160530445229500586"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-160530445229500586","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/1ac43388-e3d1-4980-b0bd-21d2ec49957c',
  'x-request-id',
  '7a159863-8eb1-47b1-91db-d83b69f5d18e',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '7a159863-8eb1-47b1-91db-d83b69f5d18e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/1ac43388-e3d1-4980-b0bd-21d2ec49957c')
  .reply(200, {"anomalyAlertingConfigurationId":"1ac43388-e3d1-4980-b0bd-21d2ec49957c","name":"js-alert-config2-160530445229500586","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '307',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '17c1605c-3f2c-44b8-a2a1-cda32475540c',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '17c1605c-3f2c-44b8-a2a1-cda32475540c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/45e4fefe-51b9-4efd-9981-594c1ef0d129/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"988c6443-ef9c-4c77-b494-75e0a8a6aeb7","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"1ac43388-e3d1-4980-b0bd-21d2ec49957c","name":"js-alert-config2-160530445229500586","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '98287036-fee4-4170-adf6-ad1f55ad2505',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '98287036-fee4-4170-adf6-ad1f55ad2505',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/45e4fefe-51b9-4efd-9981-594c1ef0d129/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"988c6443-ef9c-4c77-b494-75e0a8a6aeb7","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"1ac43388-e3d1-4980-b0bd-21d2ec49957c","name":"js-alert-config2-160530445229500586","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7c14becd-94a4-49d5-8fcb-a99f16d39b74',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '7c14becd-94a4-49d5-8fcb-a99f16d39b74',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/1ac43388-e3d1-4980-b0bd-21d2ec49957c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3e3cb55f-cca4-4ee3-85e1-a3d983399486',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '3e3cb55f-cca4-4ee3-85e1-a3d983399486',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:12 GMT'
]);

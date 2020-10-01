let nock = require('nock');

module.exports.hash = "0bededc82e88498c5f02fce090407690";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-160106251897809199"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-160106251897809199","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/0c93b5be-1bbc-4f9e-a6a9-5711cd76a7f7',
  'x-request-id',
  '7a83c963-5e92-4121-8e6e-be2f13882724',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '7a83c963-5e92-4121-8e6e-be2f13882724',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:18 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/0c93b5be-1bbc-4f9e-a6a9-5711cd76a7f7')
  .reply(200, {"anomalyAlertingConfigurationId":"0c93b5be-1bbc-4f9e-a6a9-5711cd76a7f7","name":"js-alert-config2-160106251897809199","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '307',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6fa33e54-bc31-4d81-b796-258ac5f9a9be',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '6fa33e54-bc31-4d81-b796-258ac5f9a9be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:19 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"0c93b5be-1bbc-4f9e-a6a9-5711cd76a7f7","name":"js-alert-config2-160106251897809199","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"28e85c5b-cbb5-480b-be46-05b7a6cfcc8e","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5bf80be5-3037-4014-8092-bdfc40bba1a5',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '5bf80be5-3037-4014-8092-bdfc40bba1a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:19 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a459fa2f-8f12-4d86-952f-d4b63c0e2c61/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"0c93b5be-1bbc-4f9e-a6a9-5711cd76a7f7","name":"js-alert-config2-160106251897809199","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"28e85c5b-cbb5-480b-be46-05b7a6cfcc8e","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '850772f8-bcf4-452a-82fb-82ac31d40d32',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  '850772f8-bcf4-452a-82fb-82ac31d40d32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:19 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/0c93b5be-1bbc-4f9e-a6a9-5711cd76a7f7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c3c13d80-cd65-457e-8a3a-7f682e039081',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'c3c13d80-cd65-457e-8a3a-7f682e039081',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:21 GMT',
  'Connection',
  'close'
]);

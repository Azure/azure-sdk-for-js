let nock = require('nock');

module.exports.hash = "9a167e1d3a8f7daa9e04b712eb461a61";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-160530496218908180"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-160530496218908180","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/91f6b5b5-a3dc-45b0-9e02-745cff50e638',
  'x-request-id',
  'a0edb6bd-6fbf-4244-86f7-4ed8ba5409d1',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'a0edb6bd-6fbf-4244-86f7-4ed8ba5409d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/91f6b5b5-a3dc-45b0-9e02-745cff50e638')
  .reply(200, {"anomalyAlertingConfigurationId":"91f6b5b5-a3dc-45b0-9e02-745cff50e638","name":"js-alert-config2-160530496218908180","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '307',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ecc4515f-26ca-473d-8ccf-478b19d3869b',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'ecc4515f-26ca-473d-8ccf-478b19d3869b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/e3ab2e89-d596-47aa-8ea8-5bd724f3b827/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"91f6b5b5-a3dc-45b0-9e02-745cff50e638","name":"js-alert-config2-160530496218908180","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"180377ec-559a-40d1-af6c-2b3d9d5909bf","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f2a398ab-f5d2-4360-b82d-a1cd100f523c',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  'f2a398ab-f5d2-4360-b82d-a1cd100f523c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/e3ab2e89-d596-47aa-8ea8-5bd724f3b827/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"91f6b5b5-a3dc-45b0-9e02-745cff50e638","name":"js-alert-config2-160530496218908180","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"180377ec-559a-40d1-af6c-2b3d9d5909bf","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '95a78cfb-5e7d-448f-887d-645e87557f61',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '95a78cfb-5e7d-448f-887d-645e87557f61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/91f6b5b5-a3dc-45b0-9e02-745cff50e638')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9cdaa2ab-418a-47ef-9859-c01ca07adb1f',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '9cdaa2ab-418a-47ef-9859-c01ca07adb1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:42 GMT'
]);

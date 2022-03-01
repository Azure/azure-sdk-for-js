let nock = require('nock');

module.exports.hash = "48a95a5bdb6afdc15326e20292a72db3";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-164264029976805046"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-164264029976805046","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/67de863d-a425-4013-9f90-17b9d31bb547',
  'x-request-id',
  '54492fb6-8265-4545-839b-a8d6814ebaff',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  '54492fb6-8265-4545-839b-a8d6814ebaff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/67de863d-a425-4013-9f90-17b9d31bb547')
  .reply(200, {"anomalyAlertingConfigurationId":"67de863d-a425-4013-9f90-17b9d31bb547","name":"js-alert-config2-164264029976805046","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4f59f6aa-90b9-457e-9bff-0633d0d3439c',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '4f59f6aa-90b9-457e-9bff-0633d0d3439c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/c4ea04e0-2626-41f3-acc7-31c85df331c2/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"67de863d-a425-4013-9f90-17b9d31bb547","name":"js-alert-config2-164264029976805046","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"b13d420d-c738-4c44-845e-8922cb2e2476","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '80521b07-42e0-4b6b-8c15-01fd54b9de26',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '80521b07-42e0-4b6b-8c15-01fd54b9de26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/c4ea04e0-2626-41f3-acc7-31c85df331c2/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"67de863d-a425-4013-9f90-17b9d31bb547","name":"js-alert-config2-164264029976805046","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"b13d420d-c738-4c44-845e-8922cb2e2476","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"c4ea04e0-2626-41f3-acc7-31c85df331c2","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ab51cd4d-36f1-4464-a5d8-14ce8dcd2135',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'ab51cd4d-36f1-4464-a5d8-14ce8dcd2135',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/67de863d-a425-4013-9f90-17b9d31bb547')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8dbfe5d6-3cc1-470d-9a60-b30b4655d55d',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '8dbfe5d6-3cc1-470d-9a60-b30b4655d55d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:20 GMT'
]);

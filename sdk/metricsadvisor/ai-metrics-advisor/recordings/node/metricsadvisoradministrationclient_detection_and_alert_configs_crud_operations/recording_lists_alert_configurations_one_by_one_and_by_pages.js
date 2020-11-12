let nock = require('nock');

module.exports.hash = "9a167e1d3a8f7daa9e04b712eb461a61";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-160522263390000771"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-160522263390000771","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/b71a82f1-c416-4e56-ba30-db86c3a5b54c',
  'x-request-id',
  '43c1c70f-c258-44a3-bb04-8c19b9bdcd51',
  'x-envoy-upstream-service-time',
  '123',
  'apim-request-id',
  '43c1c70f-c258-44a3-bb04-8c19b9bdcd51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/b71a82f1-c416-4e56-ba30-db86c3a5b54c')
  .reply(200, {"anomalyAlertingConfigurationId":"b71a82f1-c416-4e56-ba30-db86c3a5b54c","name":"js-alert-config2-160522263390000771","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '307',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '57a52638-628a-4c17-9cc7-cd3c781c60bc',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  '57a52638-628a-4c17-9cc7-cd3c781c60bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/8f867116-8170-4273-90a9-9ecb10e1f57e/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"e4c85a26-8954-460e-b102-60023d51fd58","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"b71a82f1-c416-4e56-ba30-db86c3a5b54c","name":"js-alert-config2-160522263390000771","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'db289a3b-ab61-4065-9594-f9d804274217',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'db289a3b-ab61-4065-9594-f9d804274217',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/8f867116-8170-4273-90a9-9ecb10e1f57e/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"e4c85a26-8954-460e-b102-60023d51fd58","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"b71a82f1-c416-4e56-ba30-db86c3a5b54c","name":"js-alert-config2-160522263390000771","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"8f867116-8170-4273-90a9-9ecb10e1f57e","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6863af67-f43e-4d74-8858-ecadb4fa1f1b',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '6863af67-f43e-4d74-8858-ecadb4fa1f1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/b71a82f1-c416-4e56-ba30-db86c3a5b54c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ec041016-605a-48c5-8376-ef77c050ff22',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'ec041016-605a-48c5-8376-ef77c050ff22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:34 GMT'
]);

let nock = require('nock');

module.exports.hash = "8e11f10139199a6e1c9a18956ada78c6";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-163650908796501692"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '49d54f8c-dd5c-40b6-b746-be568edd0500',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhWBEaC1GMtPnR8FVulxOLY; expires=Fri, 10-Dec-2021 01:51:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 01:51:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-163650908796501692","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/10fe91fa-af8c-45a3-9757-a64610e30774',
  'x-request-id',
  '065abb50-ae0e-4d1c-a026-8380f17f5cb3',
  'x-envoy-upstream-service-time',
  '304',
  'apim-request-id',
  '065abb50-ae0e-4d1c-a026-8380f17f5cb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/10fe91fa-af8c-45a3-9757-a64610e30774')
  .reply(200, {"anomalyAlertingConfigurationId":"10fe91fa-af8c-45a3-9757-a64610e30774","name":"js-alert-config2-163650908796501692","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '939d3893-cf48-415b-bd0e-8af8467c8eaa',
  'x-envoy-upstream-service-time',
  '246',
  'apim-request-id',
  '939d3893-cf48-415b-bd0e-8af8467c8eaa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"10fe91fa-af8c-45a3-9757-a64610e30774","name":"js-alert-config2-163650908796501692","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"9d469026-8520-471a-9dcc-688540a39082","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '887a9b19-5f34-48fb-828e-0816d0904f41',
  'x-envoy-upstream-service-time',
  '132',
  'apim-request-id',
  '887a9b19-5f34-48fb-828e-0816d0904f41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"10fe91fa-af8c-45a3-9757-a64610e30774","name":"js-alert-config2-163650908796501692","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"9d469026-8520-471a-9dcc-688540a39082","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '68206d0f-6834-49e5-bb9f-c0c5143906dd',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '68206d0f-6834-49e5-bb9f-c0c5143906dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/10fe91fa-af8c-45a3-9757-a64610e30774')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '59d8088b-510a-4bd2-a44b-4709eb1e55a5',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  '59d8088b-510a-4bd2-a44b-4709eb1e55a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:28 GMT'
]);

let nock = require('nock');

module.exports.hash = "3fb525a663ff304a4d258ad0b67570b8";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-161069994933600886"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '84bd94cb-8752-41d3-a37a-7f3bcfc94200',
  'x-ms-ests-server',
  '2.1.11397.13 - SEASLR1 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mCgAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:39:09 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:39:08 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-161069994933600886","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/fc0fd620-4ec0-4253-9120-4a754b1df1d4',
  'x-request-id',
  '2562c328-1a4d-42bb-9226-5535ee0ee99e',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  '2562c328-1a4d-42bb-9226-5535ee0ee99e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:09 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/fc0fd620-4ec0-4253-9120-4a754b1df1d4')
  .reply(200, {"anomalyAlertingConfigurationId":"fc0fd620-4ec0-4253-9120-4a754b1df1d4","name":"js-alert-config2-161069994933600886","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '307',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9557f6a1-752f-4821-b843-82f45143f9e6',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '9557f6a1-752f-4821-b843-82f45143f9e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/4b92d8b9-f381-405b-8116-1ccce0a119ed/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"83ea6a49-e437-413a-8088-8103f5e0c686","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"fc0fd620-4ec0-4253-9120-4a754b1df1d4","name":"js-alert-config2-161069994933600886","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '092eb54a-302a-4598-925f-1fca1a710e7a',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '092eb54a-302a-4598-925f-1fca1a710e7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/4b92d8b9-f381-405b-8116-1ccce0a119ed/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"83ea6a49-e437-413a-8088-8103f5e0c686","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"fc0fd620-4ec0-4253-9120-4a754b1df1d4","name":"js-alert-config2-161069994933600886","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"4b92d8b9-f381-405b-8116-1ccce0a119ed","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1a9a386b-05ae-40c1-bc03-24acdf96d323',
  'x-envoy-upstream-service-time',
  '51',
  'apim-request-id',
  '1a9a386b-05ae-40c1-bc03-24acdf96d323',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/fc0fd620-4ec0-4253-9120-4a754b1df1d4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '25ad5286-aa03-418d-b1d1-3e02d0ff7374',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '25ad5286-aa03-418d-b1d1-3e02d0ff7374',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:11 GMT'
]);

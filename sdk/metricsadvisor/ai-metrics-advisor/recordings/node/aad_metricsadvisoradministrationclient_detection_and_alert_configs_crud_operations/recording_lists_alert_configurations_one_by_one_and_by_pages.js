let nock = require('nock');

module.exports.hash = "8e11f10139199a6e1c9a18956ada78c6";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-163636427316204387"},"newDate":{}}

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
  '201c79b6-a5d2-42b4-ab36-dbd689539000',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AugXDqY78KFNvknorH3YwDjGLH8mAQAAAPDmGtkOAAAA; expires=Wed, 08-Dec-2021 09:37:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:37:52 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-163636427316204387","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/80c9b166-5852-4bbb-af8a-04831013c696',
  'x-request-id',
  '0c65c107-19b4-4db2-a5f4-aa1dcc12beef',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '0c65c107-19b4-4db2-a5f4-aa1dcc12beef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/80c9b166-5852-4bbb-af8a-04831013c696')
  .reply(200, {"anomalyAlertingConfigurationId":"80c9b166-5852-4bbb-af8a-04831013c696","name":"js-alert-config2-163636427316204387","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b186b72a-e97d-4006-89a4-cec90baaa33a',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'b186b72a-e97d-4006-89a4-cec90baaa33a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/110910a1-a23d-4b80-b8f5-094a75eee9c0/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"00489294-c724-49eb-a727-e94f39ffe5bd","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"80c9b166-5852-4bbb-af8a-04831013c696","name":"js-alert-config2-163636427316204387","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '58cd1ee6-43c5-445e-b048-5ec4fc2220fa',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '58cd1ee6-43c5-445e-b048-5ec4fc2220fa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/110910a1-a23d-4b80-b8f5-094a75eee9c0/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"00489294-c724-49eb-a727-e94f39ffe5bd","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"80c9b166-5852-4bbb-af8a-04831013c696","name":"js-alert-config2-163636427316204387","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7b34798f-0643-483d-829c-bba46358332d',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '7b34798f-0643-483d-829c-bba46358332d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/80c9b166-5852-4bbb-af8a-04831013c696')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2f089404-a830-46f3-ac2d-5964a25496e1',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  '2f089404-a830-46f3-ac2d-5964a25496e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:53 GMT'
]);

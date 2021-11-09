let nock = require('nock');

module.exports.hash = "5259dd1945f72341676b3c0de1514ada";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-163636427209604328"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '95a33dd3-1bf0-4407-b4b5-05906f68ba00',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhfIlnt2TY9AuicifxhlqhrGLH8mAQAAAO_mGtkOAAAA; expires=Wed, 08-Dec-2021 09:37:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:37:51 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-163636427209604328","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/00489294-c724-49eb-a727-e94f39ffe5bd',
  'x-request-id',
  '384c7261-fc88-4528-9d3d-d843a5d35fad',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '384c7261-fc88-4528-9d3d-d843a5d35fad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/00489294-c724-49eb-a727-e94f39ffe5bd')
  .reply(200, {"anomalyAlertingConfigurationId":"00489294-c724-49eb-a727-e94f39ffe5bd","name":"js-alert-config-163636427209604328","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4ae7350b-9944-4d33-a677-6518159fc5ad',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '4ae7350b-9944-4d33-a677-6518159fc5ad',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:51 GMT'
]);

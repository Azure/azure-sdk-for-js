let nock = require('nock');

module.exports.hash = "8fba37cabe88b5d1094adf895e044d73";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

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
  'dee07769-9593-4083-baea-2ce9e1fcb400',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvprD_3uPZdMj7MBedWdFA7GLH8mAQAAAO_mGtkOAAAA; expires=Wed, 08-Dec-2021 09:37:52 GMT; path=/; secure; HttpOnly; SameSite=None',
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
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/00489294-c724-49eb-a727-e94f39ffe5bd')
  .reply(200, {"anomalyAlertingConfigurationId":"00489294-c724-49eb-a727-e94f39ffe5bd","name":"js-alert-config-163636427209604328","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"110910a1-a23d-4b80-b8f5-094a75eee9c0","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4eae0858-375b-4a17-a648-a656b69982d5',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '4eae0858-375b-4a17-a648-a656b69982d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:51 GMT'
]);

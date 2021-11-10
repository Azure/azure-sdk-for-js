let nock = require('nock');

module.exports.hash = "5259dd1945f72341676b3c0de1514ada";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-163650908635606190"},"newDate":{}}

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
  '28195d01-024d-4c1f-a336-acaccc1a0600',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnsfyiFFqrRFoqV4gYlsmSU; expires=Fri, 10-Dec-2021 01:51:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 01:51:26 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-163650908635606190","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/9d469026-8520-471a-9dcc-688540a39082',
  'x-request-id',
  '85371428-bceb-414f-8592-bef8a8b3bb11',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  '85371428-bceb-414f-8592-bef8a8b3bb11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/9d469026-8520-471a-9dcc-688540a39082')
  .reply(200, {"anomalyAlertingConfigurationId":"9d469026-8520-471a-9dcc-688540a39082","name":"js-alert-config-163650908635606190","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"e7c92eb3-ca1b-42c9-8a97-1e3c071a8c24","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '82881e0e-2b72-4b09-9e4b-45dd67f6782a',
  'x-envoy-upstream-service-time',
  '296',
  'apim-request-id',
  '82881e0e-2b72-4b09-9e4b-45dd67f6782a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:26 GMT'
]);

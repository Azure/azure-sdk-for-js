let nock = require('nock');

module.exports.hash = "d9b15261bf1beb6aa271dbf56bacf022";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-162007826619904229"},"newDate":{}}

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
  '5a9d4785-1c04-4b03-8c4e-b53996c12202',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AnlkyI3_Sw5Cu2-AqfSONJTGLH8mBQAAAKBlItgOAAAA; expires=Wed, 02-Jun-2021 21:44:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 03 May 2021 21:44:25 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-162007826619904229","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/b16d24b8-16fa-458e-8289-4c40f29af1d4',
  'x-request-id',
  '5ebf88b1-fccd-4c8d-bed6-6b5098933b97',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '5ebf88b1-fccd-4c8d-bed6-6b5098933b97',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:44:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/b16d24b8-16fa-458e-8289-4c40f29af1d4')
  .reply(200, {"anomalyAlertingConfigurationId":"b16d24b8-16fa-458e-8289-4c40f29af1d4","name":"js-alert-config-162007826619904229","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"edb91803-d3ef-4209-85d8-e880b13f7587","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f739c57e-9fd7-418f-98aa-5ae9d54361d2',
  'x-envoy-upstream-service-time',
  '5213',
  'apim-request-id',
  'f739c57e-9fd7-418f-98aa-5ae9d54361d2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:44:32 GMT'
]);

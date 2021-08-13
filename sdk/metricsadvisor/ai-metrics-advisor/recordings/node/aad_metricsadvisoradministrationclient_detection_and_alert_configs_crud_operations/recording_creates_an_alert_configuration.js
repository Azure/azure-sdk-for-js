let nock = require('nock');

module.exports.hash = "d9b15261bf1beb6aa271dbf56bacf022";

module.exports.testInfo = {"uniqueName":{"js-alert-config-":"js-alert-config-162265510617402460"},"newDate":{}}

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
  '90db956e-40a9-48a3-ac63-95e025fcae00',
  'x-ms-ests-server',
  '2.1.11722.26 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhDmgzXYAD1Lu7GFYxxGYOLGLH8mCgAAAHi3SdgOAAAA; expires=Fri, 02-Jul-2021 17:31:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 17:31:45 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config-162265510617402460","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All"},{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/2532f996-2583-419c-a18d-fe79cf0d5a4c',
  'x-request-id',
  'f5d6b2ca-2e2e-4009-9d96-21d8a2c7e6df',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'f5d6b2ca-2e2e-4009-9d96-21d8a2c7e6df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/2532f996-2583-419c-a18d-fe79cf0d5a4c')
  .reply(200, {"anomalyAlertingConfigurationId":"2532f996-2583-419c-a18d-fe79cf0d5a4c","name":"js-alert-config-162265510617402460","description":"alerting config description","crossMetricsOperator":"AND","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All","negationOperation":false},{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '516',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9fe006e2-8890-4585-8c4a-d4613a6e7f0c',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '9fe006e2-8890-4585-8c4a-d4613a6e7f0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:46 GMT'
]);

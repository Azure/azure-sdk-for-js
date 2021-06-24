let nock = require('nock');

module.exports.hash = "3fb525a663ff304a4d258ad0b67570b8";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-162265510709607979"},"newDate":{}}

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
  '583c8573-5711-4ff6-b823-2757449fa800',
  'x-ms-ests-server',
  '2.1.11722.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhDmgzXYAD1Lu7GFYxxGYOLGLH8mCwAAAHi3SdgOAAAA; expires=Fri, 02-Jul-2021 17:31:47 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 17:31:46 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-162265510709607979","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/0d3bea36-583f-4f06-99aa-81aa67aa945a',
  'x-request-id',
  '75b910d1-53a6-421c-965a-2941e0f9ee3b',
  'x-envoy-upstream-service-time',
  '167',
  'apim-request-id',
  '75b910d1-53a6-421c-965a-2941e0f9ee3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/0d3bea36-583f-4f06-99aa-81aa67aa945a')
  .reply(200, {"anomalyAlertingConfigurationId":"0d3bea36-583f-4f06-99aa-81aa67aa945a","name":"js-alert-config2-162265510709607979","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7bb0a329-98f8-47e3-8a04-e612ba8a92f9',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '7bb0a329-98f8-47e3-8a04-e612ba8a92f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/3eb1771b-7943-4ce4-8a99-54f102d244de/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"0d3bea36-583f-4f06-99aa-81aa67aa945a","name":"js-alert-config2-162265510709607979","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"2532f996-2583-419c-a18d-fe79cf0d5a4c","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6e3ff480-380c-4a3f-94ff-c0f7895756b7',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '6e3ff480-380c-4a3f-94ff-c0f7895756b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/3eb1771b-7943-4ce4-8a99-54f102d244de/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"0d3bea36-583f-4f06-99aa-81aa67aa945a","name":"js-alert-config2-162265510709607979","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"2532f996-2583-419c-a18d-fe79cf0d5a4c","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"3eb1771b-7943-4ce4-8a99-54f102d244de","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b710df6c-8734-4351-9192-1ccd86772dfe',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  'b710df6c-8734-4351-9192-1ccd86772dfe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/0d3bea36-583f-4f06-99aa-81aa67aa945a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8c2cdfec-d704-48b5-92a3-b542d39810c0',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  '8c2cdfec-d704-48b5-92a3-b542d39810c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:47 GMT'
]);

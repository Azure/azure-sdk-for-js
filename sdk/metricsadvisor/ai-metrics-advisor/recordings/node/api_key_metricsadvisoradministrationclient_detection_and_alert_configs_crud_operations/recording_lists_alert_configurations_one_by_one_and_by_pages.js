let nock = require('nock');

module.exports.hash = "3fb525a663ff304a4d258ad0b67570b8";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-162105175676808974"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-162105175676808974","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/20ddd0b4-b4a5-4dcd-b9b9-23dda2c27866',
  'x-request-id',
  '6d3c06ef-99c6-4494-b1bd-a895580a22d6',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '6d3c06ef-99c6-4494-b1bd-a895580a22d6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/20ddd0b4-b4a5-4dcd-b9b9-23dda2c27866')
  .reply(200, {"anomalyAlertingConfigurationId":"20ddd0b4-b4a5-4dcd-b9b9-23dda2c27866","name":"js-alert-config2-162105175676808974","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '463803ce-7616-4cb8-afcc-850457313681',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '463803ce-7616-4cb8-afcc-850457313681',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/d0d157b8-8b45-4f84-9129-fda310802e17/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"3722e939-b1ba-4142-885c-cf8d0d1eb68a","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"20ddd0b4-b4a5-4dcd-b9b9-23dda2c27866","name":"js-alert-config2-162105175676808974","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '64dc31c3-62ca-49d8-bddc-6d576ca80f7f',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '64dc31c3-62ca-49d8-bddc-6d576ca80f7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/d0d157b8-8b45-4f84-9129-fda310802e17/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"3722e939-b1ba-4142-885c-cf8d0d1eb68a","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"20ddd0b4-b4a5-4dcd-b9b9-23dda2c27866","name":"js-alert-config2-162105175676808974","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"d0d157b8-8b45-4f84-9129-fda310802e17","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1b1478a2-73c5-498b-88fd-f059f7290386',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '1b1478a2-73c5-498b-88fd-f059f7290386',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/20ddd0b4-b4a5-4dcd-b9b9-23dda2c27866')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '44028dd2-1f71-4430-8a76-8718d66e814c',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '44028dd2-1f71-4430-8a76-8718d66e814c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:16 GMT'
]);

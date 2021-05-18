let nock = require('nock');

module.exports.hash = "3fb525a663ff304a4d258ad0b67570b8";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-162007835647403352"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-162007835647403352","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/3711d8ea-b21f-47e5-a2a1-b0cc73095992',
  'x-request-id',
  '9fd75427-0712-41e6-a6a0-17d3636aa0a4',
  'x-envoy-upstream-service-time',
  '10415',
  'apim-request-id',
  '9fd75427-0712-41e6-a6a0-17d3636aa0a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/3711d8ea-b21f-47e5-a2a1-b0cc73095992')
  .reply(200, {"anomalyAlertingConfigurationId":"3711d8ea-b21f-47e5-a2a1-b0cc73095992","name":"js-alert-config2-162007835647403352","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0a69ab5e-40d5-4097-998d-fc20f026e825',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  '0a69ab5e-40d5-4097-998d-fc20f026e825',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"349b1b8c-06e1-459b-8a6b-7c8ffca526b6","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"3711d8ea-b21f-47e5-a2a1-b0cc73095992","name":"js-alert-config2-162007835647403352","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8c962955-2799-48c9-8ee3-99df67d2360c',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  '8c962955-2799-48c9-8ee3-99df67d2360c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"349b1b8c-06e1-459b-8a6b-7c8ffca526b6","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"3711d8ea-b21f-47e5-a2a1-b0cc73095992","name":"js-alert-config2-162007835647403352","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '57db7c50-3bf8-4bd9-8ed1-e9c6f8c3ea8a',
  'x-envoy-upstream-service-time',
  '5224',
  'apim-request-id',
  '57db7c50-3bf8-4bd9-8ed1-e9c6f8c3ea8a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/3711d8ea-b21f-47e5-a2a1-b0cc73095992')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'abbe5b07-13e5-4236-b4eb-bf81b16d11b2',
  'x-envoy-upstream-service-time',
  '5186',
  'apim-request-id',
  'abbe5b07-13e5-4236-b4eb-bf81b16d11b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:17 GMT'
]);

let nock = require('nock');

module.exports.hash = "8e11f10139199a6e1c9a18956ada78c6";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-163702273510508689"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-163702273510508689","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/7ea843e0-3516-4188-bd14-a60d123bff17',
  'x-request-id',
  'fc5f2f5b-c763-4a40-997c-98649bfac792',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  'fc5f2f5b-c763-4a40-997c-98649bfac792',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7ea843e0-3516-4188-bd14-a60d123bff17')
  .reply(200, {"anomalyAlertingConfigurationId":"7ea843e0-3516-4188-bd14-a60d123bff17","name":"js-alert-config2-163702273510508689","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6cf6b0f5-4871-49c0-95d6-7fb4706c803c',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '6cf6b0f5-4871-49c0-95d6-7fb4706c803c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/52eba2dd-87a2-44d7-b4f2-3510e7df5647/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"7ea843e0-3516-4188-bd14-a60d123bff17","name":"js-alert-config2-163702273510508689","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"dc77a835-8161-416a-bd73-035d5e49b69d","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'eb2e7e66-b452-4e95-bd04-9dadd8f5ea53',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  'eb2e7e66-b452-4e95-bd04-9dadd8f5ea53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/52eba2dd-87a2-44d7-b4f2-3510e7df5647/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"7ea843e0-3516-4188-bd14-a60d123bff17","name":"js-alert-config2-163702273510508689","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"All","negationOperation":false}]},{"anomalyAlertingConfigurationId":"dc77a835-8161-416a-bd73-035d5e49b69d","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"52eba2dd-87a2-44d7-b4f2-3510e7df5647","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5049c564-b8fe-47ae-9f3e-0a6b10a3bb12',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '5049c564-b8fe-47ae-9f3e-0a6b10a3bb12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/7ea843e0-3516-4188-bd14-a60d123bff17')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '925f27b1-f386-4a97-8342-2329ee46888b',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '925f27b1-f386-4a97-8342-2329ee46888b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:15 GMT'
]);

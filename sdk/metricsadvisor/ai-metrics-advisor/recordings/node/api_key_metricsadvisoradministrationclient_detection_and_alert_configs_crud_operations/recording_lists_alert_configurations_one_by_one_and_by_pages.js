let nock = require('nock');

module.exports.hash = "8e11f10139199a6e1c9a18956ada78c6";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-163636427813800362"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-163636427813800362","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/65cf53c5-c6bf-4316-aaf2-db4273ed87d8',
  'x-request-id',
  '7467a116-2350-43db-8b14-2b9feab093ff',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '7467a116-2350-43db-8b14-2b9feab093ff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/65cf53c5-c6bf-4316-aaf2-db4273ed87d8')
  .reply(200, {"anomalyAlertingConfigurationId":"65cf53c5-c6bf-4316-aaf2-db4273ed87d8","name":"js-alert-config2-163636427813800362","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '03d83900-0170-45db-a150-e7de93982355',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '03d83900-0170-45db-a150-e7de93982355',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5aee4c62-9733-48e9-a548-8a3b37d2e152/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"49dcf7e4-7f5b-4a80-9926-18b157405904","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"65cf53c5-c6bf-4316-aaf2-db4273ed87d8","name":"js-alert-config2-163636427813800362","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0e97cacd-0b08-494f-867d-e4f143f56775',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '0e97cacd-0b08-494f-867d-e4f143f56775',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5aee4c62-9733-48e9-a548-8a3b37d2e152/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"49dcf7e4-7f5b-4a80-9926-18b157405904","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"65cf53c5-c6bf-4316-aaf2-db4273ed87d8","name":"js-alert-config2-163636427813800362","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"5aee4c62-9733-48e9-a548-8a3b37d2e152","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '60bd9b63-4d31-4056-8485-5254452a4d6e',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '60bd9b63-4d31-4056-8485-5254452a4d6e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/65cf53c5-c6bf-4316-aaf2-db4273ed87d8')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '80edb4f7-d19d-45bc-9bf8-1ede4e2493a3',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '80edb4f7-d19d-45bc-9bf8-1ede4e2493a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:58 GMT'
]);

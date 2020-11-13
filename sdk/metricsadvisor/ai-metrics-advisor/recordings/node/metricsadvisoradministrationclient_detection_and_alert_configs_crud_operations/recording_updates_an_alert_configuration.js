let nock = require('nock');

module.exports.hash = "61963e2df32473755b6e3f385d362485";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/988c6443-ef9c-4c77-b494-75e0a8a6aeb7', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3331755d-6ff3-46af-a3f3-478d0266b862',
  'x-envoy-upstream-service-time',
  '147',
  'apim-request-id',
  '3331755d-6ff3-46af-a3f3-478d0266b862',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/988c6443-ef9c-4c77-b494-75e0a8a6aeb7')
  .reply(200, {"anomalyAlertingConfigurationId":"988c6443-ef9c-4c77-b494-75e0a8a6aeb7","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"45e4fefe-51b9-4efd-9981-594c1ef0d129","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '589',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '40e0a171-a66f-4559-bd30-9612a666233f',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '40e0a171-a66f-4559-bd30-9612a666233f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:11 GMT'
]);

let nock = require('nock');

module.exports.hash = "61963e2df32473755b6e3f385d362485";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/180377ec-559a-40d1-af6c-2b3d9d5909bf', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '035c7294-f7cd-48a1-b311-9e1a987adc19',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '035c7294-f7cd-48a1-b311-9e1a987adc19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/180377ec-559a-40d1-af6c-2b3d9d5909bf')
  .reply(200, {"anomalyAlertingConfigurationId":"180377ec-559a-40d1-af6c-2b3d9d5909bf","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"e3ab2e89-d596-47aa-8ea8-5bd724f3b827","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '589',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e55e4036-73d6-4bac-9ce2-9cb5fd55dd5c',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'e55e4036-73d6-4bac-9ce2-9cb5fd55dd5c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:41 GMT'
]);

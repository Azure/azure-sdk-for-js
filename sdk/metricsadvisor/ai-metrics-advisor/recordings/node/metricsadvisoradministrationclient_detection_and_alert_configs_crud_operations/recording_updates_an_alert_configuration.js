let nock = require('nock');

module.exports.hash = "82337b30c2a302e209e52fcd75369df6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/alert/anomaly/configurations/28e85c5b-cbb5-480b-be46-05b7a6cfcc8e', {"name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"TopN","topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c4afa871-f8ca-4d67-9f59-7179696c2718',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'c4afa871-f8ca-4d67-9f59-7179696c2718',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:16 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/28e85c5b-cbb5-480b-be46-05b7a6cfcc8e')
  .reply(200, {"anomalyAlertingConfigurationId":"28e85c5b-cbb5-480b-be46-05b7a6cfcc8e","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a459fa2f-8f12-4d86-952f-d4b63c0e2c61","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]}, [
  'Content-Length',
  '589',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6942031f-88f4-4cca-9bc5-41f12300f499',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '6942031f-88f4-4cca-9bc5-41f12300f499',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 19:35:17 GMT',
  'Connection',
  'close'
]);

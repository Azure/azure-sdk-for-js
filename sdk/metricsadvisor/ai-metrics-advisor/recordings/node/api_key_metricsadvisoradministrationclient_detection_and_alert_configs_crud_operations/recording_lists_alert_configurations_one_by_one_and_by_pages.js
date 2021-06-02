let nock = require('nock');

module.exports.hash = "3fb525a663ff304a4d258ad0b67570b8";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-162265511261900378"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-162265511261900378","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/78996391-902c-448d-a46e-7830a5a120bc',
  'x-request-id',
  '78de5222-9aaa-435e-870a-bb7f17b3cc77',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '78de5222-9aaa-435e-870a-bb7f17b3cc77',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/78996391-902c-448d-a46e-7830a5a120bc')
  .reply(200, {"anomalyAlertingConfigurationId":"78996391-902c-448d-a46e-7830a5a120bc","name":"js-alert-config2-162265511261900378","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f92a3435-3cab-45f1-bcc0-18b646884572',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  'f92a3435-3cab-45f1-bcc0-18b646884572',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a7cc6dda-d4e7-447d-aa57-3fc3395d5516/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"5130d48a-0b41-4838-b589-d72178f20554","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"78996391-902c-448d-a46e-7830a5a120bc","name":"js-alert-config2-162265511261900378","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9c2aae60-9fff-43e0-88ca-cdc09c533861',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '9c2aae60-9fff-43e0-88ca-cdc09c533861',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/a7cc6dda-d4e7-447d-aa57-3fc3395d5516/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"5130d48a-0b41-4838-b589-d72178f20554","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"78996391-902c-448d-a46e-7830a5a120bc","name":"js-alert-config2-162265511261900378","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"a7cc6dda-d4e7-447d-aa57-3fc3395d5516","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c9fc81f3-66d4-443c-8459-29277fd429b0',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  'c9fc81f3-66d4-443c-8459-29277fd429b0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/78996391-902c-448d-a46e-7830a5a120bc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '06c3c73f-1270-415a-bee0-fbe92982a5f6',
  'x-envoy-upstream-service-time',
  '141',
  'apim-request-id',
  '06c3c73f-1270-415a-bee0-fbe92982a5f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:52 GMT'
]);

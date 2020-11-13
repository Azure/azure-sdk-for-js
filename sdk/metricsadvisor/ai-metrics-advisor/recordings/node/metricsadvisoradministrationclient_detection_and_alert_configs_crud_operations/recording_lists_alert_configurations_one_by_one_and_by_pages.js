let nock = require('nock');

module.exports.hash = "9a167e1d3a8f7daa9e04b712eb461a61";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-160529677391704626"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-160529677391704626","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/ce7be2e9-e651-4c25-afe6-75f47c8422ad',
  'x-request-id',
  'cfbc7776-b91b-4dfb-a121-73c3f363a0ae',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'cfbc7776-b91b-4dfb-a121-73c3f363a0ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/ce7be2e9-e651-4c25-afe6-75f47c8422ad')
  .reply(200, {"anomalyAlertingConfigurationId":"ce7be2e9-e651-4c25-afe6-75f47c8422ad","name":"js-alert-config2-160529677391704626","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '307',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1477b815-8e35-4c79-b261-5deb1be2c575',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '1477b815-8e35-4c79-b261-5deb1be2c575',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/1e23316a-5a0b-411d-a8f7-93f4d54467f7/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"8c6f9e00-1168-45fc-af60-926124f33085","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"ce7be2e9-e651-4c25-afe6-75f47c8422ad","name":"js-alert-config2-160529677391704626","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bd375ad3-a188-434e-9332-d8fcf3297676',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  'bd375ad3-a188-434e-9332-d8fcf3297676',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/1e23316a-5a0b-411d-a8f7-93f4d54467f7/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"8c6f9e00-1168-45fc-af60-926124f33085","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"ce7be2e9-e651-4c25-afe6-75f47c8422ad","name":"js-alert-config2-160529677391704626","description":"","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"1e23316a-5a0b-411d-a8f7-93f4d54467f7","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '441d6e83-f0cd-40e0-bd17-7ca8bc25d399',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '441d6e83-f0cd-40e0-bd17-7ca8bc25d399',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/ce7be2e9-e651-4c25-afe6-75f47c8422ad')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f9158b0a-cc5b-44ba-a625-7ce6d76a0f4a',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  'f9158b0a-cc5b-44ba-a625-7ce6d76a0f4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:14 GMT'
]);

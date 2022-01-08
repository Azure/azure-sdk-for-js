let nock = require('nock');

module.exports.hash = "48a95a5bdb6afdc15326e20292a72db3";

module.exports.testInfo = {"uniqueName":{"js-alert-config2-":"js-alert-config2-164160816211707001"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations', {"name":"js-alert-config2-164160816211707001","crossMetricsOperator":"OR","hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All"}]})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/ea953ad6-b468-47c5-93f5-a1de47ed62a4',
  'x-request-id',
  'da7a7226-806e-4683-975d-73db42468025',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  'da7a7226-806e-4683-975d-73db42468025',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/ea953ad6-b468-47c5-93f5-a1de47ed62a4')
  .reply(200, {"anomalyAlertingConfigurationId":"ea953ad6-b468-47c5-93f5-a1de47ed62a4","name":"js-alert-config2-164160816211707001","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All","negationOperation":false}]}, [
  'Content-Length',
  '335',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'de220ea3-5877-46f6-a38e-9128f83423c0',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  'de220ea3-5877-46f6-a38e-9128f83423c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/359d1bf9-0c6a-4063-bd2d-64b80f65253b/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"c2338a32-2941-4718-8eac-468cc77ee2a5","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"ea953ad6-b468-47c5-93f5-a1de47ed62a4","name":"js-alert-config2-164160816211707001","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f142eef6-2991-4304-98c6-44ae1182c4e1',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'f142eef6-2991-4304-98c6-44ae1182c4e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/359d1bf9-0c6a-4063-bd2d-64b80f65253b/alert/anomaly/configurations')
  .reply(200, {"value":[{"anomalyAlertingConfigurationId":"c2338a32-2941-4718-8eac-468cc77ee2a5","name":"new alert config name","description":"new alert config description","crossMetricsOperator":"OR","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}},{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"TopN","negationOperation":false,"topNAnomalyScope":{"top":3,"period":4,"minTopCount":2}}]},{"anomalyAlertingConfigurationId":"ea953ad6-b468-47c5-93f5-a1de47ed62a4","name":"js-alert-config2-164160816211707001","description":"","splitAlertByDimensions":[],"hookIds":[],"metricAlertingConfigurations":[{"anomalyDetectionConfigurationId":"359d1bf9-0c6a-4063-bd2d-64b80f65253b","anomalyScopeType":"All","negationOperation":false}]}]}, [
  'Content-Length',
  '965',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '776348ed-16c7-4ed5-8d59-5d1fd052d2fd',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '776348ed-16c7-4ed5-8d59-5d1fd052d2fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/ea953ad6-b468-47c5-93f5-a1de47ed62a4')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '765b1319-b6de-4f66-8373-59f418f5c06b',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '765b1319-b6de-4f66-8373-59f418f5c06b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:02 GMT'
]);

let nock = require('nock');

module.exports.hash = "48c551146ade6f63ba90130c00c59abf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"f5e675f8-1b17-45c8-87c3-e1c90e875957","createdTime":"2020-11-12T23:10:49.918Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}},{"feedbackId":"6cc6491d-4f3d-4cd7-90ab-5fdd348d306e","createdTime":"2020-11-12T23:10:49.286Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=2"}, [
  'Content-Length',
  '841',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b6b16364-12d5-4c19-bc01-7eec47e1c08b',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  'b6b16364-12d5-4c19-bc01-7eec47e1c08b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"248bf97b-5f5e-41cb-8af6-f2596b99ef3c","createdTime":"2020-11-12T23:10:48.68Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}},{"feedbackId":"7537f620-7201-41eb-9d98-6a111349a609","createdTime":"2020-11-12T23:10:48.126Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=4"}, [
  'Content-Length',
  '1017',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd76b8a73-5515-4065-a4b2-aaf8cbd64b53',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  'd76b8a73-5515-4065-a4b2-aaf8cbd64b53',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:51 GMT'
]);

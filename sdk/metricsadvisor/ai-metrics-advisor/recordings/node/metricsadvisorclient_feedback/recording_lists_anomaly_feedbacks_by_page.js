let nock = require('nock');

module.exports.hash = "48c551146ade6f63ba90130c00c59abf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"c35d82bd-02e3-4c57-9de0-03c560dbb8b4","createdTime":"2020-11-13T21:54:26.919Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}},{"feedbackId":"ab4590cc-5f28-4afb-8335-d447c30e6f7d","createdTime":"2020-11-13T21:54:26.492Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=2"}, [
  'Content-Length',
  '841',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '80ef2f3f-a923-4377-a39d-2e22e3785a5f',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '80ef2f3f-a923-4377-a39d-2e22e3785a5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"b5a8181c-7df2-4c1c-ba1c-47d7f47b55e9","createdTime":"2020-11-13T21:54:26.029Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}},{"feedbackId":"13e18fe8-ee1c-43c8-87e4-7690c834021b","createdTime":"2020-11-13T21:54:25.479Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=4"}, [
  'Content-Length',
  '1018',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd5f59ad6-4896-4f8f-95c6-eafabc35d529',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'd5f59ad6-4896-4f8f-95c6-eafabc35d529',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:27 GMT'
]);

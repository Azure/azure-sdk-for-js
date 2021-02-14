let nock = require('nock');

module.exports.hash = "48c551146ade6f63ba90130c00c59abf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"df99bbd6-c746-4967-991a-c469ea7d65be","createdTime":"2020-11-13T22:02:57.757Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}},{"feedbackId":"05558007-515c-400d-b2a9-ab2568609746","createdTime":"2020-11-13T22:02:57.305Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=2"}, [
  'Content-Length',
  '841',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c389c9f4-2a9e-4026-a28b-2cdaa9de6115',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'c389c9f4-2a9e-4026-a28b-2cdaa9de6115',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"d762bacf-3eca-4fdb-b028-a1b958a8d52b","createdTime":"2020-11-13T22:02:56.818Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}},{"feedbackId":"a6888385-475c-4873-a50d-ea190d2e773f","createdTime":"2020-11-13T22:02:56.238Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=4"}, [
  'Content-Length',
  '1018',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2f701b72-c384-4805-ad31-f5676248de69',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '2f701b72-c384-4805-ad31-f5676248de69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:59 GMT'
]);

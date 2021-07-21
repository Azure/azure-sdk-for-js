let nock = require('nock');

module.exports.hash = "f2ac698351b194c1adeed6f2c2b978d1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"263f9a33-7c75-4d00-bf96-7a3c23042a8a","createdTime":"2021-06-02T07:08:02.911Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}},{"feedbackId":"d52fd866-17ed-408c-ba62-ce68e618a9ea","createdTime":"2021-06-02T07:08:02.466Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '817',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ddd8f8b9-5a8e-4a72-9c07-f8db8452598c',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'ddd8f8b9-5a8e-4a72-9c07-f8db8452598c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"6addc3f7-68a6-4cea-886f-f909ff2b498f","createdTime":"2021-06-02T07:08:02.028Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}},{"feedbackId":"a5a633dd-c5cb-48a3-815c-959fb616ac19","createdTime":"2021-06-02T07:08:01.429Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '942',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8883d297-1192-4d84-862f-a149d7461eff',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '8883d297-1192-4d84-862f-a149d7461eff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:04 GMT'
]);

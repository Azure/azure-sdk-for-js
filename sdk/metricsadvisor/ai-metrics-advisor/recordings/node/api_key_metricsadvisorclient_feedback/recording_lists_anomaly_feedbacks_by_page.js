let nock = require('nock');

module.exports.hash = "f2ac698351b194c1adeed6f2c2b978d1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"4654fe14-25cc-490c-a522-72bf23d3b270","createdTime":"2021-05-15T04:10:35.668Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}},{"feedbackId":"25df0416-291d-481e-8ddd-4580025895a8","createdTime":"2021-05-15T04:10:35.207Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '817',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '15ea836f-1e5e-4546-83a8-cc0f32a79d57',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '15ea836f-1e5e-4546-83a8-cc0f32a79d57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"f79d2765-35d0-44d6-91f1-6c3023b2a99a","createdTime":"2021-05-15T04:10:34.77Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}},{"feedbackId":"30fe2c26-7685-4343-8485-7cb44ddd1b04","createdTime":"2021-05-15T04:10:34.293Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '941',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e3a0f7c7-9802-4219-a9c7-4a18364348db',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  'e3a0f7c7-9802-4219-a9c7-4a18364348db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:36 GMT'
]);

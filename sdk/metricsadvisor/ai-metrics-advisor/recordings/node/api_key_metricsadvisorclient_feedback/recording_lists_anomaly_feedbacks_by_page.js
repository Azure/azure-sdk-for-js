let nock = require('nock');

module.exports.hash = "133b8cb43d2437b7b9c92a4af35721dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"c83abf5a-ea7e-438b-8ddf-1f2a08766499","createdTime":"2021-11-16T00:32:48.566Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}},{"feedbackId":"f29c7d01-ff06-4548-9199-be5a7ff7c755","createdTime":"2021-11-16T00:32:50.465Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '876',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3fce531b-cd44-480e-bc51-b952b5e987d9',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  '3fce531b-cd44-480e-bc51-b952b5e987d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"38d7a5fa-3ed9-4254-97b2-d0d346b533ed","createdTime":"2021-11-16T00:32:49.952Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}},{"feedbackId":"daf91f82-1824-4e18-9a4f-ea7448c4c115","createdTime":"2021-11-16T00:32:49.26Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '890',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '38cb3fa5-6359-4905-bfdc-17fc7fc0dfd9',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '38cb3fa5-6359-4905-bfdc-17fc7fc0dfd9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:51 GMT'
]);

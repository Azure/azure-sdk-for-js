let nock = require('nock');

module.exports.hash = "133b8cb43d2437b7b9c92a4af35721dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"2125e100-a17f-4b09-95fe-501a20eccd6f","createdTime":"2021-11-10T02:07:31.276Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}},{"feedbackId":"adcf5581-bf86-4b84-8eee-1032c6263927","createdTime":"2021-11-10T02:07:30.776Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '821',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '767acf48-5a66-4d75-ad68-d09bb3301b50',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '767acf48-5a66-4d75-ad68-d09bb3301b50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"adcf5581-bf86-4b84-8eee-1032c6263927","createdTime":"2021-11-10T02:07:30.776Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}},{"feedbackId":"86f5da4c-aaa2-4029-8df7-78eb652590e3","createdTime":"2021-11-10T02:07:30.175Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '891',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '31ddd311-1fd2-439a-99a1-6e40fcf525a0',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  '31ddd311-1fd2-439a-99a1-6e40fcf525a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:31 GMT'
]);

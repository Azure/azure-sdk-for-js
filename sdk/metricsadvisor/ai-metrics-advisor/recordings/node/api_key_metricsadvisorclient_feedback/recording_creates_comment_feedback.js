let nock = require('nock');

module.exports.hash = "a8f499eec770cfb0ecbda9095b34bd28";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/226cc709-4df3-4c5b-a0ed-944d97cfd547',
  'x-request-id',
  '49a9eee4-8c13-4976-b75d-7f94f3fe32af',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  '49a9eee4-8c13-4976-b75d-7f94f3fe32af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/226cc709-4df3-4c5b-a0ed-944d97cfd547')
  .reply(200, {"feedbackId":"226cc709-4df3-4c5b-a0ed-944d97cfd547","createdTime":"2021-01-15T08:41:30.431Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a6ac7def-0dc4-4fa3-8b75-2a564b3cbaf4',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'a6ac7def-0dc4-4fa3-8b75-2a564b3cbaf4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:30 GMT'
]);

let nock = require('nock');

module.exports.hash = "6d5f77bddbd4873fda347b16a640dc98";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/4654fe14-25cc-490c-a522-72bf23d3b270')
  .reply(200, {"feedbackId":"4654fe14-25cc-490c-a522-72bf23d3b270","createdTime":"2021-05-15T04:10:35.668Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ac7c28d0-f527-4c5b-8c71-6820400a592f',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'ac7c28d0-f527-4c5b-8c71-6820400a592f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:35 GMT'
]);

let nock = require('nock');

module.exports.hash = "062a86eec734b61c4aadd877a4584702";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/f5e675f8-1b17-45c8-87c3-e1c90e875957')
  .reply(200, {"feedbackId":"f5e675f8-1b17-45c8-87c3-e1c90e875957","createdTime":"2020-11-12T23:10:49.918Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd6cc55a9-8183-46ca-ab63-5c31cae15183',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  'd6cc55a9-8183-46ca-ab63-5c31cae15183',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:50 GMT'
]);

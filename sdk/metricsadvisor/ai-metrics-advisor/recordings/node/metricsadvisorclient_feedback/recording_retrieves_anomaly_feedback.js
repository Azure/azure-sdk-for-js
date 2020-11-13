let nock = require('nock');

module.exports.hash = "062a86eec734b61c4aadd877a4584702";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/589b848e-24aa-4e18-8bfe-c31d5cb6793d')
  .reply(200, {"feedbackId":"589b848e-24aa-4e18-8bfe-c31d5cb6793d","createdTime":"2020-11-13T19:46:30.322Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9909dc60-4567-4f1b-8867-a201f2309056',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '9909dc60-4567-4f1b-8867-a201f2309056',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:30 GMT'
]);

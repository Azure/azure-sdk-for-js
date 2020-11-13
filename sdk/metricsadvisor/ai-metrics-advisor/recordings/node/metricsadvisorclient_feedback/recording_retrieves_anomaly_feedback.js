let nock = require('nock');

module.exports.hash = "062a86eec734b61c4aadd877a4584702";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/498ae3c9-98b5-442e-893a-9261b5d9c8e5')
  .reply(200, {"feedbackId":"498ae3c9-98b5-442e-893a-9261b5d9c8e5","createdTime":"2020-11-13T01:14:40.469Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e79ed989-ced9-47af-a92d-9326c437010a',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  'e79ed989-ced9-47af-a92d-9326c437010a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:40 GMT'
]);

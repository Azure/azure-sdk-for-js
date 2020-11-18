let nock = require('nock');

module.exports.hash = "062a86eec734b61c4aadd877a4584702";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/df99bbd6-c746-4967-991a-c469ea7d65be')
  .reply(200, {"feedbackId":"df99bbd6-c746-4967-991a-c469ea7d65be","createdTime":"2020-11-13T22:02:57.757Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'eb17bb52-22f6-4dc7-a0d0-81a73161e104',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  'eb17bb52-22f6-4dc7-a0d0-81a73161e104',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:57 GMT'
]);

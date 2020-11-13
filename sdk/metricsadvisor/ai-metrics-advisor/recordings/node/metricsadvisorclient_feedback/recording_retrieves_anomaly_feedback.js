let nock = require('nock');

module.exports.hash = "062a86eec734b61c4aadd877a4584702";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/c35d82bd-02e3-4c57-9de0-03c560dbb8b4')
  .reply(200, {"feedbackId":"c35d82bd-02e3-4c57-9de0-03c560dbb8b4","createdTime":"2020-11-13T21:54:26.919Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a9e8293f-9972-410f-8300-224b36ecae06',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'a9e8293f-9972-410f-8300-224b36ecae06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:26 GMT'
]);

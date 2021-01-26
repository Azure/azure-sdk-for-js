let nock = require('nock');

module.exports.hash = "6d5f77bddbd4873fda347b16a640dc98";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/226cc709-4df3-4c5b-a0ed-944d97cfd547')
  .reply(200, {"feedbackId":"226cc709-4df3-4c5b-a0ed-944d97cfd547","createdTime":"2021-01-15T08:41:30.431Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '35aa858e-02a8-4bf8-88b0-acc5ecdab9fc',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '35aa858e-02a8-4bf8-88b0-acc5ecdab9fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:30 GMT'
]);

let nock = require('nock');

module.exports.hash = "6d5f77bddbd4873fda347b16a640dc98";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/263f9a33-7c75-4d00-bf96-7a3c23042a8a')
  .reply(200, {"feedbackId":"263f9a33-7c75-4d00-bf96-7a3c23042a8a","createdTime":"2021-06-02T07:08:02.911Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3029a555-0454-408d-becb-7fc92d1465cd',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '3029a555-0454-408d-becb-7fc92d1465cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:03 GMT'
]);

let nock = require('nock');

module.exports.hash = "6d5f77bddbd4873fda347b16a640dc98";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/3bf0d2e2-e9ec-4c19-ad14-f92ab938e0bd')
  .reply(200, {"feedbackId":"3bf0d2e2-e9ec-4c19-ad14-f92ab938e0bd","createdTime":"2021-04-27T06:54:05.725Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4cc25109-d0b2-4e34-ad2f-3999433f9799',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '4cc25109-d0b2-4e34-ad2f-3999433f9799',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 27 Apr 2021 06:54:06 GMT'
]);

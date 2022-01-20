let nock = require('nock');

module.exports.hash = "3c53229a0b55a669295c5611bc35a6e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/c60aebc3-d3be-4fe9-920f-cc64eca72383')
  .reply(200, {"feedbackId":"c60aebc3-d3be-4fe9-920f-cc64eca72383","createdTime":"2022-01-20T00:58:49.567Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '50cd2691-834e-4941-af03-da516f9e4f5f',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '50cd2691-834e-4941-af03-da516f9e4f5f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:49 GMT'
]);

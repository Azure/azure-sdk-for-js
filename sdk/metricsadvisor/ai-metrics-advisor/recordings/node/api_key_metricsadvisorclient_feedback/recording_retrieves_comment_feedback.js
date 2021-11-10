let nock = require('nock');

module.exports.hash = "3c53229a0b55a669295c5611bc35a6e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/2125e100-a17f-4b09-95fe-501a20eccd6f')
  .reply(200, {"feedbackId":"2125e100-a17f-4b09-95fe-501a20eccd6f","createdTime":"2021-11-10T02:07:31.276Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd62beb55-4193-44ca-b0bd-83b423bfa648',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'd62beb55-4193-44ca-b0bd-83b423bfa648',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:31 GMT'
]);

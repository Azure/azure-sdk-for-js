let nock = require('nock');

module.exports.hash = "3c53229a0b55a669295c5611bc35a6e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/fcdd6188-bc16-454f-957e-514661256435')
  .reply(200, {"feedbackId":"fcdd6188-bc16-454f-957e-514661256435","createdTime":"2022-01-08T01:04:43.17Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '331',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bf4f8d8e-700f-4826-b813-ae26a694a3c8',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'bf4f8d8e-700f-4826-b813-ae26a694a3c8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 01:04:42 GMT'
]);

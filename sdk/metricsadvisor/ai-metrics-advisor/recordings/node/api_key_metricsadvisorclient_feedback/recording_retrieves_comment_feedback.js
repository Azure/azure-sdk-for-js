let nock = require('nock');

module.exports.hash = "a02c571d82becd3f2077fa6b7c7d3774";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/549e8d9e-f903-4219-a46b-1e8781500468')
  .reply(200, {"feedbackId":"549e8d9e-f903-4219-a46b-1e8781500468","createdTime":"2022-01-08T00:08:24.84Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '331',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '576bbc78-c27a-4ca6-84ac-c85028b55d33',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  '576bbc78-c27a-4ca6-84ac-c85028b55d33',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 00:08:25 GMT',
  'Connection',
  'close'
]);

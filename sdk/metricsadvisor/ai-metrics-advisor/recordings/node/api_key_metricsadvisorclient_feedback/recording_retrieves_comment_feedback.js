let nock = require('nock');

module.exports.hash = "3c53229a0b55a669295c5611bc35a6e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/0a6ef604-8cb1-48aa-87a7-13b413a6ca03')
  .reply(200, {"feedbackId":"0a6ef604-8cb1-48aa-87a7-13b413a6ca03","createdTime":"2021-11-08T09:38:31.415Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b49b4637-0c8e-4a7c-9463-5f55500a106a',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  'b49b4637-0c8e-4a7c-9463-5f55500a106a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:31 GMT'
]);

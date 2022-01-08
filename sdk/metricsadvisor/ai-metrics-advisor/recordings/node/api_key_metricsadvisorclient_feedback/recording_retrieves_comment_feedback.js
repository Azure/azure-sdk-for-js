let nock = require('nock');

module.exports.hash = "3c53229a0b55a669295c5611bc35a6e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/04d83f36-bd81-4c19-97bf-6afedd63b71d')
  .reply(200, {"feedbackId":"04d83f36-bd81-4c19-97bf-6afedd63b71d","createdTime":"2022-01-08T02:16:32.732Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '804ec367-81bc-4d4c-86cb-5157fbe09042',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '804ec367-81bc-4d4c-86cb-5157fbe09042',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:32 GMT'
]);

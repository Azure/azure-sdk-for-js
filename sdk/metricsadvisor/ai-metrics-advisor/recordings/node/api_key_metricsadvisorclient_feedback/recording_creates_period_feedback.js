let nock = require('nock');

module.exports.hash = "6b134f5d9f17ca45c75a6cabef0570f5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/62c31ae0-c267-41c0-849e-75980efa1ff3',
  'x-request-id',
  '2ac4ceed-89a6-40a9-9b37-65872b8a68b9',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  '2ac4ceed-89a6-40a9-9b37-65872b8a68b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/62c31ae0-c267-41c0-849e-75980efa1ff3')
  .reply(200, {"feedbackId":"62c31ae0-c267-41c0-849e-75980efa1ff3","createdTime":"2021-01-15T08:41:29.521Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '336',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bebbe013-5f65-484f-bd9a-e2df43b0bf25',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  'bebbe013-5f65-484f-bd9a-e2df43b0bf25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:29 GMT'
]);

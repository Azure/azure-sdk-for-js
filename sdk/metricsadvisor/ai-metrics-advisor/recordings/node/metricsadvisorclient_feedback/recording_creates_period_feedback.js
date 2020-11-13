let nock = require('nock');

module.exports.hash = "3526125e80b81425f640e08d5a3a111d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/ab4590cc-5f28-4afb-8335-d447c30e6f7d',
  'x-request-id',
  '361fba6e-ce08-4345-aef9-00c55e69fac6',
  'x-envoy-upstream-service-time',
  '287',
  'apim-request-id',
  '361fba6e-ce08-4345-aef9-00c55e69fac6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/ab4590cc-5f28-4afb-8335-d447c30e6f7d')
  .reply(200, {"feedbackId":"ab4590cc-5f28-4afb-8335-d447c30e6f7d","createdTime":"2020-11-13T21:54:26.492Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '336',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1523dd81-98d9-4710-9624-c5e92d9005d5',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  '1523dd81-98d9-4710-9624-c5e92d9005d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:26 GMT'
]);

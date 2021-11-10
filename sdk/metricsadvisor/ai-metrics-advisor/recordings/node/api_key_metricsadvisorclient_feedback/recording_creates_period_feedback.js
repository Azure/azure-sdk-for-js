let nock = require('nock');

module.exports.hash = "2b7c84b7bfa80508336971ea7f82d3b2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/adcf5581-bf86-4b84-8eee-1032c6263927',
  'x-request-id',
  '39babc89-3baf-4293-8e50-d2a79fc8a2a5',
  'x-envoy-upstream-service-time',
  '454',
  'apim-request-id',
  '39babc89-3baf-4293-8e50-d2a79fc8a2a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/adcf5581-bf86-4b84-8eee-1032c6263927')
  .reply(200, {"feedbackId":"adcf5581-bf86-4b84-8eee-1032c6263927","createdTime":"2021-11-10T02:07:30.776Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3d51ed6a-0fee-4d11-bacd-5eddc68a7c18',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '3d51ed6a-0fee-4d11-bacd-5eddc68a7c18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:30 GMT'
]);

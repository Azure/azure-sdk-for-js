let nock = require('nock');

module.exports.hash = "6b134f5d9f17ca45c75a6cabef0570f5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/d52fd866-17ed-408c-ba62-ce68e618a9ea',
  'x-request-id',
  '9e67cf4e-1650-4c57-b8bb-637a5d92a80e',
  'x-envoy-upstream-service-time',
  '273',
  'apim-request-id',
  '9e67cf4e-1650-4c57-b8bb-637a5d92a80e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/d52fd866-17ed-408c-ba62-ce68e618a9ea')
  .reply(200, {"feedbackId":"d52fd866-17ed-408c-ba62-ce68e618a9ea","createdTime":"2021-06-02T07:08:02.466Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '336',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '46c39f6c-a882-4d5a-8685-ded1c19067cc',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '46c39f6c-a882-4d5a-8685-ded1c19067cc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:02 GMT'
]);

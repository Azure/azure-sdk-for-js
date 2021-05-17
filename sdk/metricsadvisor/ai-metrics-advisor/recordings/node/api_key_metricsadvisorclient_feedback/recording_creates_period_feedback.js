let nock = require('nock');

module.exports.hash = "6b134f5d9f17ca45c75a6cabef0570f5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/25df0416-291d-481e-8ddd-4580025895a8',
  'x-request-id',
  '67d6f244-948a-4e67-8f25-5e6f41318b62',
  'x-envoy-upstream-service-time',
  '274',
  'apim-request-id',
  '67d6f244-948a-4e67-8f25-5e6f41318b62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/25df0416-291d-481e-8ddd-4580025895a8')
  .reply(200, {"feedbackId":"25df0416-291d-481e-8ddd-4580025895a8","createdTime":"2021-05-15T04:10:35.207Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '336',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '86f62d5b-9097-4fb2-bf29-7cc6bf861684',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '86f62d5b-9097-4fb2-bf29-7cc6bf861684',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:34 GMT'
]);

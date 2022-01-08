let nock = require('nock');

module.exports.hash = "74f35e979ec852ea89836b2be434c9e0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/49efe7b2-4bd5-4c79-9478-19ebb2c03a27',
  'x-request-id',
  'cbeee5f6-784f-4987-a14e-cf7b6d6e10cb',
  'x-envoy-upstream-service-time',
  '516',
  'apim-request-id',
  'cbeee5f6-784f-4987-a14e-cf7b6d6e10cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/49efe7b2-4bd5-4c79-9478-19ebb2c03a27')
  .reply(200, {"feedbackId":"49efe7b2-4bd5-4c79-9478-19ebb2c03a27","createdTime":"2022-01-08T02:16:32.254Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7240ae73-1068-493a-85f6-a61adf65a991',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '7240ae73-1068-493a-85f6-a61adf65a991',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:31 GMT'
]);

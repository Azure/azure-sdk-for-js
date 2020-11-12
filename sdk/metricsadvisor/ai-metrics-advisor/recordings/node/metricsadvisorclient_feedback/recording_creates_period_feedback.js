let nock = require('nock');

module.exports.hash = "3526125e80b81425f640e08d5a3a111d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/6cc6491d-4f3d-4cd7-90ab-5fdd348d306e',
  'x-request-id',
  '391b7570-61d4-4a37-808f-9582825f1928',
  'x-envoy-upstream-service-time',
  '376',
  'apim-request-id',
  '391b7570-61d4-4a37-808f-9582825f1928',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/6cc6491d-4f3d-4cd7-90ab-5fdd348d306e')
  .reply(200, {"feedbackId":"6cc6491d-4f3d-4cd7-90ab-5fdd348d306e","createdTime":"2020-11-12T23:10:49.286Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '336',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2619b091-b443-45f1-96e0-1b303fd0a9f1',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '2619b091-b443-45f1-96e0-1b303fd0a9f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:49 GMT'
]);

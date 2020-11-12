let nock = require('nock');

module.exports.hash = "45defc3c330476699ffd2ac2dfc4fb8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/7537f620-7201-41eb-9d98-6a111349a609',
  'x-request-id',
  'fc4a88ec-67ba-4c55-824a-3de8cc0b993b',
  'x-envoy-upstream-service-time',
  '324',
  'apim-request-id',
  'fc4a88ec-67ba-4c55-824a-3de8cc0b993b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/7537f620-7201-41eb-9d98-6a111349a609')
  .reply(200, {"feedbackId":"7537f620-7201-41eb-9d98-6a111349a609","createdTime":"2020-11-12T23:10:48.126Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}, [
  'Content-Length',
  '475',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '587b7c5b-100b-44e9-b957-787fb234b452',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '587b7c5b-100b-44e9-b957-787fb234b452',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:48 GMT'
]);

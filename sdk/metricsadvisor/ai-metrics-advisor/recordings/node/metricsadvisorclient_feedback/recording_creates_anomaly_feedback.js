let nock = require('nock');

module.exports.hash = "45defc3c330476699ffd2ac2dfc4fb8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/cbed990a-fb7f-4091-911b-39d4f47dfd35',
  'x-request-id',
  '9d35847e-f492-4f23-b96f-4789fd31593f',
  'x-envoy-upstream-service-time',
  '342',
  'apim-request-id',
  '9d35847e-f492-4f23-b96f-4789fd31593f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/cbed990a-fb7f-4091-911b-39d4f47dfd35')
  .reply(200, {"feedbackId":"cbed990a-fb7f-4091-911b-39d4f47dfd35","createdTime":"2020-11-13T19:46:28.321Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}, [
  'Content-Length',
  '475',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c1a40af1-4163-4780-9511-3538f2ab21f8',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'c1a40af1-4163-4780-9511-3538f2ab21f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:28 GMT'
]);

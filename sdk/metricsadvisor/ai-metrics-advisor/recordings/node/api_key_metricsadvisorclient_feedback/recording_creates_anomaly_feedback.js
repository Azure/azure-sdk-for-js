let nock = require('nock');

module.exports.hash = "3b1492ef703380ec641e07cde5f38c87";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/8f395e21-5466-4a51-ab59-399aceb19839',
  'x-request-id',
  '71d468a4-f690-4718-9400-429b44ed0dd2',
  'x-envoy-upstream-service-time',
  '310',
  'apim-request-id',
  '71d468a4-f690-4718-9400-429b44ed0dd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/8f395e21-5466-4a51-ab59-399aceb19839')
  .reply(200, {"feedbackId":"8f395e21-5466-4a51-ab59-399aceb19839","createdTime":"2021-01-15T08:41:27.593Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}, [
  'Content-Length',
  '475',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd4942605-3ce8-45fe-b127-1cefa69f34d3',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  'd4942605-3ce8-45fe-b127-1cefa69f34d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:28 GMT'
]);

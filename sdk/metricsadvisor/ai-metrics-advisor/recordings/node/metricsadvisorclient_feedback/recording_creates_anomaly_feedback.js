let nock = require('nock');

module.exports.hash = "45defc3c330476699ffd2ac2dfc4fb8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/13e18fe8-ee1c-43c8-87e4-7690c834021b',
  'x-request-id',
  '775835c6-2b34-4570-ad65-c8b836a4be4b',
  'x-envoy-upstream-service-time',
  '318',
  'apim-request-id',
  '775835c6-2b34-4570-ad65-c8b836a4be4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/13e18fe8-ee1c-43c8-87e4-7690c834021b')
  .reply(200, {"feedbackId":"13e18fe8-ee1c-43c8-87e4-7690c834021b","createdTime":"2020-11-13T21:54:25.479Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}, [
  'Content-Length',
  '475',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '155cb059-1280-475e-8ac6-dc115a3af9ac',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '155cb059-1280-475e-8ac6-dc115a3af9ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:25 GMT'
]);

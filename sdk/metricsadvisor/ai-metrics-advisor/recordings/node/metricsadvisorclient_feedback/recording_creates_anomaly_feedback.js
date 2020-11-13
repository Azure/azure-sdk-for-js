let nock = require('nock');

module.exports.hash = "45defc3c330476699ffd2ac2dfc4fb8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/a379554c-9b37-4108-8dc6-02a80a7bcaaf',
  'x-request-id',
  '4a0f605b-3597-419b-903b-ea547785642e',
  'x-envoy-upstream-service-time',
  '303',
  'apim-request-id',
  '4a0f605b-3597-419b-903b-ea547785642e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/a379554c-9b37-4108-8dc6-02a80a7bcaaf')
  .reply(200, {"feedbackId":"a379554c-9b37-4108-8dc6-02a80a7bcaaf","createdTime":"2020-11-13T01:14:38.627Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"},"anomalyDetectionConfigurationId":null,"anomalyDetectionConfigurationSnapshot":null}, [
  'Content-Length',
  '475',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '096d8daf-9ea3-4901-a62b-48b6fd31ac2d',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '096d8daf-9ea3-4901-a62b-48b6fd31ac2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:38 GMT'
]);
